import { useEffect, useRef } from "react";

function makeNode(index, total) {
  const ring = index / total;
  return {
    x: 0.12 + ((index * 0.137) % 0.76),
    y: 0.1 + ((index * 0.223) % 0.78),
    vx: (Math.sin(index * 1.7) * 0.000075),
    vy: (Math.cos(index * 1.3) * 0.000065),
    r: 1.35 + (index % 4) * 0.38,
    phase: ring * Math.PI * 2,
  };
}

function makeComet(index) {
  return {
    x: -0.18 - index * 0.22,
    y: 0.12 + ((index * 0.31) % 0.58),
    speed: 0.000042 + (index % 3) * 0.000012,
    length: 90 + index * 18,
    delay: index * 0.19,
  };
}

function drawGrid(ctx, w, h) {
  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = "rgba(122, 181, 255, 0.12)";
  ctx.lineWidth = 1;
  const gap = w < 720 ? 52 : 42;
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

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMedia = window.matchMedia("(max-width: 720px)");
    let reduce = motionMedia.matches;
    let isMobile = mobileMedia.matches;
    let running = false;
    let inViewport = true;
    let frameId = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let pointer = { x: 0.62, y: 0.24, active: false };
    let nodes = [];
    let pulses = [];
    let comets = [];

    const seed = () => {
      const count = isMobile ? 22 : 46;
      nodes = Array.from({ length: count }, (_, index) => makeNode(index, count));
      pulses = Array.from({ length: isMobile ? 8 : 16 }, (_, index) => ({
        from: index % count,
        to: (index * 5 + 7) % count,
        speed: 0.00015 + (index % 5) * 0.000035,
        progress: (index * 0.17) % 1,
      }));
      comets = Array.from({ length: isMobile ? 2 : 4 }, (_, index) => makeComet(index));
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

    const staticFrame = () => {
      ctx.clearRect(0, 0, w, h);
      drawGrid(ctx, w, h);
      const glow = ctx.createRadialGradient(w * 0.72, h * 0.18, 0, w * 0.72, h * 0.18, Math.max(w, h) * 0.62);
      glow.addColorStop(0, "rgba(56, 189, 248, 0.16)");
      glow.addColorStop(0.38, "rgba(139, 92, 246, 0.08)");
      glow.addColorStop(1, "rgba(6, 8, 13, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x * w, node.y * h, node.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(190, 242, 255, 0.26)";
        ctx.fill();
      });
    };

    const draw = (time = 0) => {
      if (!running) return;
      if (document.hidden || !inViewport) {
        frameId = window.requestAnimationFrame(draw);
        return;
      }

      if (reduce) {
        staticFrame();
        running = false;
        return;
      }

      const t = time * 0.001;
      ctx.clearRect(0, 0, w, h);
      drawGrid(ctx, w, h);

      const lightX = (pointer.active ? pointer.x : 0.68 + Math.sin(t * 0.08) * 0.1) * w;
      const lightY = (pointer.active ? pointer.y : 0.2 + Math.cos(t * 0.07) * 0.08) * h;
      const light = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, Math.max(w, h) * 0.42);
      light.addColorStop(0, "rgba(56, 189, 248, 0.22)");
      light.addColorStop(0.36, "rgba(45, 212, 191, 0.08)");
      light.addColorStop(1, "rgba(6, 8, 13, 0)");
      ctx.fillStyle = light;
      ctx.fillRect(0, 0, w, h);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0.04 || node.x > 0.96) node.vx *= -1;
        if (node.y < 0.05 || node.y > 0.94) node.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = (a.x - b.x) * w;
          const dy = (a.y - b.y) * h;
          const dist = Math.hypot(dx, dy);
          if (dist > (isMobile ? 145 : 185)) continue;
          const alpha = (1 - dist / (isMobile ? 145 : 185)) * 0.13;
          ctx.beginPath();
          ctx.moveTo(a.x * w, a.y * h);
          ctx.lineTo(b.x * w, b.y * h);
          ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      pulses.forEach((pulse, index) => {
        const from = nodes[pulse.from];
        const to = nodes[pulse.to];
        pulse.progress = (pulse.progress + pulse.speed * 16) % 1;
        const x = (from.x + (to.x - from.x) * pulse.progress) * w;
        const y = (from.y + (to.y - from.y) * pulse.progress) * h;
        ctx.beginPath();
        ctx.arc(x, y, 1.6 + (index % 3) * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = index % 4 === 0 ? "rgba(139, 92, 246, 0.72)" : "rgba(45, 212, 191, 0.72)";
        ctx.fill();
      });

      comets.forEach((comet, index) => {
        comet.x += comet.speed * 16;
        if (comet.x > 1.18) {
          comet.x = -0.2 - comet.delay;
          comet.y = 0.1 + (((index + Math.floor(t)) * 0.29) % 0.62);
        }
        const x = comet.x * w;
        const y = comet.y * h;
        const tail = comet.length * (isMobile ? 0.68 : 1);
        const gradient = ctx.createLinearGradient(x - tail, y + tail * 0.24, x, y);
        gradient.addColorStop(0, "rgba(56, 189, 248, 0)");
        gradient.addColorStop(0.62, index % 2 ? "rgba(139, 92, 246, 0.1)" : "rgba(45, 212, 191, 0.1)");
        gradient.addColorStop(1, "rgba(226, 245, 255, 0.46)");
        ctx.beginPath();
        ctx.moveTo(x - tail, y + tail * 0.24);
        ctx.lineTo(x, y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = isMobile ? 1 : 1.35;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, isMobile ? 1.4 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(226, 245, 255, 0.55)";
        ctx.fill();
      });

      nodes.forEach((node) => {
        const pulse = 0.75 + Math.sin(t * 1.2 + node.phase) * 0.25;
        ctx.beginPath();
        ctx.arc(node.x * w, node.y * h, node.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(226, 245, 255, 0.38)";
        ctx.fill();
      });

      const shade = ctx.createLinearGradient(0, 0, 0, h);
      shade.addColorStop(0, "rgba(6, 8, 13, 0.76)");
      shade.addColorStop(0.46, "rgba(6, 8, 13, 0.22)");
      shade.addColorStop(1, "rgba(6, 8, 13, 0.58)");
      ctx.fillStyle = shade;
      ctx.fillRect(0, 0, w, h);

      frameId = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      frameId = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frameId);
    };

    const onPointerMove = (event) => {
      pointer = { x: event.clientX / w, y: event.clientY / h, active: true };
    };

    const onPointerLeave = () => {
      pointer.active = false;
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
      if (reduce) staticFrame();
      else start();
    };

    const observer = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      if (inViewport && !document.hidden && !reduce) start();
      if (!inViewport) stop();
    }, { threshold: 0 });

    seed();
    resize();
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
