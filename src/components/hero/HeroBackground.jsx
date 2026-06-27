import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w, h, cx, cy;
    let visible = true;
    let frameId;
    let mouseX = 0.5, mouseY = 0.5;

    // Data flow paths
    const paths = [];
    const pathCount = isMobile ? 4 : 8;
    for (let i = 0; i < pathCount; i++) {
      paths.push({
        points: generatePath(),
        progress: Math.random(),
        speed: 0.001 + Math.random() * 0.002,
        opacity: 0.04 + Math.random() * 0.06,
        color: i % 3 === 0 ? "56, 189, 248" : i % 3 === 1 ? "139, 92, 246" : "45, 212, 191",
      });
    }

    function generatePath() {
      const pts = [];
      const count = 5 + Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) {
        pts.push({
          x: Math.random(),
          y: Math.random(),
        });
      }
      return pts;
    }

    // Grid dots
    const gridDots = [];
    const gridSpacing = isMobile ? 60 : 40;
    function generateGrid() {
      gridDots.length = 0;
      for (let x = 0; x < w; x += gridSpacing) {
        for (let y = 0; y < h; y += gridSpacing) {
          gridDots.push({ x, y, baseOpacity: 0.03 + Math.random() * 0.02 });
        }
      }
    }

    // Central glow
    let glowPulse = 0;

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
      generateGrid();
      if (reduce) drawFallback();
    }

    function draw(time) {
      if (!visible) { frameId = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, w, h);

      if (reduce) {
        drawFallback();
        return;
      }

      const t = time * 0.001;

      // Grid dots with subtle mouse interaction
      gridDots.forEach((dot) => {
        const dx = dot.x - mouseX * w;
        const dy = dot.y - mouseY * h;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 200);
        const opacity = dot.baseOpacity + influence * 0.08;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1 + influence * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${opacity})`;
        ctx.fill();
      });

      // Data flow paths
      paths.forEach((path) => {
        path.progress += path.speed;
        if (path.progress > 1) { path.progress = 0; path.points = generatePath(); }

        if (path.points.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(path.points[0].x * w, path.points[0].y * h);
        for (let i = 1; i < path.points.length; i++) {
          const prev = path.points[i - 1];
          const curr = path.points[i];
          const cpx = ((prev.x + curr.x) / 2) * w;
          const cpy = ((prev.y + curr.y) / 2) * h;
          ctx.quadraticCurveTo(prev.x * w, prev.y * h, cpx, cpy);
        }
        ctx.strokeStyle = `rgba(${path.color}, ${path.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Moving dot along path
        const segIndex = Math.floor(path.progress * (path.points.length - 1));
        const segProgress = (path.progress * (path.points.length - 1)) % 1;
        const p1 = path.points[segIndex];
        const p2 = path.points[Math.min(segIndex + 1, path.points.length - 1)];
        if (p1 && p2) {
          const dx = p1.x + (p2.x - p1.x) * segProgress;
          const dy = p1.y + (p2.y - p1.y) * segProgress;
          ctx.beginPath();
          ctx.arc(dx * w, dy * h, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${path.color}, 0.5)`;
          ctx.fill();
        }
      });

      // Central ambient glow
      glowPulse = 0.6 + Math.sin(t * 0.3) * 0.4;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.4);
      gradient.addColorStop(0, `rgba(56, 189, 248, ${0.04 * glowPulse})`);
      gradient.addColorStop(0.5, `rgba(139, 92, 246, ${0.02 * glowPulse})`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Vignette
      const vignette = ctx.createRadialGradient(cx, cy, Math.min(w, h) * 0.3, cx, cy, Math.max(w, h) * 0.7);
      vignette.addColorStop(0, "transparent");
      vignette.addColorStop(1, "rgba(6, 8, 13, 0.7)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      frameId = requestAnimationFrame(draw);
    }

    function drawFallback() {
      // Static grid dots
      gridDots.forEach((dot) => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${dot.baseOpacity})`;
        ctx.fill();
      });
      // Static central glow
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.4);
      gradient.addColorStop(0, "rgba(56, 189, 248, 0.03)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
    };

    resize();
    frameId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    if (!isMobile) canvas.addEventListener("mousemove", onMouseMove);

    const visibilityHandler = () => { visible = !document.hidden; };
    document.addEventListener("visibilitychange", visibilityHandler);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
    }, { threshold: 0.01 });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", visibilityHandler);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="hero-bg">
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
