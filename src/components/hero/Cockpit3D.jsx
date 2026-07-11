import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, ContactShadows, RoundedBox } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

/* ============================ screen textures ============================ */
function makeTexture(draw, w = 512, h = 320) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.minFilter = THREE.LinearFilter;
  return tex;
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function drawCode(ctx, w, h) {
  ctx.fillStyle = "#0a1220";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#111c2f";
  ctx.fillRect(0, 0, w, 30);
  ["#f87171", "#fbbf24", "#34d399"].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(20 + i * 18, 15, 5, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = "rgba(148,197,253,0.7)";
  ctx.font = "600 13px monospace";
  ctx.fillText("ateight.dev — main.tsx", 80, 20);
  ctx.fillStyle = "rgba(56,189,248,0.06)";
  ctx.fillRect(0, 30, 34, h - 30);
  const palette = ["#7dd3fc", "#c4b5fd", "#5eead4", "#fcd34d", "#94a3b8", "#f9a8d4"];
  let y = 50;
  [[0, 120], [1, 90], [1, 170], [2, 80], [2, 140], [0, 60], [1, 150], [2, 70], [2, 130], [1, 110], [0, 95], [1, 160]].forEach(([indent, wd], i) => {
    ctx.fillStyle = "rgba(125,180,230,0.35)";
    ctx.font = "11px monospace";
    ctx.fillText(String(i + 1), 12, y + 9);
    ctx.fillStyle = palette[i % palette.length];
    roundRect(ctx, 44 + indent * 18, y, wd, 7, 3.5);
    ctx.fill();
    if (wd > 100) {
      ctx.fillStyle = palette[(i + 2) % palette.length];
      roundRect(ctx, 44 + indent * 18 + wd + 10, y, 40, 7, 3.5);
      ctx.fill();
    }
    y += 16;
  });
  ctx.fillStyle = "#05090f";
  ctx.fillRect(0, h - 78, w, 78);
  ctx.fillStyle = "rgba(148,197,253,0.55)";
  ctx.font = "600 11px monospace";
  ctx.fillText("● ● ●  terminal — ops", 14, h - 60);
  ctx.fillStyle = "rgba(94,234,212,0.8)";
  ctx.font = "11px monospace";
  ["deploy ateight.xyz → stable", "wg0 handshake 24ms", "haproxy web:443 healthy"].forEach((l, i) =>
    ctx.fillText("› " + l, 14, h - 40 + i * 14)
  );
}
function drawDash(ctx, w, h) {
  ctx.fillStyle = "#0a1220";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(148,197,253,0.8)";
  ctx.font = "700 16px monospace";
  ctx.fillText("monitoring", 24, 36);
  ctx.fillStyle = "rgba(148,163,184,0.7)";
  ctx.font = "12px monospace";
  ctx.fillText("uptime · 99.98%", 24, 58);
  const pts = [[24, 150], [80, 120], [136, 138], [192, 96], [248, 116], [320, 70], [400, 92], [470, 56]];
  ctx.strokeStyle = "#2dd4bf";
  ctx.lineWidth = 3;
  ctx.beginPath();
  pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.stroke();
  ctx.fillStyle = "#5eead4";
  ctx.beginPath();
  ctx.arc(470, 56, 4, 0, Math.PI * 2);
  ctx.fill();
  const colors = ["#38bdf8", "#2dd4bf", "#8b5cf6"];
  [120, 200, 150, 240, 170, 210, 130].forEach((bh, i) => {
    ctx.fillStyle = colors[i % colors.length];
    roundRect(ctx, 28 + i * 64, h - 28 - bh, 40, bh, 6);
    ctx.fill();
  });
}
function drawWall(ctx, w, h) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#26426d");
  g.addColorStop(0.5, "#5a5a9e");
  g.addColorStop(1, "#cda7ba");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,243,216,0.95)";
  ctx.beginPath();
  ctx.arc(w - 110, 80, 34, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#3a4a7a";
  ctx.beginPath();
  ctx.moveTo(0, 210);
  ctx.lineTo(120, 130);
  ctx.lineTo(230, 200);
  ctx.lineTo(330, 120);
  ctx.lineTo(460, 190);
  ctx.lineTo(512, 150);
  ctx.lineTo(512, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#23304f";
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, 250);
  ctx.lineTo(150, 190);
  ctx.lineTo(280, 240);
  ctx.lineTo(400, 200);
  ctx.lineTo(512, 250);
  ctx.lineTo(512, h);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(8,14,24,0.55)";
  roundRect(ctx, w / 2 - 90, h - 40, 180, 26, 13);
  ctx.fill();
  ["#7dd3fc", "#5eead4", "#c4b5fd", "#fcd34d"].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(w / 2 - 60 + i * 40, h - 27, 7, 0, Math.PI * 2);
    ctx.fill();
  });
}

