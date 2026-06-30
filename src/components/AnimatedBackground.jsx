import { useEffect, useRef } from "react";

function makeNode(index, total) {
  const ring = index / total;
  return {
    x: 0.08 + ((index * 0.137) % 0.84),
    y: 0.08 + ((index * 0.223) % 0.82),
    vx: Math.sin(index * 1.7) * 0.000018,
    vy: Math.cos(index * 1.3) * 0.000016,
    r: 1 + (index % 4) * 0.32,
    phase: ring * Math.PI * 2,
  };
}

function drawBase(ctx, w, h) {
  ctx.fillStyle = "#061014";
  ctx.fillRect(0, 0, w, h);

  const wash = ctx.createLinearGradient(0, 0, w, 0);
  wash.addColorStop(0, "rgba(2, 6, 12, 0.72)");
  wash.addColorStop(0.46, "rgba(5, 12, 18, 0.5)");
  wash.addColorStop(1, "rgba(8, 38, 42, 0.46)");
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, w, h);

  const teal = ctx.createRadialGradient(w * 0.82, h * 0.42, 0, w * 0.82, h * 0.42, Math.max(w, h) * 0.66);
  teal.addColorStop(0, "rgba(45, 212, 191, 0.16)");
  teal.addColorStop(0.42, "rgba(20, 184, 166, 0.07)");
  teal.addColorStop(1, "rgba(6, 16, 20, 0)");
  ctx.fillStyle = teal;
  ctx.fillRect(0, 0, w, h);

  const cyan = ctx.createRadialGradient(w * 0.42, h * 0.16, 0, w * 0.42, h * 0.16, Math.max(w, h) * 0.52);
  cyan.addColorStop(0, "rgba(56, 189, 248, 0.06)");
  cyan.addColorStop(1, "rgba(6, 16, 20, 0)");
  ctx.fillStyle = cyan;
  ctx.fillRect(0, 0, w, h);
}

function drawGrid(ctx, w, h) {
  ctx.save();
  ctx.globalAlpha = 0.48;
  ctx.strokeStyle = "rgba(45, 212, 191, 0.07)";
  ctx.lineWidth = 1;
  const gap = w < 720 ? 52 : 46;
  for (let x = (w % gap) / 2; x < w; x += gap) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = (h % gap) / 2; y < h; y += gap) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPointerLight(ctx, w, h, pointer, time) {
  const t = time * 0.001;
  const x = (pointer.active ? pointer.x : 0.68 + Math.sin(t * 0.08) * 0.1) * w;
  const y = (pointer.active ? pointer.y : 0.22 + Math.cos(t * 0.07) * 0.08) * h;
  const radius = Math.max(w, h) * (pointer.active ? 0.46 : 0.36);
  const light = ctx.createRadialGradient(x, y, 0, x, y, radius);
  light.addColorStop(0, "rgba(56, 189, 248, 0.24)");
  light.addColorStop(0.28, "rgba(45, 212, 191, 0.11)");
  light.addColorStop(0.68, "rgba(20, 184, 166, 0.035)");
  light.addColorStop(1, "rgba(6, 16, 20, 0)");
  ctx.fillStyle = light;
  ctx.fillRect(0, 0, w, h);
}

const MAX_DELTA = 0.05;
const NODE_VMAX = 0.000032;

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return undefined;

    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMedia = window.matchMedia("(max-width: 720px)");
    let reduce = motionMedia.matches;
    let isMobile = mobileMedia.matches;
    let running = false;
    let inViewport = true;
    let frameId = 0;
    let lastTime = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let pointer = { x: 0.68, y: 0.22, active: false };
    let nodes = [];

    const seed = () => {
      const count = isMobile ? 26 : 54;
      nodes = Array.from({ length: count }, (_, index) => makeNode(index, count));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = Math.max(320, window.innerWidth);
      h = Math.max(480, window.innerHeight);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawNodes = (time, delta) => {
      const t = time * 0.001;
      nodes.forEach((node) => {
        if (delta > 0) {
          let nvx = node.vx;
          let nvy = node.vy;
          if (nvx > NODE_VMAX) nvx = NODE_VMAX;
          if (nvx < -NODE_VMAX) nvx = -NODE_VMAX;
          if (nvy > NODE_VMAX) nvy = NODE_VMAX;
          if (nvy < -NODE_VMAX) nvy = -NODE_VMAX;
          node.vx = nvx;
          node.vy = nvy;
          node.x += nvx * delta * 60;
          node.y += nvy * delta * 60;
          if (node.x < 0.04 || node.x > 0.96) node.vx *= -1;
          if (node.y < 0.05 || node.y > 0.94) node.vy *= -1;
        }

        const pulse = 0.72 + Math.sin(t * 0.7 + node.phase) * 0.18;
        ctx.beginPath();
        ctx.arc(node.x * w, node.y * h, node.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = indexColor(node.phase, pulse);
        ctx.fill();
      });
    };

    const staticFrame = () => {
      drawBase(ctx, w, h);
      drawPointerLight(ctx, w, h, pointer, 0);
      drawGrid(ctx, w, h);
      drawNodes(0, 0);
    };

    const draw = (time) => {
      if (!running) return;
      if (document.hidden || !inViewport) return;

      if (reduce) {
        staticFrame();
        running = false;
        return;
      }

      const rawDelta = lastTime === 0 ? 0.016 : (time - lastTime) / 1000;
      const delta = Math.min(Math.max(rawDelta, 0), MAX_DELTA);
      lastTime = time;

      drawBase(ctx, w, h);
      drawPointerLight(ctx, w, h, pointer, time);
      drawGrid(ctx, w, h);
      drawNodes(time, delta);

      frameId = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      if (reduce) {
        staticFrame();
        return;
      }
      running = true;
      lastTime = 0;
      frameId = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const onPointerMove = (event) => {
      pointer = { x: event.clientX / w, y: event.clientY / h, active: true };
      if (reduce) staticFrame();
    };

    const onPointerLeave = () => {
      pointer.active = false;
      if (reduce) staticFrame();
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const onMedia = () => {
      reduce = motionMedia.matches;
      isMobile = mobileMedia.matches;
      seed();
      resize();
      if (reduce) {
        stop();
        staticFrame();
      } else {
        start();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      if (inViewport && !document.hidden && !reduce) start();
      if (!inViewport) stop();
    }, { threshold: 0 });

    resize();
    seed();
    if (reduce) staticFrame();
    else start();

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    motionMedia.addEventListener?.("change", onMedia);
    mobileMedia.addEventListener?.("change", onMedia);
    observer.observe(canvas);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      motionMedia.removeEventListener?.("change", onMedia);
      mobileMedia.removeEventListener?.("change", onMedia);
    };
  }, []);

  return <canvas ref={canvasRef} className="global-bg-canvas" aria-hidden="true" />;
}

function indexColor(phase, pulse) {
  const teal = Math.sin(phase * 2.3) > 0;
  const alpha = teal ? 0.36 * pulse : 0.24 * pulse;
  return teal ? `rgba(45, 212, 191, ${alpha.toFixed(3)})` : `rgba(125, 211, 252, ${alpha.toFixed(3)})`;
}
