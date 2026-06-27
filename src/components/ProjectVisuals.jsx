import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PI2 = Math.PI * 2;

function createCanvas(w, h) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return { canvas, ctx, texture };
}

/* ==============================
   KEYFIX — keyboard + display
   ============================== */
function KeyFixScene() {
  const groupRef = useRef();
  const keysRef = useRef([]);
  const ct = useMemo(() => createCanvas(320, 100), []);
  const meshRef = useRef();
  const timeRef = useRef(0);

  const keys = useMemo(() => {
    const rows = [
      ["Q","W","E","R","T","Y","U","I","O","P"],
      ["A","S","D","F","G","H","J","K","L"],
      ["Z","X","C","V","B","N","M"]
    ];
    const r = [];
    rows.forEach((row, ri) => {
      row.forEach((ch, ci) => {
        r.push({ char: ch, x: (ci - row.length/2) * 0.25, z: (ri - 1) * 0.26 });
      });
    });
    return r;
  }, []);

  function isKeyPressed(t, char) {
    const seq = [
      ["A", 0.5], ["S", 0.8], ["D", 1.1], ["F", 1.4],
      ["H", 3.5], ["E", 3.8], ["L", 4.1], ["L", 4.4], ["O", 4.7]
    ];
    const loop = t % 6;
    for (const [c, time] of seq) {
      if (c === char && loop > time && loop < time + 0.25) return true;
    }
    return false;
  }

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const loop = t % 6;
    timeRef.current = loop;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.04;
    }

    keys.forEach((key, i) => {
      const mesh = keysRef.current[i];
      if (!mesh) return;
      const pressed = isKeyPressed(t, key.char.toUpperCase());
      mesh.position.y = pressed ? -0.025 : 0.015;
      mesh.scale.z = pressed ? 0.7 : 1;
      mesh.material.emissiveIntensity = pressed ? 0.5 : 0.03;
      mesh.material.color.set(pressed ? "#22d394" : "#1a1a2e");
    });

    const { ctx, canvas, texture } = ct;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const r = 8, w = canvas.width, h = canvas.height;
    ctx.fillStyle = "rgba(3,7,18,0.92)";
    ctx.beginPath();
    ctx.moveTo(r, 4); ctx.lineTo(w - r, 4); ctx.quadraticCurveTo(w, 4, w, r);
    ctx.lineTo(w, h - r); ctx.quadraticCurveTo(w, h, w - r, h);
    ctx.lineTo(r, h); ctx.quadraticCurveTo(4, h, 4, h - r);
    ctx.lineTo(4, r); ctx.quadraticCurveTo(4, 4, r, 4);
    ctx.closePath(); ctx.fill();

    ctx.strokeStyle = "rgba(34,211,148,0.3)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(r, 4); ctx.lineTo(w - r, 4); ctx.quadraticCurveTo(w, 4, w, r);
    ctx.lineTo(w, h - r); ctx.quadraticCurveTo(w, h, w - r, h);
    ctx.lineTo(r, h); ctx.quadraticCurveTo(4, h, 4, h - r);
    ctx.lineTo(4, r); ctx.quadraticCurveTo(4, 4, r, 4);
    ctx.closePath(); ctx.stroke();

    let label = "";
    let statusLine = "";
    let cursor = "";

    if (loop < 2.2) {
      const raw = "asdf".substring(0, Math.min(4, Math.floor(loop / 0.55)));
      label = raw;
      cursor = "|";
      statusLine = "detecting wrong layout...";
    } else if (loop < 2.8) {
      label = "asdf";
      cursor = "";
      statusLine = "KeyFix detected wrong keyboard layout";
    } else if (loop < 3.5) {
      label = "→ Hello";
      cursor = "";
      statusLine = "auto-correcting...";
    } else {
      label = "Hello";
      cursor = loop % 1 < 0.5 ? "|" : "";
      statusLine = "auto-fixed ✓";
    }

    ctx.font = "bold 28px monospace";
    ctx.fillStyle = "#22d394";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label + cursor, canvas.width / 2, canvas.height / 2 - 6);

    ctx.font = "11px monospace";
    ctx.fillStyle = "#64748b";
    ctx.fillText(statusLine, canvas.width / 2, canvas.height - 14);

    texture.needsUpdate = true;
    if (meshRef.current) {
      meshRef.current.material.needsUpdate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 3, 4]} intensity={0.6} />
      <pointLight position={[0, 2, 2]} intensity={1} color="#22d394" />
      <group ref={groupRef} position={[0, -0.05, 0]}>
        <mesh ref={meshRef} position={[0, 0.6, -0.45]}>
          <planeGeometry args={[2, 0.65]} />
          <meshBasicMaterial map={ct.texture} transparent />
        </mesh>
        {keys.map((key, i) => (
          <group key={i} position={[key.x, 0, key.z]}>
            <mesh ref={(el) => (keysRef.current[i] = el)} position={[0, 0.015, 0]}>
              <boxGeometry args={[0.18, 0.025, 0.18]} />
              <meshStandardMaterial color="#1a1a2e" emissive="#22d394" emissiveIntensity={0.03} metalness={0.3} roughness={0.4} transparent opacity={0.7} />
            </mesh>
            <mesh position={[0, 0.09, 0]}>
              <sphereGeometry args={[0.008, 4, 4]} />
              <meshBasicMaterial color="#8899aa" transparent opacity={0.25} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}

/* ==============================
   NETDOCTOR — globe + scan + fix
   ============================== */
function NetDoctorScene() {
  const groupRef = useRef();
  const globeRef = useRef();
  const xRef = useRef();
  const checkRef = useRef();
  const ringRef = useRef();
  const scanLineRef = useRef();
  const packetsRef = useRef([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const loop = t % 7;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.06) * 0.05;
    }

    if (globeRef.current) {
      globeRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
      globeRef.current.rotation.y = t * 0.08;
    }

    const phase = loop;
    const disconnected = phase < 1.5;
    const scanning = phase >= 1.5 && phase < 3.5;
    const fixing = phase >= 3.5 && phase < 5;
    const restored = phase >= 5;

    if (xRef.current) {
      const opacity = disconnected ? 0.7 : Math.max(0, 0.7 - (phase - 1.5) * 0.8);
      xRef.current.children.forEach(c => {
        c.material.opacity = opacity;
      });
      xRef.current.visible = opacity > 0.01;
    }

    if (ringRef.current) {
      if (scanning) {
        const s = ((phase - 1.5) % 1) * 2.5;
        ringRef.current.scale.setScalar(s);
        ringRef.current.material.opacity = Math.max(0, 0.4 * (1 - s / 2.5));
        ringRef.current.visible = true;
      } else {
        ringRef.current.visible = false;
      }
    }

    if (scanLineRef.current) {
      scanLineRef.current.visible = scanning;
      if (scanning) {
        scanLineRef.current.rotation.x = Math.sin(t * 1.5) * 0.3;
        scanLineRef.current.rotation.z = t * 0.3;
      }
    }

    if (checkRef.current) {
      const opacity = restored ? Math.min(1, (phase - 5) * 2) : 0;
      checkRef.current.children.forEach(c => {
        c.material.opacity = 0.7 * opacity;
      });
      checkRef.current.visible = opacity > 0.01;
    }

    packetsRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      if (scanning) {
        const angle = (t * 0.5 + i * 0.8) % PI2;
        const r = 0.3 + Math.sin(angle * 2) * 0.3 + 0.4;
        mesh.position.set(Math.cos(angle) * r, Math.sin(angle * 1.3) * r * 0.5, Math.sin(angle * 0.7) * r * 0.3);
        mesh.scale.setScalar(0.5 + Math.sin(t * 2 + i) * 0.3);
        mesh.material.opacity = 0.3 + Math.sin(t * 1.5 + i) * 0.2;
      } else if (restored) {
        mesh.position.set(0.3 + i * 0.08, 0.2 + Math.sin(t * 0.5 + i) * 0.05, 0);
        mesh.scale.setScalar(0.3);
        mesh.material.opacity = 0.15;
      } else {
        mesh.position.set(0, 0, 0);
        mesh.scale.setScalar(0);
        mesh.material.opacity = 0;
      }
    });
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 3, 4]} intensity={0.6} />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#22d394" />
      <group ref={groupRef}>
        <mesh ref={globeRef}>
          <sphereGeometry args={[0.7, 16, 16]} />
          <meshBasicMaterial color="#22d394" wireframe transparent opacity={0.15} />
        </mesh>

        <group ref={xRef}>
          <mesh position={[0, 0, 0.71]} rotation={[0, 0, Math.PI * 0.25]}>
            <boxGeometry args={[0.4, 0.02, 0.02]} />
            <meshBasicMaterial color="#ef4444" transparent opacity={0.7} />
          </mesh>
          <mesh position={[0, 0, 0.71]} rotation={[0, 0, -Math.PI * 0.25]}>
            <boxGeometry args={[0.4, 0.02, 0.02]} />
            <meshBasicMaterial color="#ef4444" transparent opacity={0.7} />
          </mesh>
        </group>

        <mesh ref={scanLineRef}>
          <ringGeometry args={[0, 1.2, 32]} />
          <meshBasicMaterial color="#22d394" wireframe transparent opacity={0.08} side={THREE.DoubleSide} />
        </mesh>

        <mesh ref={ringRef}>
          <ringGeometry args={[0, 0.5, 32]} />
          <meshBasicMaterial color="#22d394" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>

        <group ref={checkRef}>
          <mesh position={[0, 0, 0.72]}>
            <boxGeometry args={[0.05, 0.25, 0.02]} rotation={[0, 0, -0.5]} />
            <meshBasicMaterial color="#22d394" transparent opacity={0} />
          </mesh>
          <mesh position={[0, 0, 0.72]}>
            <boxGeometry args={[0.15, 0.05, 0.02]} rotation={[0, 0, 0.3]} />
            <meshBasicMaterial color="#22d394" transparent opacity={0} />
          </mesh>
        </group>

        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} ref={(el) => (packetsRef.current[i] = el)}>
            <sphereGeometry args={[0.02, 4, 4]} />
            <meshBasicMaterial color="#22d394" transparent opacity={0} />
          </mesh>
        ))}
      </group>
    </>
  );
}