/* ============================ palette ============================ */
const SKIN = "#e3b08a";
const TEE = "#2f7d8c";
const PANTS = "#222a38";
const HAIR = "#150f0a";
const CHAIR = "#15171d";
const CHAIR_TRIM = "#22d3ee";
const DESK = "#3a2a1d";
const ENERGY = "#a3e635";

/* ============================ geometry helpers ============================ */
function Limb({ from, to, radius = 0.06, color = SKIN, rough = 0.8 }) {
  const { pos, quat, len } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const dir = b.clone().sub(a);
    const length = dir.length();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    return { pos: a.clone().add(b).multiplyScalar(0.5), quat: q, len: length };
  }, [from, to]);
  return (
    <mesh position={pos} quaternion={quat} castShadow>
      <capsuleGeometry args={[radius, len, 4, 10]} />
      <meshStandardMaterial color={color} roughness={rough} />
    </mesh>
  );
}

/* ============================ monitor ============================ */
function Monitor({ position, rotation = [0, 0, 0], texture, glow = "#38bdf8" }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, -0.36, -0.02]} castShadow>
        <cylinderGeometry args={[0.03, 0.04, 0.34, 12]} />
        <meshStandardMaterial color="#10151f" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.53, 0.04]}>
        <cylinderGeometry args={[0.17, 0.2, 0.03, 24]} />
        <meshStandardMaterial color="#0b0f17" metalness={0.4} roughness={0.6} />
      </mesh>
      <RoundedBox args={[1.4, 0.86, 0.05]} radius={0.024} smoothness={3} castShadow>
        <meshStandardMaterial color="#05080e" metalness={0.5} roughness={0.45} />
      </RoundedBox>
      <mesh position={[0, 0, 0.028]}>
        <planeGeometry args={[1.3, 0.76]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0, 0.5]} intensity={0.55} distance={2.6} color={glow} />
    </group>
  );
}

/* ============================ desk + props ============================ */
function Desk() {
  const legs = [[-2.1, -1.62], [2.1, -1.62], [-2.1, -0.22], [2.1, -0.22]];
  return (
    <group>
      <RoundedBox args={[4.7, 0.12, 1.62]} radius={0.04} smoothness={3} position={[0, 1.5, -0.92]} castShadow receiveShadow>
        <meshStandardMaterial color={DESK} roughness={0.6} metalness={0.05} />
      </RoundedBox>
      {/* under-desk RGB underglow strip */}
      <mesh position={[0, 1.44, -0.12]}>
        <boxGeometry args={[4.4, 0.02, 0.02]} />
        <meshBasicMaterial color="#8b5cf6" toneMapped={false} />
      </mesh>
      {legs.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.73, z]} castShadow>
          <boxGeometry args={[0.1, 1.42, 0.1]} />
          <meshStandardMaterial color="#1d150e" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}
function Keyboard() {
  const glow = useRef();
  const reduce = useReducedMotion();
  useFrame((state) => {
    if (!glow.current || reduce) return;
    const t = state.clock.elapsedTime * 0.6;
    glow.current.material.color.setHSL((t % 1), 0.8, 0.6); // slow RGB cycle of the underglow
  });
  return (
    <group position={[0, 1.585, -0.3]}>
      {/* RGB underglow that spills onto the desk (not the keys) */}
      <mesh ref={glow} position={[0, -0.028, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.26, 0.56]} />
        <meshBasicMaterial color="#22d3ee" toneMapped={false} transparent opacity={0.85} />
      </mesh>
      {/* lighter graphite aluminium board */}
      <RoundedBox args={[1.16, 0.05, 0.44]} radius={0.02} smoothness={2} castShadow>
        <meshStandardMaterial color="#2a313f" metalness={0.45} roughness={0.45} />
      </RoundedBox>
      {/* lighter keycaps with a clearer per-key backlight bleed */}
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 14 }).map((_, c) => (
          <mesh key={`${r}-${c}`} position={[-0.49 + c * 0.075, 0.032, -0.15 + r * 0.072]} castShadow>
            <boxGeometry args={[0.058, 0.014, 0.058]} />
            <meshStandardMaterial color="#3b4456" emissive="#5b6b85" emissiveIntensity={0.4} roughness={0.55} />
          </mesh>
        ))
      )}
    </group>
  );
}
function Mouse() {
  return (
    <group position={[0.79, 1.6, -0.58]}>
      <mesh castShadow>
        <capsuleGeometry args={[0.05, 0.07, 4, 12]} />
        <meshStandardMaterial color="#0a0d14" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.03, 0.02]}>
        <boxGeometry args={[0.012, 0.005, 0.05]} />
        <meshBasicMaterial color="#22d3ee" toneMapped={false} />
      </mesh>
      {/* mouse RGB underglow */}
      <mesh position={[0, -0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.16, 0.2]} />
        <meshBasicMaterial color="#8b5cf6" toneMapped={false} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}
