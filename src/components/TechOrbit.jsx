import { useEffect, useRef } from "react";

const TECH_ITEMS = [
  "Linux", "MikroTik", "Nginx", "Docker", "WireGuard",
  "Python", ".NET", "React", "Git", "PostgreSQL",
  "HestiaCP", "HAProxy", "DNS", "Bash", "Ansible",
  "Cloud", "DevOps", "VPN", "SMTP", "REST API"
];

export default function TechOrbit() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w, h, cx, cy, radius;
    let visible = true;
    let frameId;
    let hoveredIndex = -1;

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
      radius = Math.min(w, h) * 0.38;
    }

    function getItemPos(i, t) {
      const angle = (i / TECH_ITEMS.length) * Math.PI * 2 + t * 0.15;
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius * 0.65,
        angle,
      };
    }

    function draw(time) {
      if (!visible) { frameId = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, w, h);

      const t = reduce ? 0 : time * 0.001;

      // Orbit ring
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius, radius * 0.65, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner ring
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * 0.55, radius * 0.55 * 0.65, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(139, 92, 246, 0.04)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Connection lines from center to items
      TECH_ITEMS.forEach((_, i) => {
        const pos = getItemPos(i, t);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = `rgba(56, 189, 248, ${i === hoveredIndex ? 0.15 : 0.03})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Items
      TECH_ITEMS.forEach((item, i) => {
        const pos = getItemPos(i, t);
        const isHovered = i === hoveredIndex;
        const pulse = isHovered ? 1.4 : 0.8 + Math.sin(t * 0.5 + i) * 0.2;

        // Node dot
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, (isMobile ? 3 : 4) * pulse, 0, Math.PI * 2);
        ctx.fillStyle = isHovered
          ? "rgba(56, 189, 248, 0.9)"
          : `rgba(56, 189, 248, ${0.3 + pulse * 0.2})`;
        ctx.fill();

        // Glow on hover
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 16, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(56, 189, 248, 0.1)";
          ctx.fill();
        }

        // Label
        if (!isMobile || isHovered) {
          ctx.font = `${isHovered ? "600" : "500"} ${isMobile ? 9 : 11}px "IBM Plex Sans", sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = isHovered
            ? "rgba(232, 236, 244, 0.95)"
            : "rgba(176, 184, 204, 0.6)";
          ctx.fillText(item, pos.x, pos.y + (isMobile ? 14 : 18));
        }
      });

      // Center label
      ctx.font = `600 ${isMobile ? 10 : 12}px "Fira Code", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(56, 189, 248, 0.5)";
      ctx.fillText("AT8", cx, cy);

      frameId = requestAnimationFrame(draw);
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      hoveredIndex = -1;
      const t = performance.now() * 0.001;
      TECH_ITEMS.forEach((_, i) => {
        const pos = getItemPos(i, t);
        const dx = mx - pos.x;
        const dy = my - pos.y;
        if (Math.sqrt(dx * dx + dy * dy) < 20) hoveredIndex = i;
      });
    };

    resize();
    frameId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);

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
    <div className="tech-orbit-wrap">
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
