import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w, h;
    let visible = true;
    let frameId;

    const nodes = [];
    const nodeCount = isMobile ? 12 : 24;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0003,
        size: 1 + Math.random() * 2,
        opacity: 0.15 + Math.random() * 0.25,
      });
    }

    const particles = [];
    const particleCount = isMobile ? 20 : 50;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        speed: 0.0002 + Math.random() * 0.0005,
        size: 0.5 + Math.random() * 1,
        opacity: 0.1 + Math.random() * 0.2,
      });
    }

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(time) {
      if (!visible) { frameId = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, w, h);

      if (reduce) {
        drawStatic();
        frameId = requestAnimationFrame(draw);
        return;
      }

      const t = time * 0.001;

      // Draw connecting lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = (nodes[i].x - nodes[j].x) * w;
          const dy = (nodes[i].y - nodes[j].y) * h;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const alpha = (1 - dist / 200) * 0.06;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x * w, nodes[i].y * h);
            ctx.lineTo(nodes[j].x * w, nodes[j].y * h);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > 1) node.vx *= -1;
        if (node.y < 0 || node.y > 1) node.vy *= -1;

        const pulse = 0.7 + Math.sin(t * 0.5 + node.x * 10) * 0.3;
        ctx.beginPath();
        ctx.arc(node.x * w, node.y * h, node.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${node.opacity * pulse})`;
        ctx.fill();
      });

      // Draw floating particles
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        const twinkle = 0.5 + Math.sin(t * 0.8 + p.x * 50) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity * twinkle})`;
        ctx.fill();
      });

      // Subtle gradient overlay at top and bottom
      const topGrad = ctx.createLinearGradient(0, 0, 0, h * 0.3);
      topGrad.addColorStop(0, "rgba(6, 8, 13, 0.8)");
      topGrad.addColorStop(1, "transparent");
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, w, h * 0.3);

      const botGrad = ctx.createLinearGradient(0, h * 0.7, 0, h);
      botGrad.addColorStop(0, "transparent");
      botGrad.addColorStop(1, "rgba(6, 8, 13, 0.6)");
      ctx.fillStyle = botGrad;
      ctx.fillRect(0, h * 0.7, w, h * 0.3);

      frameId = requestAnimationFrame(draw);
    }

    function drawStatic() {
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x * w, node.y * h, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${node.opacity * 0.5})`;
        ctx.fill();
      });
    }

    resize();
    frameId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    const visibilityHandler = () => { visible = !document.hidden; };
    document.addEventListener("visibilitychange", visibilityHandler);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
    }, { threshold: 0.01 });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibilityHandler);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