function Mug() {
  return (
    <group position={[-1.75, 1.62, -0.5]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.1, 0.09, 0.18, 20]} />
        <meshStandardMaterial color="#0f2233" metalness={0.2} roughness={0.5} />
      </mesh>
      <mesh position={[0.12, 0, 0]}>
        <torusGeometry args={[0.05, 0.014, 8, 18]} />
        <meshStandardMaterial color="#0f2233" />
      </mesh>
    </group>
  );
}
function Plant() {
  return (
    <group position={[-2.55, 0, -0.6]}>
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.14, 0.34, 16]} />
        <meshStandardMaterial color="#1c2a2a" roughness={0.9} />
      </mesh>
      {Array.from({ length: 9 }).map((_, i) => {
        const a = (i / 9) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.1, 0.62, Math.sin(a) * 0.1]} rotation={[0.5 * Math.cos(a), a, 0.5 * Math.sin(a)]} castShadow>
            <coneGeometry args={[0.06, 0.5, 5]} />
            <meshStandardMaterial color="#2f8f5f" roughness={0.8} />
          </mesh>
        );
      })}
    </group>
  );
}
function Tower() {
  const rgb = useRef();
  const reduce = useReducedMotion();
  useFrame((state) => {
    if (rgb.current && !reduce) rgb.current.material.emissiveIntensity = 1.4 + Math.sin(state.clock.elapsedTime * 2) * 0.6;
  });
  return (
    <group position={[2.15, 0, -0.5]}>
      <RoundedBox args={[0.5, 1.25, 1.0]} radius={0.04} smoothness={3} position={[0, 0.64, 0]} castShadow>
        <meshStandardMaterial color="#0c1119" metalness={0.5} roughness={0.4} />
      </RoundedBox>
      <mesh position={[-0.251, 0.7, 0.05]}>
        <planeGeometry args={[0.34, 0.85]} />
        <meshStandardMaterial color="#0a1018" transparent opacity={0.5} metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh ref={rgb} position={[-0.252, 0.7, 0.05]}>
        <planeGeometry args={[0.04, 0.85]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.6} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ============================ person ============================ */
function HairCap() {
  const curls = useMemo(() => {
    const pts = [];
    const R = 0.23;
    for (let i = 0; i < 96; i++) {
      const y = 1 - (i / 95) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = i * 2.399963;
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;
      if (y < -0.22) continue;                  // below the ears → skip
      if (z < -0.1 && y < 0.55) continue;        // front face (−z, lower) → leave clear
      const cr = 0.052 + ((i * 7) % 3) * 0.016;  // varied curl sizes for a fuller afro
      pts.push([x * R * 1.05, y * R * 1.05 + 0.05, z * R * 1.05, cr]);
    }
    return pts;
  }, []);
  return (
    <group>
      {/* base hair volume so no scalp shows through */}
      <mesh position={[0, 0.06, 0.02]} scale={[1.04, 1.02, 1.06]}>
        <sphereGeometry args={[0.215, 20, 20]} />
        <meshStandardMaterial color={HAIR} roughness={1} />
      </mesh>
      {curls.map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <sphereGeometry args={[r, 10, 10]} />
          <meshStandardMaterial color={i % 4 === 0 ? "#241910" : HAIR} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

const smoothstep = (value) => {
  const t = THREE.MathUtils.clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
};

const windowProgress = (time, start, end) => smoothstep((time - start) / (end - start));

const LIMB_AXIS = new THREE.Vector3(0, 1, 0);
const LIMB_DIRECTION = new THREE.Vector3();
const IK_DIRECTION = new THREE.Vector3();
const IK_POLE = new THREE.Vector3();
const IK_PROJECTION = new THREE.Vector3();
function setLimbPose(mesh, from, to) {
  if (!mesh) return;
  LIMB_DIRECTION.copy(to).sub(from);
  const length = LIMB_DIRECTION.length();
  if (length < 0.0001) return;
  mesh.position.copy(from).add(to).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(LIMB_AXIS, LIMB_DIRECTION.normalize());
  mesh.scale.y = length / mesh.userData.baseLength;
}

function solveElbow(shoulder, wrist, pole, upperLength, lowerLength, out) {
  IK_DIRECTION.copy(wrist).sub(shoulder);
  const distance = THREE.MathUtils.clamp(IK_DIRECTION.length(), 0.001, upperLength + lowerLength - 0.004);
  IK_DIRECTION.normalize();
  const along = (upperLength ** 2 - lowerLength ** 2 + distance ** 2) / (2 * distance);
  const height = Math.sqrt(Math.max(0, upperLength ** 2 - along ** 2));
  IK_POLE.copy(pole);
  IK_PROJECTION.copy(IK_DIRECTION).multiplyScalar(IK_POLE.dot(IK_DIRECTION));
  IK_POLE.sub(IK_PROJECTION).normalize();
  out.copy(shoulder).addScaledVector(IK_DIRECTION, along).addScaledVector(IK_POLE, height);
}

function AnimatedLimb({ limbRef, radius, color = SKIN }) {
  return (
    <mesh ref={limbRef} castShadow userData={{ baseLength: 0.2 + radius * 2 }}>
      <capsuleGeometry args={[radius, 0.2, 4, 12]} />
      <meshStandardMaterial color={color} roughness={0.82} />
    </mesh>
  );
}

function Hand({ handRef, side }) {
  return (
    <group ref={handRef} rotation={[0.46, 0, side * 0.04]}>
      <RoundedBox args={[0.105, 0.042, 0.115]} radius={0.022} smoothness={3} castShadow>
        <meshStandardMaterial color={SKIN} roughness={0.75} />
      </RoundedBox>
      {[-0.032, 0, 0.032].map((x, index) => (
        <RoundedBox
          key={x}
          args={[0.022, 0.022, 0.07 + (index === 1 ? 0.008 : 0)]}
          radius={0.01}
          smoothness={2}
          position={[x, -0.004, -0.075]}
          castShadow
        >
          <meshStandardMaterial color={SKIN} roughness={0.75} />
        </RoundedBox>
      ))}
      <mesh position={[side * 0.058, -0.002, -0.014]} rotation={[0.2, 0, side * 0.48]} castShadow>
        <capsuleGeometry args={[0.012, 0.045, 3, 8]} />
        <meshStandardMaterial color={SKIN} roughness={0.75} />
      </mesh>
    </group>
  );
}

function Person() {
  const root = useRef();
  const torso = useRef();
  const head = useRef();
  const lSleeve = useRef();
  const lUpperArm = useRef();
  const lLowerArm = useRef();
  const lHand = useRef();
  const rSleeve = useRef();
  const rUpperArm = useRef();
  const rLowerArm = useRef();
  const rHand = useRef();
  const can = useRef();
  const reduce = useReducedMotion();

  const canRest = useMemo(() => new THREE.Vector3(0.69, 1.65, -0.3), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const arm = useMemo(() => ({
    upperLength: 0.33,
    lowerLength: 0.31,
    leftShoulder: new THREE.Vector3(-0.265, 1.64, 0),
    leftWrist: new THREE.Vector3(-0.19, 1.68, -0.45),
    leftPole: new THREE.Vector3(-1, -0.45, 0.18),
    leftElbow: new THREE.Vector3(),
    leftSleeveEnd: new THREE.Vector3(),
    rightShoulder: new THREE.Vector3(0.265, 1.64, 0),
    rightWrist: new THREE.Vector3(0.19, 1.68, -0.45),
    rightPole: new THREE.Vector3(1, -0.45, 0.18),
    rightElbow: new THREE.Vector3(),
    rightSleeveEnd: new THREE.Vector3(),
    reachWrist: new THREE.Vector3(0.655, 1.66, -0.48),
    sipWrist: new THREE.Vector3(0.14, 1.92, -0.055),
    wristNow: new THREE.Vector3(),
  }), []);

  useFrame((state) => {
    if (reduce) return;
    const t = state.clock.elapsedTime;
    if (root.current) root.current.position.y = Math.sin(t * 1.35) * 0.009;
    if (torso.current) {
      torso.current.rotation.x = -0.11 + Math.sin(t * 1.35) * 0.008;
      torso.current.scale.y = 1 + Math.sin(t * 1.35) * 0.008;
    }

    // Fingers travel only a few millimetres: the palms stay above the keycaps,
    // so the animation reads as typing without the hand entering the keyboard.
    const cycle = t % 15.5;
    const typing = cycle < 7 || cycle > 13.5;
    const leftTap = typing ? Math.max(0, Math.sin(t * 11.2)) : 0;
    const rightTap = typing ? Math.max(0, Math.sin(t * 10.7 + 1.8)) : 0;
    arm.leftWrist.y = 1.68 - leftTap * 0.005;
    solveElbow(arm.leftShoulder, arm.leftWrist, arm.leftPole, arm.upperLength, arm.lowerLength, arm.leftElbow);
    arm.leftSleeveEnd.lerpVectors(arm.leftShoulder, arm.leftElbow, 0.28);
    setLimbPose(lSleeve.current, arm.leftShoulder, arm.leftSleeveEnd);
    setLimbPose(lUpperArm.current, arm.leftSleeveEnd, arm.leftElbow);
    setLimbPose(lLowerArm.current, arm.leftElbow, arm.leftWrist);
    if (lHand.current) {
      lHand.current.position.copy(arm.leftWrist);
      lHand.current.rotation.x = 0.5 + leftTap * 0.035;
      lHand.current.rotation.z = -0.06 + Math.sin(t * 1.7) * 0.018;
    }

    // Reach, lift, sip, lower, and return are separate beats. The short hold at
    // the mouth removes the old pendulum-like motion and gives the action weight.
    const reach = windowProgress(cycle, 7, 8.2);
    const lift = windowProgress(cycle, 8.2, 9.45);
    const lower = windowProgress(cycle, 11.35, 12.55);
    const release = windowProgress(cycle, 12.55, 13.35);
    const grip = windowProgress(cycle, 8.05, 8.2);
    const holdingCan = grip * (1 - release);
    let drink = lift * (1 - lower);
    if (cycle >= 9.45 && cycle <= 11.35) drink = 1;
    const sip = cycle >= 9.45 && cycle <= 11.35 ? Math.sin((cycle - 9.45) * Math.PI * 1.8) : 0;

    arm.rightWrist.y = 1.68 - rightTap * 0.005;
    arm.wristNow.lerpVectors(arm.rightWrist, arm.reachWrist, reach);
    arm.wristNow.lerp(arm.sipWrist, drink);
    if (release > 0) {
      arm.wristNow.lerp(arm.rightWrist, release);
    }
    arm.wristNow.y += drink * sip * 0.003;
    solveElbow(arm.rightShoulder, arm.wristNow, arm.rightPole, arm.upperLength, arm.lowerLength, arm.rightElbow);
    arm.rightSleeveEnd.lerpVectors(arm.rightShoulder, arm.rightElbow, 0.28);
    setLimbPose(rSleeve.current, arm.rightShoulder, arm.rightSleeveEnd);
    setLimbPose(rUpperArm.current, arm.rightSleeveEnd, arm.rightElbow);
    setLimbPose(rLowerArm.current, arm.rightElbow, arm.wristNow);
    if (rHand.current) {
      rHand.current.position.copy(arm.wristNow);
      rHand.current.rotation.set(
        THREE.MathUtils.lerp(0.5, 0.1, drink),
        THREE.MathUtils.lerp(0, -0.28, drink),
        THREE.MathUtils.lerp(0.06, -0.42, drink)
      );
    }
    if (head.current) {
      head.current.rotation.y = Math.sin(t * 0.45) * 0.06;
      head.current.rotation.x = THREE.MathUtils.lerp(0.06, -0.12 + sip * 0.012, drink);
      head.current.rotation.z = THREE.MathUtils.lerp(0, -0.055, drink);
    }
    // The can stays on the desk during typing and locks to the palm only after
    // the reach completes. A small arc prevents it clipping the desk edge.
    if (can.current && rHand.current) {
      rHand.current.getWorldPosition(tmp);
      can.current.position.set(
        THREE.MathUtils.lerp(canRest.x, tmp.x + 0.035, holdingCan),
        THREE.MathUtils.lerp(canRest.y, tmp.y + 0.025, holdingCan),
        THREE.MathUtils.lerp(canRest.z, tmp.z - 0.015, holdingCan)
      );
      can.current.rotation.x = THREE.MathUtils.lerp(0, -0.12, drink);
      can.current.rotation.z = THREE.MathUtils.lerp(0, 1.02 + sip * 0.025, drink);
    }
  });

  return (
    <>
      <group ref={root} position={[0, 0, 0.18]}>
        {/* hips */}
        <RoundedBox args={[0.56, 0.28, 0.44]} radius={0.12} smoothness={3} position={[0, 1.06, 0]} castShadow>
          <meshStandardMaterial color={PANTS} roughness={0.85} />
        </RoundedBox>
        {/* thighs along the seat */}
        {[-0.15, 0.15].map((x, i) => (
          <Limb key={i} from={[x, 1.05, 0.06]} to={[x, 1.0, -0.4]} radius={0.105} color={PANTS} rough={0.85} />
        ))}
        {/* shins to the floor */}
        {[-0.15, 0.15].map((x, i) => (
          <Limb key={i} from={[x, 1.0, -0.4]} to={[x, 0.16, -0.46]} radius={0.082} color="#1a212d" rough={0.85} />
        ))}
        {/* shoes */}
        {[-0.15, 0.15].map((x, i) => (
          <mesh key={i} position={[x, 0.1, -0.58]} castShadow>
            <boxGeometry args={[0.14, 0.1, 0.3]} />
            <meshStandardMaterial color="#0c1016" roughness={0.7} />
          </mesh>
        ))}

        {/* torso — tapered t-shirt with a slight forward lean */}
        <group ref={torso} position={[0, 1.4, 0.03]} rotation={[-0.11, 0, 0]}>
          <RoundedBox args={[0.48, 0.5, 0.34]} radius={0.13} smoothness={4} position={[0, 0.08, 0]} castShadow>
            <meshStandardMaterial color={TEE} roughness={0.85} />
          </RoundedBox>
          <RoundedBox args={[0.38, 0.12, 0.3]} radius={0.055} smoothness={3} position={[0, -0.2, 0.01]} castShadow>
            <meshStandardMaterial color="#286f7c" roughness={0.88} />
          </RoundedBox>
          {/* crew collar */}
          <mesh position={[0, 0.34, 0.01]} rotation={[1.3, 0, 0]}>
            <torusGeometry args={[0.085, 0.018, 8, 22]} />
            <meshStandardMaterial color="#256875" roughness={0.85} />
          </mesh>
        </group>

        {/* neck */}
        <mesh position={[0, 1.74, 0.08]} rotation={[0.1, 0, 0]} castShadow>
          <cylinderGeometry args={[0.072, 0.085, 0.15, 14]} />
          <meshStandardMaterial color={SKIN} roughness={0.75} />
        </mesh>

        {/* head — simple face (no features), curly hair, headphones */}
        <group ref={head} position={[0, 1.94, 0.12]}>
          <mesh castShadow>
            <sphereGeometry args={[0.21, 28, 28]} />
            <meshStandardMaterial color={SKIN} roughness={0.7} />
          </mesh>
          {/* small ears */}
          {[-1, 1].map((s, i) => (
            <mesh key={i} position={[0.205 * s, -0.02, 0.02]} castShadow>
              <sphereGeometry args={[0.04, 10, 10]} />
              <meshStandardMaterial color={SKIN} roughness={0.7} />
            </mesh>
          ))}
          <HairCap />
          {/* headphones */}
          <mesh position={[0, 0.06, 0]}>
            <torusGeometry args={[0.245, 0.028, 10, 28, Math.PI]} />
            <meshStandardMaterial color="#0e1422" metalness={0.4} roughness={0.5} />
          </mesh>
          {[-1, 1].map((s, i) => (
            <group key={i} position={[0.245 * s, -0.02, 0]}>
              <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.08, 0.08, 0.06, 20]} />
                <meshStandardMaterial color="#0e1422" metalness={0.3} roughness={0.5} />
              </mesh>
              <mesh position={[0.034 * s, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.052, 0.052, 0.012, 20]} />
                <meshStandardMaterial color={CHAIR_TRIM} emissive={CHAIR_TRIM} emissiveIntensity={0.6} toneMapped={false} />
              </mesh>
            </group>
          ))}
        </group>

        {/* LEFT arm — both hands rest on the keyboard */}
        <AnimatedLimb limbRef={lSleeve} radius={0.082} color={TEE} />
        <AnimatedLimb limbRef={lUpperArm} radius={0.07} />
        <AnimatedLimb limbRef={lLowerArm} radius={0.057} />
        <Hand handRef={lHand} side={-1} />

        {/* RIGHT arm — types too, but lifts to sip the energy drink */}
        <AnimatedLimb limbRef={rSleeve} radius={0.082} color={TEE} />
        <AnimatedLimb limbRef={rUpperArm} radius={0.07} />
        <AnimatedLimb limbRef={rLowerArm} radius={0.057} />
        <Hand handRef={rHand} side={1} />
      </group>

      {/* energy drink can — world space, sits on the desk, follows the hand while sipping */}
      <group ref={can} position={[0.69, 1.65, -0.3]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.046, 0.046, 0.18, 20]} />
          <meshStandardMaterial color={ENERGY} metalness={0.6} roughness={0.3} />
        </mesh>
        {/* dark label band */}
        <mesh>
          <cylinderGeometry args={[0.0475, 0.0475, 0.08, 20]} />
          <meshStandardMaterial color="#172a0c" metalness={0.3} roughness={0.5} />
        </mesh>
        {/* lightning bolt accent on the label */}
        <mesh position={[0, 0, 0.0485]}>
          <planeGeometry args={[0.05, 0.07]} />
          <meshBasicMaterial color={ENERGY} toneMapped={false} />
        </mesh>
        {/* silver top rim + tab */}
        <mesh position={[0, 0.092, 0]}>
          <cylinderGeometry args={[0.044, 0.046, 0.02, 20]} />
          <meshStandardMaterial color="#9aa3ad" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.104, 0.012]}>
          <boxGeometry args={[0.02, 0.004, 0.03]} />
          <meshStandardMaterial color="#9aa3ad" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* silver bottom rim */}
        <mesh position={[0, -0.092, 0]}>
          <cylinderGeometry args={[0.046, 0.044, 0.014, 20]} />
          <meshStandardMaterial color="#9aa3ad" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>
    </>
  );
}