/* ==============================
   HYBRID MAIL — infrastructure flow
   ============================== */
function MailScene() {
  const groupRef = useRef();
  const serversRef = useRef([]);
  const particlesRef = useRef([]);
  const particleSpeeds = useMemo(() => Float32Array.from(Array(20).fill(0).map(() => 0.2 + Math.random() * 0.3)), []);
  const particlePositions = useRef(Float32Array.from(Array(20 * 3).fill(0).map(() => (Math.random() - 0.5) * 3)));

  const servers = useMemo(() => [
    { label: "Web", x: -1.2, y: 0.3, color: "#22d394" },
    { label: "Mail", x: 1.2, y: 0.3, color: "#22d394" },
    { label: "DNS", x: 0, y: -0.3, color: "#22d394" },
  ], []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.04) * 0.04;
    }

    serversRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.material.emissiveIntensity = 0.08 + Math.sin(t * 0.5 + i * 1.2) * 0.06;
    });

    particlesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const angle = (t * 0.3 + i * 0.5) % PI2;
      const phase = Math.floor(angle / (PI2 / 3));
      const local = (angle % (PI2 / 3)) / (PI2 / 3);
      const from = servers[phase % 3];
      const to = servers[(phase + 1) % 3];
      if (from && to) {
        mesh.position.x = from.x + (to.x - from.x) * local;
        mesh.position.y = from.y + (to.y - from.y) * local + Math.sin(local * Math.PI) * 0.15;
        mesh.position.z = Math.sin(local * Math.PI) * 0.15;
        mesh.scale.setScalar(0.4 + Math.sin(local * Math.PI) * 0.6);
        mesh.material.opacity = 0.1 + Math.sin(local * Math.PI) * 0.4;
      }
    });
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 3, 4]} intensity={0.6} />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#22d394" />
      <group ref={groupRef}>
        {servers.map((sv, i) => (
          <group key={i} position={[sv.x, sv.y, 0]}>
            <mesh ref={(el) => (serversRef.current[i] = el)}>
              <boxGeometry args={[0.35, 0.08, 0.2]} />
              <meshStandardMaterial color="#0f172a" emissive="#22d394" emissiveIntensity={0.08} metalness={0.5} roughness={0.3} />
            </mesh>
            <mesh position={[0.17, 0, 0.11]}>
              <sphereGeometry args={[0.008, 4, 4]} />
              <meshBasicMaterial color="#22d394" transparent opacity={0.4} />
            </mesh>
          </group>
        ))}
        {servers.map((sv, i) =>
          servers.slice(i + 1).map((sv2, j) => {
            const midX = (sv.x + sv2.x) / 2;
            const midY = (sv.y + sv2.y) / 2;
            const dx = sv2.x - sv.x;
            const dy = sv2.y - sv.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            return (
              <group key={`line-${i}-${j}`} position={[midX, midY, 0]} rotation={[0, 0, angle]}>
                <mesh>
                  <planeGeometry args={[len, 0.004]} />
                  <meshBasicMaterial color="#22d394" transparent opacity={0.06} />
                </mesh>
              </group>
            );
          })
        )}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh key={i} ref={(el) => (particlesRef.current[i] = el)}>
            <sphereGeometry args={[0.025, 6, 6]} />
            <meshBasicMaterial color="#22d394" transparent opacity={0} />
          </mesh>
        ))}
      </group>
    </>
  );
}

