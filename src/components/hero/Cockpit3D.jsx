import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, RoundedBox } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

/* ---------- screen textures (drawn on 2D canvas, used as emissive maps) ---------- */
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
  // title bar
  ctx.fillStyle = "#111c2f";
  ctx.fillRect(0, 0, w, 30);
  const dots = ["#f87171", "#fbbf24", "#34d399"];
  dots.forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(20 + i * 18, 15, 5, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = "rgba(148,197,253,0.7)";
  ctx.font = "600 13px monospace";
  ctx.fillText("ateight.dev — main.tsx", 80, 20);
  // gutter
  ctx.fillStyle = "rgba(56,189,248,0.06)";
  ctx.fillRect(0, 30, 34, h - 30);
  // colourful code lines
  const palette = ["#7dd3fc", "#c4b5fd", "#5eead4", "#fcd34d", "#94a3b8", "#f9a8d4"];
  let y = 50;
  const rows = [
    [0, 120], [1, 90], [1, 170], [2, 80], [2, 140], [0, 60],
    [1, 150], [2, 70], [2, 130], [1, 110], [0, 95], [1, 160],
  ];
  rows.forEach(([indent, wd], i) => {
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
  // integrated terminal
  ctx.fillStyle = "#05090f";
  ctx.fillRect(0, h - 78, w, 78);
  ctx.fillStyle = "rgba(148,197,253,0.55)";
  ctx.font = "600 11px monospace";
  ctx.fillText("● ● ●  terminal — ops", 14, h - 60);
  const log = ["deploy ateight.xyz → stable", "wg0 handshake 24ms", "haproxy web:443 healthy"];
  ctx.fillStyle = "rgba(94,234,212,0.8)";
  ctx.font = "11px monospace";
  log.forEach((l, i) => ctx.fillText("› " + l, 14, h - 40 + i * 14));
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
  // sparkline
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
  // bars
  const bars = [120, 200, 150, 240, 170, 210, 130];
  const colors = ["#38bdf8", "#2dd4bf", "#8b5cf6"];
  bars.forEach((bh, i) => {
    ctx.fillStyle = colors[i % colors.length];
    const x = 28 + i * 64;
    roundRect(ctx, x, h - 28 - bh, 40, bh, 6);
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
  // moon
  ctx.fillStyle = "rgba(255,243,216,0.95)";
  ctx.beginPath();
  ctx.arc(w - 110, 80, 34, 0, Math.PI * 2);
  ctx.fill();
  // far mountains
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
  // near mountains
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
  // dock
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

/* ---------- materials ---------- */
const SKIN = "#e0a980";
const TEE = "#2f7d8c";
const PANTS = "#222a38";
const HAIR = "#1a120c";
const CHAIR = "#15181f";
const DESK = "#3a2a1d";

/* ---------- monitor ---------- */
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
      <RoundedBox args={[1.12, 0.7, 0.05]} radius={0.022} smoothness={3} castShadow>
        <meshStandardMaterial color="#05080e" metalness={0.5} roughness={0.45} />
      </RoundedBox>
      <mesh position={[0, 0, 0.028]}>
        <planeGeometry args={[1.02, 0.6]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0, 0.5]} intensity={0.5} distance={2.4} color={glow} />
    </group>
  );
}

/* ---------- desk ---------- */
function Desk() {
  const legGeo = [0.1, 1.42, 0.1];
  const legs = [
    [-2.1, -1.62], [2.1, -1.62], [-2.1, -0.22], [2.1, -0.22],
  ];
  return (
    <group>
      <RoundedBox args={[4.7, 0.12, 1.62]} radius={0.04} smoothness={3} position={[0, 1.5, -0.92]} castShadow receiveShadow>
        <meshStandardMaterial color={DESK} roughness={0.65} metalness={0.05} />
      </RoundedBox>
      {legs.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.73, z]} castShadow>
          <boxGeometry args={legGeo} />
          <meshStandardMaterial color="#1d150e" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- props ---------- */
function Keyboard() {
  return (
    <group position={[0, 1.575, -0.45]}>
      <RoundedBox args={[1.1, 0.05, 0.42]} radius={0.02} smoothness={2} castShadow>
        <meshStandardMaterial color="#0d1320" metalness={0.3} roughness={0.6} />
      </RoundedBox>
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 14 }).map((_, c) => (
          <mesh key={`${r}-${c}`} position={[-0.49 + c * 0.075, 0.03, -0.15 + r * 0.075]}>
            <boxGeometry args={[0.055, 0.012, 0.055]} />
            <meshStandardMaterial color="#16203250" emissive="#38bdf8" emissiveIntensity={0.18} />
          </mesh>
        ))
      )}
    </group>
  );
}