/* ============================ gaming chair ============================ */
function GamingChair() {
  return (
    <group position={[0, 0, 0.42]}>
      {/* seat pan + side bolsters */}
      <RoundedBox args={[0.86, 0.16, 0.86]} radius={0.08} smoothness={3} position={[0, 0.96, 0]} castShadow>
        <meshStandardMaterial color={CHAIR} roughness={0.5} metalness={0.1} />
      </RoundedBox>
      {[-0.42, 0.42].map((x, i) => (
        <RoundedBox key={i} args={[0.12, 0.16, 0.8]} radius={0.07} smoothness={3} position={[x, 1.02, 0]} castShadow>
          <meshStandardMaterial color="#0e1117" roughness={0.5} />
        </RoundedBox>
      ))}
      {/* seat trim */}
      <mesh position={[0, 1.045, -0.42]}>
        <boxGeometry args={[0.6, 0.02, 0.02]} />
        <meshBasicMaterial color={CHAIR_TRIM} toneMapped={false} />
      </mesh>

      {/* tall racing backrest, slight recline */}
      <group position={[0, 1.7, 0.42]} rotation={[0.12, 0, 0]}>
        <RoundedBox args={[0.78, 1.3, 0.16]} radius={0.1} smoothness={4} castShadow>
          <meshStandardMaterial color={CHAIR} roughness={0.5} metalness={0.1} />
        </RoundedBox>
        {/* side bolster wings */}
        {[-0.34, 0.34].map((x, i) => (
          <RoundedBox key={i} args={[0.16, 1.2, 0.22]} radius={0.08} smoothness={3} position={[x, 0.02, 0.06]} rotation={[0, x > 0 ? -0.18 : 0.18, 0]} castShadow>
            <meshStandardMaterial color="#0e1117" roughness={0.5} />
          </RoundedBox>
        ))}
        {/* accent racing stripes */}
        {[-0.12, 0.12].map((x, i) => (
          <mesh key={i} position={[x, 0.1, 0.085]}>
            <boxGeometry args={[0.04, 1.0, 0.01]} />
            <meshBasicMaterial color={i === 0 ? CHAIR_TRIM : "#8b5cf6"} toneMapped={false} />
          </mesh>
        ))}
        {/* lumbar + headrest pillows */}
        <RoundedBox args={[0.5, 0.2, 0.1]} radius={0.05} smoothness={3} position={[0, -0.18, 0.12]} castShadow>
          <meshStandardMaterial color="#1b1f27" roughness={0.6} />
        </RoundedBox>
        <RoundedBox args={[0.46, 0.24, 0.12]} radius={0.06} smoothness={3} position={[0, 0.62, 0.12]} castShadow>
          <meshStandardMaterial color="#1b1f27" roughness={0.6} />
        </RoundedBox>
        <mesh position={[0, 0.62, 0.19]}>
          <torusGeometry args={[0.12, 0.012, 8, 24]} />
          <meshBasicMaterial color={CHAIR_TRIM} toneMapped={false} />
        </mesh>
      </group>

      {/* armrests */}
      {[-0.5, 0.5].map((x, i) => (
        <group key={i}>
          <RoundedBox args={[0.12, 0.06, 0.4]} radius={0.03} position={[x, 1.28, 0.0]} castShadow>
            <meshStandardMaterial color="#0e1117" roughness={0.5} />
          </RoundedBox>
          <mesh position={[x, 1.16, 0.0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.18, 10]} />
            <meshStandardMaterial color="#0b0e14" metalness={0.6} roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* gas cylinder + 5-star base + wheels */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.82, 14]} />
        <meshStandardMaterial color="#0b0e14" metalness={0.7} roughness={0.35} />
      </mesh>
      <group position={[0, 0.14, 0]}>
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2;
          return (
            <group key={i} rotation={[0, a, 0]}>
              <mesh position={[0, 0, 0.26]} castShadow>
                <boxGeometry args={[0.07, 0.05, 0.5]} />
                <meshStandardMaterial color="#0b0e14" metalness={0.5} roughness={0.45} />
              </mesh>
              <mesh position={[0, -0.07, 0.5]} castShadow>
                <sphereGeometry args={[0.07, 14, 14]} />
                <meshStandardMaterial color="#05070b" roughness={0.4} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

/* ============================ gaming room (open, no back wall) ============================ */
function FloatingLedBar({ position, color }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[2.4, 0.05, 0.05]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}
function Room() {
  return (
    <group>
      {/* open floor platform — no enclosing walls */}
      <RoundedBox args={[8.4, 0.5, 6.6]} radius={0.18} smoothness={4} position={[0, -0.25, -0.4]} receiveShadow castShadow>
        <meshStandardMaterial color="#171e2b" roughness={0.9} metalness={0.05} />
      </RoundedBox>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, -0.4]} receiveShadow>
        <planeGeometry args={[7.8, 6.0]} />
        <meshStandardMaterial color="#202a3b" roughness={0.95} />
      </mesh>
      {/* rug under the chair */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.5]} receiveShadow>
        <planeGeometry args={[3.6, 2.8]} />
        <meshStandardMaterial color="#2a3650" roughness={1} />
      </mesh>
      {/* floor RGB edge strips for the gaming-room glow */}
      <mesh position={[0, 0.03, 2.0]}>
        <boxGeometry args={[6.0, 0.03, 0.03]} />
        <meshBasicMaterial color="#22d3ee" toneMapped={false} />
      </mesh>
      <mesh position={[-3.6, 0.03, -0.4]}>
        <boxGeometry args={[0.03, 0.03, 5.0]} />
        <meshBasicMaterial color="#8b5cf6" toneMapped={false} />
      </mesh>
      <mesh position={[3.6, 0.03, -0.4]}>
        <boxGeometry args={[0.03, 0.03, 5.0]} />
        <meshBasicMaterial color="#8b5cf6" toneMapped={false} />
      </mesh>
      {/* floating RGB accent bars behind the monitors (no wall) */}
      <FloatingLedBar position={[-1.4, 2.7, -1.85]} color="#22d3ee" />
      <FloatingLedBar position={[1.4, 2.7, -1.85]} color="#8b5cf6" />
    </group>
  );
}

/* ============================ lights ============================ */
function Lights() {
  return (
    <>
      <ambientLight intensity={0.8} color="#aabfff" />
      <hemisphereLight args={["#8da4ff", "#141a26", 0.65]} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.6}
        color="#eef2ff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={28}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-4, 4, 6]} intensity={0.5} color="#9cc4ff" />
      <pointLight position={[-3, 2.2, 0.2]} intensity={0.6} distance={8} color="#fcd34d" />
      <pointLight position={[2.4, 1.5, -0.4]} intensity={0.6} distance={4.5} color="#8b5cf6" />
      <pointLight position={[0, 2.4, -1.6]} intensity={0.5} distance={5} color="#22d3ee" />
    </>
  );
}

