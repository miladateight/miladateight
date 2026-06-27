import { useEffect, useRef } from "react";

const NODES = [
  { label: "Network", color: "#34D399", angle: 0, speed: 0.3 },
  { label: "Server", color: "#34D399", angle: 1.57, speed: 0.25 },
  { label: "Mail+Web", color: "#34D399", angle: 3.14, speed: 0.28 },
  { label: "Security", color: "#34D399", angle: 4.71, speed: 0.22 },
  { label: "Automation", color: "#34D399", angle: 6.28, speed: 0.2 }
];

export default function OpsCoreCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = !window.matchMedia("(pointer: fine)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w, h, cx, cy, radius;
    let pointerX = 0, pointerY = 0, targetRotX = 0, targetRotY = 0, rotX = 0, rotY = 0;
    let visible = true;
    let frameId;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2;
      cy = h / 2;
      radius = Math.min(w, h) * 0.3;
    }

    function draw(time) {
      if (!visible) { frameId = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, w, h);

      if (reduce) {
        drawFallback();
        frameId = requestAnimationFrame(draw);
        return;
      }

      const elapsed = time * 0.001;
      const glow = 0.85 + Math.sin(elapsed * 1.2) * 0.15;

      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotY * 0.5);

      ctx.shadowColor = "rgba(52, 211, 153, 0.3)";
      ctx.shadowBlur = 40;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(52, 211, 153, ${0.15 * glow})`;
      ctx.fill();
      ctx.shadowBlur = 0;

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.25);
      gradient.addColorStop(0, "rgba(52, 211, 153, 0.9)");
      gradient.addColorStop(1, "rgba(52, 211, 153, 0.2)");
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      NODES.forEach((node, i) => {
        const angle = elapsed * node.speed + node.angle + rotY * 0.5;
        const r = radius * 0.7;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r * 0.6 + Math.sin(elapsed * 0.4 + i) * r * 0.08;

        ctx.save();
        ctx.translate(x, y);

        ctx.shadowColor = "rgba(52, 211, 153, 0.4)";
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(0, 0, isMobile ? 3 : 4, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-x * 0.6, -y * 0.6);
        ctx.strokeStyle = `rgba(52, 211, 153, 0.15)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        if (!isMobile && !isTouch) {
          ctx.fillStyle = "rgba(226, 232, 240, 0.6)";
          ctx.font = "10px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(node.label, 0, (isMobile ? 8 : 10) + 8);
        }

        ctx.restore();
      });

      for (let i = 0; i < NODES.length; i++) {
        for (let j = i + 1; j < NODES.length; j++) {
          const ai = elapsed * NODES[i].speed + NODES[i].angle + rotY * 0.5;
          const aj = elapsed * NODES[j].speed + NODES[j].angle + rotY * 0.5;
          const ri = radius * 0.7;
          const xi = Math.cos(ai) * ri;
          const yi = Math.sin(ai) * ri * 0.6;
          const xj = Math.cos(aj) * ri;
          const yj = Math.sin(aj) * ri * 0.6;
          ctx.beginPath();
          ctx.moveTo(xi, yi);
          ctx.lineTo(xj, yj);
          ctx.strokeStyle = `rgba(52, 211, 153, 0.06)`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      ctx.restore();
      frameId = requestAnimationFrame(draw);
    }

    function drawFallback() {
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(52, 211, 153, 0.2)";
      ctx.fill();
      for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2;
        const x = cx + Math.cos(angle) * radius * 0.6;
        const y = cy + Math.sin(angle) * radius * 0.4;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(52, 211, 153, 0.3)";
        ctx.fill();
      }
    }

    resize();
    frameId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotX = pointerY * 0.2;
      targetRotY = pointerX * 0.3;
    };
    if (!isTouch) canvas.addEventListener("pointermove", onMove);

    const visibilityHandler = () => { visible = !document.hidden; };
    document.addEventListener("visibilitychange", visibilityHandler);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
    }, { threshold: 0.05 });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", visibilityHandler);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="ops-core-canvas"
    />
  );
}