function Mug() {
  return (
    <group position={[-1.7, 1.62, -0.5]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.1, 0.09, 0.18, 20]} />
        <meshStandardMaterial color="#0f2233" metalness={0.2} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.085, 0.085, 0.02, 20]} />
        <meshStandardMaterial color="#3a2418" />
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
    if (rgb.current && !reduce) {
      const t = state.clock.elapsedTime;
      rgb.current.material.emissiveIntensity = 1.4 + Math.sin(t * 2) * 0.6;
    }
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

/* ---------- person ---------- */
function Arm({ side = 1 }) {
  // side: 1 = right (+x), -1 = left (-x)
  return (
    <group position={[0.34 * side, 1.6, 0.34]}>
      {/* short sleeve */}
      <mesh position={[0.04 * side, -0.06, 0]} rotation={[0.2, 0, -0.5 * side]} castShadow>
        <capsuleGeometry args={[0.1, 0.12, 4, 12]} />
        <meshStandardMaterial color={TEE} roughness={0.8} />
      </mesh>
      {/* upper arm (skin) */}
      <mesh position={[0.08 * side, -0.2, -0.04]} rotation={[0.55, 0, -0.32 * side]} castShadow>
        <capsuleGeometry args={[0.07, 0.22, 4, 12]} />
        <meshStandardMaterial color={SKIN} roughness={0.75} />
      </mesh>
      {/* forearm reaching forward to desk */}
      <mesh position={[0.03 * side, -0.32, -0.34]} rotation={[1.15, 0, -0.1 * side]} castShadow>
        <capsuleGeometry args={[0.062, 0.3, 4, 12]} />
        <meshStandardMaterial color={SKIN} roughness={0.75} />
      </mesh>
      {/* hand on desk */}
      <mesh position={[0.02 * side, -0.45, -0.56]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.11, 0.05, 0.15]} />
        <meshStandardMaterial color={SKIN} roughness={0.75} />
      </mesh>
    </group>
  );
}