/* ============================ idle camera sway ============================ */
const BASE_AZIMUTH = Math.atan2(6.2, 4.6); // ~0.93 rad → the 45° hero angle
const BASE_POLAR = 1.12;
function IdleCamera() {
  const controls = useThree((s) => s.controls);
  const idle = useRef(true);
  const lastInteract = useRef(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!controls) return;
    const onStart = () => { idle.current = false; };
    const onEnd = () => { lastInteract.current = performance.now(); };
    controls.addEventListener("start", onStart);
    controls.addEventListener("end", onEnd);
    return () => {
      controls.removeEventListener("start", onStart);
      controls.removeEventListener("end", onEnd);
    };
  }, [controls]);
  useFrame((state) => {
    if (!controls || reduce) return;
    if (!idle.current && performance.now() - lastInteract.current > 3500) idle.current = true;
    if (!idle.current) return;
    const t = state.clock.elapsedTime;
    const targetAz = BASE_AZIMUTH + Math.sin(t * 0.16) * 0.3; // gentle ±17° L/R
    const az = controls.getAzimuthalAngle();
    const po = controls.getPolarAngle();
    controls.setAzimuthalAngle(az + (targetAz - az) * 0.02);
    controls.setPolarAngle(po + (BASE_POLAR - po) * 0.02);
    controls.update();
  });
  return null;
}

