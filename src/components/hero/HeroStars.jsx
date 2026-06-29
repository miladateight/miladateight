import { useEffect, useRef } from "react";

const FAR_COLOR = "226, 245, 255";
const MID_COLOR = "190, 242, 255";
const NEAR_COLOR = "125, 211, 252";

function makeStar(depth, w, h, isMobile) {
  const layer = depth === 0 ? "far" : depth === 1 ? "mid" : "near";
  const radiusRange = layer === "far" ? [0.5, 0.9] : layer === "mid" ? [0.7, 1.3] : [1.0, 1.8];
  const alphaRange = layer === "far" ? [0.18, 0.36] : layer === "mid" ? [0.28, 0.5] : [0.36, 0.6];
  const r = radiusRange[0] + Math.random() * (radiusRange[1] - radiusRange[0]);
  const baseAlpha = alphaRange[0] + Math.random() * (alphaRange[1] - alphaRange[0]);
  return {
    layer,
    x: Math.random() * w,
    y: Math.random() * h,
    r,
    baseAlpha,
    twinkleSpeed: 0.4 + Math.random() * 0.9,
    twinklePhase: Math.random() * Math.PI * 2,
    drift: layer === "far" ? 0.000012 : layer === "mid" ? 0.000022 : 0.000032,
    color: layer === "far" ? FAR_COLOR : layer === "mid" ? MID_COLOR : NEAR_COLOR,
    isMobile,
  };
}

function makeShootingStar() {
  const angle = -0.55 + Math.random() * 0.37;
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const length = 110 + Math.random() * 70;
  return {
    x: -0.15 - Math.random() * 0.1,
    y: 0.08 + Math.random() * 0.32,
    vx: 0.0014 + Math.random() * 0.0007,
    length,
    thickness: 0.9 + Math.random() * 0.5,
    headAlpha: 0.6 + Math.random() * 0.18,
    angle,
    cosA,
    sinA,
    life: 0,
    maxLife: 0.95 + Math.random() * 0.45,
    cooldown: 0,
    maxCooldown: 5 + Math.random() * 9,
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
    let frameId = 0;
    let visible = true;
    let inViewport = true;
    let paused = true;

    const buildStars = () => {
      if (w === 0 || h === 0) return;
      stars = [];
      const counts = isMobile ? [12, 9, 5] : [22, 18, 10];
      for (let depth = 0; depth < 3; depth += 1) {
        for (let i = 0; i < counts[depth]; i += 1) {
          stars.push(makeStar(depth, w, h, isMobile));
        }
      }
    };

    const buildShooters = () => {
      shooters = Array.from({ length: isMobile ? 1 : 2 }, () => makeShootingStar());
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

    const drawStars = () => {
      for (let i = 0; i < stars.length; i += 1) {
        const s = stars[i];
        const twinkle = 0.55 + Math.sin(s.twinklePhase) * 0.45;
        const alpha = s.baseAlpha * twinkle;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${alpha.toFixed(3)})`;
        ctx.fill();
      }
    };

    const drawShooter = (meteor) => {
      const headX = meteor.x * w;
      const headY = meteor.y * h;
      const tailX = headX - meteor.cosA * meteor.length;
      const tailY = headY - meteor.sinA * meteor.length;
      const lifeT = meteor.life / meteor.maxLife;
      const fadeIn = Math.min(1, lifeT / 0.18);
      const fadeOut = Math.min(1, (1 - lifeT) / 0.32);
      const fade = Math.min(fadeIn, fadeOut);
      const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
      grad.addColorStop(0, `rgba(${NEAR_COLOR}, 0)`);
      grad.addColorStop(0.65, `rgba(${MID_COLOR}, ${(0.06 * fade).toFixed(3)})`);
      grad.addColorStop(0.92, `rgba(${FAR_COLOR}, ${(0.32 * fade * meteor.headAlpha).toFixed(3)})`);
      grad.addColorStop(1, `rgba(${FAR_COLOR}, ${(0.85 * fade * meteor.headAlpha).toFixed(3)})`);
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(headX, headY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = meteor.thickness;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(headX, headY, meteor.thickness * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${FAR_COLOR}, ${(0.7 * fade * meteor.headAlpha).toFixed(3)})`;
      ctx.fill();
    };

    const updateStars = (dt) => {
      for (let i = 0; i < stars.length; i += 1) {
        const s = stars[i];
        s.y += s.drift * dt;
        s.twinklePhase += s.twinkleSpeed * 0.0024 * dt;
        if (s.y > h + 4) {
          s.y = -4;
          s.x = Math.random() * w;
        }
      }
    };

    const updateShooters = (dt) => {
      for (let i = 0; i < shooters.length; i += 1) {
        const meteor = shooters[i];
        if (meteor.active) {
          meteor.life += dt * 0.001;
          meteor.x += meteor.vx * dt;
          meteor.y += meteor.sinA * meteor.vx * dt;
          if (meteor.life >= meteor.maxLife || meteor.x > 1.18) {
            meteor.active = false;
            meteor.cooldown = 0;
            meteor.maxCooldown = (isMobile ? 7 : 5) + Math.random() * (isMobile ? 11 : 9);
          }
        } else {
          meteor.cooldown += dt * 0.001;
          if (meteor.cooldown >= meteor.maxCooldown) {
            meteor.active = true;
            meteor.life = 0;
            meteor.maxLife = 0.95 + Math.random() * 0.45;
            meteor.x = -0.15 - Math.random() * 0.1;
            meteor.y = 0.08 + Math.random() * 0.32;
            meteor.vx = 0.0014 + Math.random() * 0.0007;
            meteor.angle = -0.55 + Math.random() * 0.37;
            meteor.cosA = Math.cos(meteor.angle);
            meteor.sinA = Math.sin(meteor.angle);
          }
        }
      }
    };

    const render = (dt) => {
      ctx.clearRect(0, 0, w, h);
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
      if (!reduce) updateStars(dt);
      render(dt);
      frameId = window.requestAnimationFrame(frame);
    };

    let lastTime = 0;
    const start = () => {
      if (!paused) return;
      paused = false;
      lastTime = performance.now();
      frameId = window.requestAnimationFrame(frame);
    };

    const stop = () => {
      paused = true;
      window.cancelAnimationFrame(frame);
      frameId = 0;
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      drawStars();
    };

    const resetForMedia = () => {
      resize();
      buildStars();
      buildShooters();
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