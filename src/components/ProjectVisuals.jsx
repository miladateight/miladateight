import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function KeyFixScene() {
  const groupRef = useRef();
  const keysRef = useRef([]);
  const chars = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
  const keys = useMemo(() => {
    const rows = [
      chars.slice(0, 10),
      chars.slice(10, 19),
      chars.slice(19, 26),
    ];
    const result = [];
    rows.forEach((row, ri) => {
      row.forEach((char, ci) => {
        result.push({ char, x: (ci - row.length / 2) * 0.3, z: (ri - 1) * 0.32 });
      });
    });
    return result;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    keys.forEach((_, i) => {
      const mesh = keysRef.current[i];
      if (!mesh) return;
      const wave = Math.sin(t * 3.5 + i * 0.6);
      const pressed = wave > 0.2;
      mesh.position.y = pressed ? -0.04 : 0.02;
      mesh.scale.z = pressed ? 0.7 : 1;
      mesh.material.emissiveIntensity = pressed ? 0.6 : 0.04;
      mesh.material.opacity = pressed ? 1 : 0.6;
    });
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.06;
      groupRef.current.position.y = Math.sin(t * 0.2) * 0.02;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 3, 4]} intensity={0.6} />
      <pointLight position={[0, 2, 2]} intensity={1.5} color="#22d394" />
      <group ref={groupRef} position={[0, 0.2, 0]}>
        {keys.map((key, i) => (
          <group key={i} position={[key.x, 0, key.z]}>
            <mesh ref={(el) => (keysRef.current[i] = el)} position={[0, 0.02, 0]}>
              <boxGeometry args={[0.22, 0.03, 0.22]} />
              <meshStandardMaterial color="#1a1a2e" emissive="#22d394" emissiveIntensity={0.04} metalness={0.3} roughness={0.4} transparent opacity={0.6} />
            </mesh>
            <mesh position={[0, 0.12, 0]}>
              <sphereGeometry args={[0.01, 4, 4]} />
              <meshBasicMaterial color="#8899aa" transparent opacity={0.3} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}

function NetDoctorScene() {
  const groupRef = useRef();
  const nodesRef = useRef([]);
  const pingRef = useRef();
  const scanRef = useRef();

  const spokes = useMemo(() => {
    const arr = [];
    const count = 7;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 1.4 + Math.random() * 0.4;
      arr.push(new THREE.Vector3(
        Math.cos(angle) * r,
        Math.sin(angle) * r * 0.6,
        (Math.random() - 0.5) * 0.6
      ));
    }
    return arr;
  }, []);

  const lineData = useMemo(() => {
    return spokes.map((pos) => new Float32Array([0, 0, 0, pos.x, pos.y, pos.z]));
  }, [spokes]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
    }
    spokes.forEach((_, i) => {
      const mesh = nodesRef.current[i];
      if (!mesh) return;
      const pulse = Math.sin(t * 1.2 + i * 1.0) * 0.3 + 0.5;
      mesh.material.emissiveIntensity = pulse * 0.5;
      mesh.scale.setScalar(0.8 + pulse * 0.25);
    });
    if (pingRef.current) {
      const progress = (t * 0.6) % 1;
      const idx = Math.floor(progress * spokes.length) % spokes.length;
      const localProgress = (progress * spokes.length) % 1;
      const start = new THREE.Vector3(0, 0, 0);
      const end = spokes[idx];
      if (end) {
        pingRef.current.position.lerpVectors(start, end, localProgress);
        const pingScale = 0.3 + Math.sin(localProgress * Math.PI) * 0.7;
        pingRef.current.scale.setScalar(0.5 + pingScale * 0.5);
        pingRef.current.material.opacity = Math.sin(localProgress * Math.PI) * 0.8;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 3, 4]} intensity={0.8} />
      <pointLight position={[0, 0, 3]} intensity={1} color="#22d394" />
      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[0.12, 10, 10]} />
          <meshStandardMaterial color="#22d394" emissive="#22d394" emissiveIntensity={0.4} metalness={0.3} roughness={0.4} />
        </mesh>
        {spokes.map((pos, i) => (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" count={2} array={lineData[i]} itemSize={3} />
            </bufferGeometry>
            <lineBasicMaterial color="#22d394" transparent opacity={0.12} />
          </line>
        ))}
        {spokes.map((pos, i) => (
          <mesh key={i} ref={(el) => (nodesRef.current[i] = el)} position={pos}>
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshStandardMaterial color="#22d394" emissive="#22d394" emissiveIntensity={0.2} />
          </mesh>
        ))}
        <mesh ref={pingRef}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      </group>
    </>
  );
}