function Person() {
  const root = useRef();
  const head = useRef();
  const reduce = useReducedMotion();
  useFrame((state) => {
    if (reduce || !root.current) return;
    const t = state.clock.elapsedTime;
    root.current.position.y = Math.sin(t * 1.4) * 0.012;
    if (head.current) head.current.rotation.y = Math.sin(t * 0.5) * 0.08;
  });
  return (
    <group ref={root} position={[0, 0, 0.5]}>
      {/* hips */}
      <RoundedBox args={[0.62, 0.3, 0.46]} radius={0.1} smoothness={3} position={[0, 1.04, 0]} castShadow>
        <meshStandardMaterial color={PANTS} roughness={0.85} />
      </RoundedBox>
      {/* thighs */}
      {[-0.16, 0.16].map((x, i) => (
        <mesh key={i} position={[x, 1.0, -0.22]} rotation={[1.45, 0, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.34, 4, 12]} />
          <meshStandardMaterial color={PANTS} roughness={0.85} />
        </mesh>
      ))}
      {/* shins down to floor */}
      {[-0.16, 0.16].map((x, i) => (
        <mesh key={i} position={[x, 0.5, -0.42]} castShadow>
          <capsuleGeometry args={[0.08, 0.6, 4, 12]} />
          <meshStandardMaterial color="#1a212d" roughness={0.85} />
        </mesh>
      ))}
      {/* shoes */}
      {[-0.16, 0.16].map((x, i) => (
        <mesh key={i} position={[x, 0.1, -0.55]} castShadow>
          <boxGeometry args={[0.14, 0.1, 0.28]} />
          <meshStandardMaterial color="#0c1016" roughness={0.7} />
        </mesh>
      ))}
      {/* torso — t-shirt, slight forward lean */}
      <group position={[0, 1.42, 0.04]} rotation={[-0.16, 0, 0]}>
        <RoundedBox args={[0.74, 0.66, 0.4]} radius={0.16} smoothness={4} castShadow>
          <meshStandardMaterial color={TEE} roughness={0.8} />
        </RoundedBox>
        {/* collar */}
        <mesh position={[0, 0.34, 0.05]}>
          <torusGeometry args={[0.1, 0.022, 8, 20]} />
          <meshStandardMaterial color="#256875" roughness={0.8} />
        </mesh>
      </group>
      {/* neck */}
      <mesh position={[0, 1.78, 0.12]} castShadow>
        <cylinderGeometry args={[0.08, 0.09, 0.14, 14]} />
        <meshStandardMaterial color={SKIN} roughness={0.75} />
      </mesh>
      {/* head */}
      <group ref={head} position={[0, 1.96, 0.16]}>
        <mesh castShadow>
          <sphereGeometry args={[0.22, 28, 28]} />
          <meshStandardMaterial color={SKIN} roughness={0.7} />
        </mesh>
        {/* curly hair cluster (top + back + sides) */}
        {[
          [0, 0.16, -0.02, 0.13], [0.1, 0.13, -0.06, 0.11], [-0.1, 0.13, -0.06, 0.11],
          [0.16, 0.06, -0.08, 0.1], [-0.16, 0.06, -0.08, 0.1], [0, 0.08, -0.16, 0.12],
          [0.1, 0.02, -0.16, 0.1], [-0.1, 0.02, -0.16, 0.1], [0.18, -0.02, -0.06, 0.09],
          [-0.18, -0.02, -0.06, 0.09], [0.08, -0.05, -0.18, 0.09], [-0.08, -0.05, -0.18, 0.09],
          [0, -0.02, -0.2, 0.1], [0.14, 0.1, -0.12, 0.09], [-0.14, 0.1, -0.12, 0.09],
        ].map(([x, y, z, r], i) => (
          <mesh key={i} position={[x, y, z]} castShadow>
            <sphereGeometry args={[r, 12, 12]} />
            <meshStandardMaterial color={HAIR} roughness={0.95} />
          </mesh>
        ))}
        {/* headphones: band + ear cups */}
        <mesh position={[0, 0.04, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.235, 0.025, 10, 28, Math.PI]} />
          <meshStandardMaterial color="#0e1422" metalness={0.4} roughness={0.5} />
        </mesh>
        {[-1, 1].map((s, i) => (
          <group key={i} position={[0.235 * s, -0.02, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.075, 0.075, 0.06, 20]} />
              <meshStandardMaterial color="#0e1422" metalness={0.3} roughness={0.5} />
            </mesh>
            <mesh position={[0.032 * s, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.05, 0.05, 0.01, 20]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.5} toneMapped={false} />
            </mesh>
          </group>
        ))}
      </group>
      {/* arms reaching forward to keyboard / mouse */}
      <Arm side={1} />
      <Arm side={-1} />
    </group>
  );
}

function Mouse() {
  return (
    <mesh position={[0.78, 1.58, -0.42]} castShadow>
      <capsuleGeometry args={[0.05, 0.07, 4, 12]} />
      <meshStandardMaterial color="#0d1320" metalness={0.3} roughness={0.5} />
    </mesh>
  );
}

