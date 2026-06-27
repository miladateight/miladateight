import { useEffect, useRef } from "react";

export function useStarField(canvasRef) {
  const stateRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const starCount = reduce ? 20 : isMobile ? 28 : 70;
    let w, h;
    let visible = true;

    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        size: 0.3 + Math.random() * 1.2,
        speed: 0.02 + Math.random() * 0.06,
        opacity: 0.3 + Math.random() * 0.5,
        layer: Math.floor(Math.random() * 3)
      });
    }

    const shootingStars = [];
    function spawnShootingStar() {
      if (reduce) return;
      shootingStars.push({
        x: Math.random(),
        y: Math.random() * 0.3,
        speed: 0.008 + Math.random() * 0.012,
        life: 1,
        length: 0.06 + Math.random() * 0.06
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

    let frameId;
    let lastSpawn = 0;

    function draw(time) {
      if (!visible) {
        frameId = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      if (reduce) {
        stars.forEach((s) => {
          ctx.beginPath();
          ctx.arc(s.x * w, s.y * h, s.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(148, 163, 184, ${s.opacity * 0.3})`;
          ctx.fill();
        });
        frameId = requestAnimationFrame(draw);
        return;
      }

      stars.forEach((s) => {
        const parallax = 1 + s.layer * 0.15;
        s.x -= s.speed * 0.004 * parallax;
        if (s.x < -0.02) s.x = 1.02;
        const twinkle = 0.6 + Math.sin(time * 0.001 + s.z * 100) * 0.4;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.size * (0.5 + s.layer * 0.15), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 232, 240, ${s.opacity * twinkle * 0.6})`;
        ctx.fill();
      });

      if (time - lastSpawn > 3000 + Math.random() * 4000) {
        spawnShootingStar();
        lastSpawn = time;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.speed;
        ss.y += ss.speed * 0.3;
        ss.life -= 0.008;
        if (ss.life <= 0 || ss.x > 1.1) {
          shootingStars.splice(i, 1);
          continue;
        }
        const sx = ss.x * w;
        const sy = ss.y * h;
        const sl = ss.length * w;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx - sl, sy - sl * 0.3);
        ctx.strokeStyle = `rgba(148, 163, 184, ${ss.life * 0.6})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      frameId = requestAnimationFrame(draw);
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

    stateRef.current = { destroy: () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibilityHandler);
      observer.disconnect();
    }};

    return () => stateRef.current.destroy();
  }, [canvasRef]);
}