function MailScene() {
  const groupRef = useRef();
  const serversRef = useRef([]);
  const particlesRef = useRef();
  const particleCount = 40;

  const particlePositions = useMemo(() => {
    const p = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      p[i * 3] = (Math.random() - 0.5) * 4;
      p[i * 3 + 1] = (Math.random() - 0.5) * 3;
      p[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return p;
  }, []);

  const particleSpeeds = useMemo(() => {
    const s = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) s[i] = 0.3 + Math.random() * 0.4;
    return s;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.05;
    }
    serversRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.material.emissiveIntensity = 0.06 + Math.sin(t * 0.7 + i * 1.3) * 0.06;
    });
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] -= 0.004 * particleSpeeds[i];
        if (pos[i * 3 + 1] < -1.5) {
          pos[i * 3 + 1] = 1.5;
          pos[i * 3] = (Math.random() - 0.5) * 4;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 3, 4]} intensity={0.8} />
      <pointLight position={[0, 2, 3]} intensity={1} color="#22d394" />
      <group ref={groupRef}>
        {[0, 1, 2, 3, 4].map((i) => (
          <group key={i} position={[0, -0.9 + i * 0.4, 0]}>
            <mesh ref={(el) => (serversRef.current[i] = el)}>
              <boxGeometry args={[0.5, 0.06, 0.25]} />
              <meshStandardMaterial color="#0f172a" emissive="#22d394" emissiveIntensity={0.06} metalness={0.5} roughness={0.3} />
            </mesh>
            <mesh position={[0.24, 0, 0.13]}>
              <sphereGeometry args={[0.01, 4, 4]} />
              <meshBasicMaterial color="#22d394" transparent opacity={0.6} />
            </mesh>
          </group>
        ))}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={particleCount} array={particlePositions} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial color="#22d394" size={0.015} transparent opacity={0.2} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
        </points>
      </group>
    </>
  );
}

function BotScene() {
  const groupRef = useRef();
  const pulseRef = useRef([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.06;
    }
    pulseRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const wave = Math.sin(t * 0.5 - i * 0.8);
      mesh.position.x = Math.sin(t * 0.3 + i * 1.1) * 0.25;
      mesh.position.y = 0.05 + i * 0.12 + Math.sin(t * 0.4 + i * 0.9) * 0.03;
      mesh.position.z = Math.sin(t * 0.2 + i * 0.7) * 0.1;
      mesh.scale.setScalar(0.5 + Math.sin(t * 0.8 + i * 1.3) * 0.3);
      mesh.material.opacity = 0.2 + Math.sin(t * 0.6 + i * 0.9) * 0.15;
    });
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 3, 4]} intensity={0.6} />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#22d394" />
      <group ref={groupRef} position={[0, 0.05, 0]}>
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.35, 0.3, 0.2]} />
          <meshStandardMaterial color="#22d394" emissive="#22d394" emissiveIntensity={0.12} metalness={0.3} roughness={0.5} />
        </mesh>
        <mesh position={[-0.08, 0.18, 0.11]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.08, 0.18, 0.11]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[0.25, 0.15, 0.15]} />
          <meshStandardMaterial color="#22d394" emissive="#22d394" emissiveIntensity={0.08} metalness={0.3} roughness={0.5} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} ref={(el) => (pulseRef.current[i] = el)} position={[(i - 2) * 0.2, -0.2, 0]}>
            <sphereGeometry args={[0.025, 6, 6]} />
            <meshBasicMaterial color="#22d394" transparent opacity={0.25} />
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
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true }} style={{ width: "100%", height: "100%" }}>
        <Scene />
      </Canvas>
    </div>
  );
}
