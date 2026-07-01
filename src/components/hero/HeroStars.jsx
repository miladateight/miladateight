import { useEffect, useRef } from "react";

const COLOR_VARIANTS = [
  { rgb: "226, 245, 255", weight: 5 },
  { rgb: "190, 242, 255", weight: 4 },
  { rgb: "125, 211, 252", weight: 3 },
  { rgb: "165, 180, 252", weight: 2 },
  { rgb: "196, 181, 253", weight: 2 },
  { rgb: "94, 234, 212", weight: 1 },
];
const COLOR_POOL = (() => {
  const pool = [];
  COLOR_VARIANTS.forEach((v) => { for (let i = 0; i < v.weight; i += 1) pool.push(v.rgb); });
  return pool;
})();
const pickColor = () => COLOR_POOL[Math.floor(Math.random() * COLOR_POOL.length)];

function makeStar(layer, w, h) {
  const radiusRange = layer === 0 ? [0.4, 0.9] : layer === 1 ? [0.7, 1.3] : layer === 2 ? [1.0, 1.7] : [1.4, 2.4];
  const alphaRange = layer === 0 ? [0.22, 0.45] : layer === 1 ? [0.34, 0.62] : layer === 2 ? [0.5, 0.82] : [0.62, 0.95];
  const r = radiusRange[0] + Math.random() * (radiusRange[1] - radiusRange[0]);
  const baseAlpha = alphaRange[0] + Math.random() * (alphaRange[1] - alphaRange[0]);
  const drift = layer === 0 ? 0.00001 : layer === 1 ? 0.00002 : layer === 2 ? 0.000032 : 0.000045;
  return {
    layer,
    x: Math.random() * w,
    y: Math.random() * h,
    r,
    baseAlpha,
    color: pickColor(),
    twinkleSpeed: 0.5 + Math.random() * 1.4,
    twinklePhase: Math.random() * Math.PI * 2,
    drift,
    glow: layer >= 2 && Math.random() < 0.35,
  };
}

function makeShooter(index) {
  const angle = -0.62 + Math.random() * 0.5;
  const length = 160 + Math.random() * 120;
  return {
    x: -0.18 - Math.random() * 0.12,
    y: 0.04 + Math.random() * 0.46,
    vx: 0.0016 + Math.random() * 0.0009,
    length,
    thickness: 1.1 + Math.random() * 0.7,
    headAlpha: 0.7 + Math.random() * 0.2,
    angle,
    cosA: Math.cos(angle),
    sinA: Math.sin(angle),
    life: 0,
    maxLife: 1.1 + Math.random() * 0.6,
    cooldown: index * 1.4 + Math.random() * 2,
    maxCooldown: 4 + Math.random() * 8,
    active: false,
  };
}