/* ==============================
   BOT — chat message animation
   ============================== */
function BotScene() {
  const groupRef = useRef();
  const botRef = useRef();
  const bubblesRef = useRef([]);
  const dotsRef = useRef([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const loop = t % 6;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.05;
    }

    if (botRef.current) {
      botRef.current.rotation.y = Math.sin(t * 0.08) * 0.06;
      botRef.current.position.y = 0.05 + Math.sin(t * 0.15) * 0.02;
    }

    const phase = loop;
    const typingPhase = phase >= 1 && phase < 2.5;
    const responsePhase = phase >= 2.5;

    bubblesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      if (i === 0) {
        const visible = phase > 0.3;
        const scale = visible ? Math.min(1, (phase - 0.3) * 3) : 0;
        mesh.scale.setScalar(scale);
        mesh.position.x = -0.35;
        mesh.position.y = 0.35 - (1 - scale) * 0.1;
        mesh.material.opacity = 0.25 * scale;
      }
      if (i === 1) {
        const visible = responsePhase;
        const scale = visible ? Math.min(1, (phase - 2.5) * 3) : 0;
        mesh.scale.setScalar(scale);
        mesh.position.x = 0.35;
        mesh.position.y = 0.1 - (1 - scale) * 0.1;
        mesh.material.opacity = 0.25 * scale;
      }
    });

    dotsRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      if (typingPhase) {
        const dotPhase = phase - 1;
        const delay = i * 0.15;
        const visible = dotPhase > delay;
        mesh.scale.setScalar(visible ? 0.6 + Math.sin(t * 4) * 0.4 : 0);
        mesh.material.opacity = visible ? 0.5 : 0;
      } else {
        mesh.scale.setScalar(0);
        mesh.material.opacity = 0;
      }
    });
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[2, 3, 4]} intensity={0.5} />
      <pointLight position={[0, 0, 3]} intensity={0.6} color="#22d394" />
      <group ref={groupRef} position={[0, 0, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} ref={(el) => (bubblesRef.current[i] = el)}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color="#22d394" transparent opacity={0} />
          </mesh>
        ))}
        <group ref={botRef} position={[0, -0.05, 0]}>
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.25, 0.12, 0.15]} />
            <meshStandardMaterial color="#22d394" emissive="#22d394" emissiveIntensity={0.1} metalness={0.2} roughness={0.6} />
          </mesh>
          <mesh position={[-0.06, 0.14, 0.085]}>
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.06, 0.14, 0.085]}>
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, -0.06, 0]}>
            <boxGeometry args={[0.2, 0.1, 0.12]} />
            <meshStandardMaterial color="#22d394" emissive="#22d394" emissiveIntensity={0.06} metalness={0.2} roughness={0.6} />
          </mesh>
          <mesh position={[0, -0.16, 0]}>
            <boxGeometry args={[0.07, 0.03, 0.05]} />
            <meshBasicMaterial color="#22d394" transparent opacity={0.5} />
          </mesh>
        </group>
        {[0, 1, 2].map((i) => (
          <mesh key={i} ref={(el) => (dotsRef.current[i] = el)} position={[-0.2 + i * 0.06, -0.2, 0]}>
            <sphereGeometry args={[0.012, 4, 4]} />
            <meshBasicMaterial color="#22d394" transparent opacity={0} />
          </mesh>
        ))}
      </group>
    </>
  );
}

const sceneMap = {
  keyfix: KeyFixScene,
  netdoctor: NetDoctorScene,
  "hybrid-web-mail-infrastructure": MailScene,
  "instagram-youtube-soundcloud-downloader": BotScene,
};

export default function ProjectVisual({ slug }) {
  const Scene = sceneMap[slug];
  if (!Scene) return null;
  return (
    <div style={{ width: "100%", height: "min(320px, 55vw)", borderRadius: "var(--radius-lg)", overflow: "hidden", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true }} style={{ width: "100%", height: "100%" }}>
        <Scene />
      </Canvas>
    </div>
  );
}