/* ---------- office chair ---------- */
function Chair() {
  return (
    <group position={[0, 0, 0.72]}>
      <RoundedBox args={[0.92, 0.16, 0.86]} radius={0.07} smoothness={3} position={[0, 0.96, 0]} castShadow>
        <meshStandardMaterial color={CHAIR} roughness={0.55} metalness={0.1} />
      </RoundedBox>
      <RoundedBox args={[0.9, 1.05, 0.16]} radius={0.1} smoothness={3} position={[0, 1.62, 0.4]} rotation={[0.08, 0, 0]} castShadow>
        <meshStandardMaterial color={CHAIR} roughness={0.55} metalness={0.1} />
      </RoundedBox>
      <RoundedBox args={[0.46, 0.26, 0.12]} radius={0.06} smoothness={3} position={[0, 2.22, 0.36]} rotation={[0.08, 0, 0]} castShadow>
        <meshStandardMaterial color={CHAIR} roughness={0.55} />
      </RoundedBox>
      {[-0.52, 0.52].map((x, i) => (
        <RoundedBox key={i} args={[0.1, 0.06, 0.46]} radius={0.03} position={[x, 1.26, -0.02]} castShadow>
          <meshStandardMaterial color="#0e1117" roughness={0.5} />
        </RoundedBox>
      ))}
      {/* gas cylinder */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.82, 14]} />
        <meshStandardMaterial color="#0b0e14" metalness={0.7} roughness={0.35} />
      </mesh>
      {/* 5-star base + wheels */}
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

/* ---------- room (low-wall diorama, clean from every angle) ---------- */
function Room() {
  return (
    <group>
      {/* raised floor platform with a lip */}
      <RoundedBox args={[7.4, 0.5, 6.0]} radius={0.16} smoothness={4} position={[0, -0.25, -0.2]} receiveShadow castShadow>
        <meshStandardMaterial color="#19212f" roughness={0.9} metalness={0.05} />
      </RoundedBox>
      {/* floor inlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, -0.2]} receiveShadow>
        <planeGeometry args={[6.9, 5.5]} />
        <meshStandardMaterial color="#222c3d" roughness={0.95} />
      </mesh>
      {/* rug under chair */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.5]} receiveShadow>
        <planeGeometry args={[3.4, 2.6]} />
        <meshStandardMaterial color="#2a3650" roughness={1} />
      </mesh>
      {/* short back wall behind the monitors (low enough to see over from any side) */}
      <RoundedBox args={[6.6, 1.5, 0.16]} radius={0.06} smoothness={3} position={[0, 0.75, -1.95]} receiveShadow>
        <meshStandardMaterial color="#16203a" roughness={0.92} />
      </RoundedBox>
      {/* glowing trim on the back wall */}
      <mesh position={[0, 1.45, -1.88]}>
        <boxGeometry args={[5.2, 0.04, 0.04]} />
        <meshBasicMaterial color="#38bdf8" toneMapped={false} />
      </mesh>
      {/* short left side ledge */}
      <RoundedBox args={[0.16, 1.1, 4.2]} radius={0.06} smoothness={3} position={[-3.55, 0.55, -0.3]} receiveShadow>
        <meshStandardMaterial color="#121a2e" roughness={0.92} />
      </RoundedBox>
      {/* warm light bar (cozy glow) on left ledge */}
      <mesh position={[-3.46, 1.0, -0.3]}>
        <boxGeometry args={[0.04, 0.04, 3.0]} />
        <meshBasicMaterial color="#fcd34d" toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ---------- lights ---------- */
function Lights() {
  return (
    <>
      <ambientLight intensity={0.85} color="#aabfff" />
      <hemisphereLight args={["#8da4ff", "#141a26", 0.7]} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.7}
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
      {/* cool fill from the front-right so the back view is not black */}
      <directionalLight position={[-4, 4, 6]} intensity={0.5} color="#9cc4ff" />
      <pointLight position={[-3, 2.2, 0.2]} intensity={0.7} distance={8} color="#fcd34d" />
      <pointLight position={[2.4, 1.5, -0.4]} intensity={0.6} distance={4.5} color="#8b5cf6" />
    </>
  );
}

function Scene() {
  const codeTex = useMemo(() => makeTexture(drawCode), []);
  const dashTex = useMemo(() => makeTexture(drawDash), []);
  const wallTex = useMemo(() => makeTexture(drawWall), []);
  const reduce = useReducedMotion();
  return (
    <>
      <Lights />
      <Room />
      <Desk />
      {/* three monitors against the back, screens facing the viewer/person */}
      <Monitor position={[0, 2.0, -1.45]} texture={codeTex} glow="#38bdf8" />
      <Monitor position={[-1.55, 1.96, -1.3]} rotation={[0, 0.42, 0]} texture={wallTex} glow="#7dd3fc" />
      <Monitor position={[1.55, 1.96, -1.3]} rotation={[0, -0.42, 0]} texture={dashTex} glow="#8b5cf6" />
      <Keyboard />
      <Mouse />
      <Mug />
      <Plant />
      <Tower />
      <Chair />
      <Person />
      <ContactShadows position={[0, 0.02, 0]} opacity={0.5} scale={9} blur={2.4} far={4} resolution={512} color="#000000" />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.06}
        minPolarAngle={0.35}
        maxPolarAngle={1.5}
        autoRotate={!reduce}
        autoRotateSpeed={0.45}
        target={[0, 1.25, -0.4]}
      />
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