export default function HeroStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMedia = window.matchMedia("(max-width: 768px)");
    let reduce = motionMedia.matches;
    let isMobile = mobileMedia.matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars = [];
    let shooters = [];
    let nebulae = [];
    let frameId = 0;
    let visible = true;
    let inViewport = true;
    let paused = true;
    let lastTime = 0;

    const buildStars = () => {
      if (w === 0 || h === 0) return;
      stars = [];
      const counts = isMobile
        ? [40, 32, 20, 8]
        : [90, 70, 44, 18];
      for (let layer = 0; layer < 4; layer += 1) {
        for (let i = 0; i < counts[layer]; i += 1) {
          stars.push(makeStar(layer, w, h));
        }
      }
    };

    const buildShooters = () => {
      const count = isMobile ? 2 : 5;
      shooters = Array.from({ length: count }, (_, i) => makeShooter(i));
    };

    const buildNebulae = () => {
      if (w === 0 || h === 0) return;
      const count = isMobile ? 2 : 4;
      const palette = [
        { rgb: "56, 189, 248", alpha: 0.1 },
        { rgb: "139, 92, 246", alpha: 0.08 },
        { rgb: "45, 212, 191", alpha: 0.06 },
        { rgb: "99, 102, 241", alpha: 0.08 },
      ];
      nebulae = Array.from({ length: count }, (_, i) => ({
        x: 0.12 + Math.random() * 0.76,
        y: 0.1 + Math.random() * 0.7,
        r: (isMobile ? 0.28 : 0.36) + Math.random() * 0.22,
        color: palette[i % palette.length],
        phase: Math.random() * Math.PI * 2,
        speed: 0.18 + Math.random() * 0.22,
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = parent.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawNebulae = (t) => {
      for (let i = 0; i < nebulae.length; i += 1) {
        const n = nebulae[i];
        const breathe = 0.78 + Math.sin(t * n.speed + n.phase) * 0.22;
        const radius = n.r * Math.min(w, h);
        const cx = n.x * w;
        const cy = n.y * h;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${n.color.rgb}, ${(n.color.alpha * breathe).toFixed(3)})`);
        grad.addColorStop(0.55, `rgba(${n.color.rgb}, ${(n.color.alpha * 0.35 * breathe).toFixed(3)})`);
        grad.addColorStop(1, `rgba(${n.color.rgb}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      }
    };

    const drawStars = () => {
      for (let i = 0; i < stars.length; i += 1) {
        const s = stars[i];
        const twinkle = 0.55 + Math.sin(s.twinklePhase) * 0.45;
        const alpha = s.baseAlpha * twinkle;
        if (s.glow) {
          ctx.shadowBlur = s.r * 3.2;
          ctx.shadowColor = `rgba(${s.color}, ${alpha.toFixed(3)})`;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${alpha.toFixed(3)})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const drawShooter = (m) => {
      const headX = m.x * w;
      const headY = m.y * h;
      const tailX = headX - m.cosA * m.length;
      const tailY = headY - m.sinA * m.length;
      const lifeT = m.life / m.maxLife;
      const fadeIn = Math.min(1, lifeT / 0.16);
      const fadeOut = Math.min(1, (1 - lifeT) / 0.3);
      const fade = Math.min(fadeIn, fadeOut);
      const headColor = "226, 245, 255";
      const trailColor = "125, 211, 252";
      const midColor = "190, 242, 255";
      const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
      grad.addColorStop(0, `rgba(${trailColor}, 0)`);
      grad.addColorStop(0.5, `rgba(${trailColor}, ${(0.05 * fade).toFixed(3)})`);
      grad.addColorStop(0.82, `rgba(${midColor}, ${(0.28 * fade * m.headAlpha).toFixed(3)})`);
      grad.addColorStop(0.96, `rgba(${headColor}, ${(0.85 * fade * m.headAlpha).toFixed(3)})`);
      grad.addColorStop(1, `rgba(${headColor}, ${(0.98 * fade * m.headAlpha).toFixed(3)})`);
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(headX, headY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = m.thickness;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(headX, headY, m.thickness * 1.7, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${headColor}, ${(0.9 * fade * m.headAlpha).toFixed(3)})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${midColor}, ${(0.7 * fade).toFixed(3)})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const updateStars = (dt) => {
      for (let i = 0; i < stars.length; i += 1) {
        const s = stars[i];
        s.y += s.drift * dt;
        s.twinklePhase += s.twinkleSpeed * 0.0026 * dt;
        if (s.y > h + 6) {
          s.y = -6;
          s.x = Math.random() * w;
        }
      }
    };

    const updateShooters = (dt) => {
      for (let i = 0; i < shooters.length; i += 1) {
        const m = shooters[i];
        if (m.active) {
          m.life += dt * 0.001;
          m.x += m.vx * dt;
          m.y += m.sinA * m.vx * dt;
          if (m.life >= m.maxLife || m.x > 1.22) {
            m.active = false;
            m.cooldown = 0;
            m.maxCooldown = (isMobile ? 6 : 3.5) + Math.random() * (isMobile ? 9 : 7);
          }
        } else {
          m.cooldown += dt * 0.001;
          if (m.cooldown >= m.maxCooldown) {
            m.active = true;
            m.life = 0;
            m.maxLife = 1.1 + Math.random() * 0.6;
            m.x = -0.18 - Math.random() * 0.12;
            m.y = 0.04 + Math.random() * 0.46;
            m.vx = 0.0016 + Math.random() * 0.0009;
            m.angle = -0.62 + Math.random() * 0.5;
            m.cosA = Math.cos(m.angle);
            m.sinA = Math.sin(m.angle);
            m.length = 160 + Math.random() * 120;
            m.thickness = 1.1 + Math.random() * 0.7;
          }
        }
      }
    };

    const render = (dt, t) => {
      ctx.clearRect(0, 0, w, h);
      drawNebulae(t);
      drawStars();
      if (!reduce) {
        updateShooters(dt);
        for (let i = 0; i < shooters.length; i += 1) {
          if (shooters[i].active) drawShooter(shooters[i]);
        }
      }
    };

    const frame = (time) => {
      if (!visible || !inViewport) {
        paused = true;
        return;
      }
      paused = false;
      const dt = Math.min(64, time - lastTime || 16);
      lastTime = time;
      const t = time * 0.001;
      if (!reduce) updateStars(dt);
      render(dt, t);
      frameId = window.requestAnimationFrame(frame);
    };

    const start = () => {
      if (!paused) return;
      paused = false;
      lastTime = performance.now();
      frameId = window.requestAnimationFrame(frame);
    };

    const stop = () => {
      paused = true;
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      drawNebulae(0);
      drawStars();
    };

    const resetForMedia = () => {
      resize();
      buildStars();
      buildShooters();
      buildNebulae();
      if (reduce) drawStatic();
    };

    const visibilityHandler = () => {
      if (document.hidden) stop();
      else if (visible && inViewport) start();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        if (inViewport && !document.hidden) start();
        else stop();
      },
      { threshold: 0.01 }
    );

    resize();
    buildStars();
    buildShooters();
    buildNebulae();
    if (reduce) drawStatic();
    else start();

    window.addEventListener("resize", resetForMedia, { passive: true });
    document.addEventListener("visibilitychange", visibilityHandler);
    const motionListener = () => {
      reduce = motionMedia.matches;
      isMobile = mobileMedia.matches;
      resetForMedia();
      if (reduce) drawStatic();
      else start();
    };
    motionMedia.addEventListener?.("change", motionListener);
    mobileMedia.addEventListener?.("change", motionListener);
    observer.observe(canvas);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resetForMedia);
      document.removeEventListener("visibilitychange", visibilityHandler);
      motionMedia.removeEventListener?.("change", motionListener);
      mobileMedia.removeEventListener?.("change", motionListener);
    };
  }, []);

  return (
    <div className="hero-stars" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}