/* ============================ scene ============================ */
function Scene() {
  const codeTex = useMemo(() => makeTexture(drawCode), []);
  const dashTex = useMemo(() => makeTexture(drawDash), []);
  const wallTex = useMemo(() => makeTexture(drawWall), []);
  return (
    <>
      <Lights />
      <Room />
      <Desk />
      <Monitor position={[0, 2.12, -1.52]} texture={codeTex} glow="#38bdf8" />
      <Monitor position={[-1.9, 2.06, -1.32]} rotation={[0, 0.4, 0]} texture={wallTex} glow="#7dd3fc" />
      <Monitor position={[1.9, 2.06, -1.32]} rotation={[0, -0.4, 0]} texture={dashTex} glow="#8b5cf6" />
      <Keyboard />
      <Mouse />
      <Mug />
      <Plant />
      <Tower />
      <GamingChair />
      <Person />
      <ContactShadows position={[0, 0.02, 0]} opacity={0.5} scale={9} blur={2.4} far={4} resolution={512} color="#000000" />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.7}
        minPolarAngle={0.35}
        maxPolarAngle={1.5}
        target={[0, 1.25, -0.4]}
      />
      <IdleCamera />
    </>
  );
}

export default function Cockpit3D() {
  return (
    <div className="cockpit3d">
      <Canvas
        shadows
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [6.2, 3.7, 4.6], fov: 30, near: 0.1, far: 100 }}
      >
        <color attach="background" args={["#080d18"]} />
        <fog attach="fog" args={["#0a1322", 18, 32]} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <span className="cockpit3d-hint">drag to rotate · 360°</span>
    </div>
  );
}
