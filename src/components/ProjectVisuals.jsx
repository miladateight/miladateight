import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function KeyFixScene() {
  const keysRef = useRef([]);
  const textRef = useRef();
  const chars = "QWERTY";

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    keysRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const press = Math.sin(t * 2.5 + i * 1.1);
      const isPressed = press > 0.5;
      mesh.position.y = isPressed ? -0.08 : 0.02;
      mesh.material.emissiveIntensity = isPressed ? 0.8 : 0.1;
      mesh.scale.z = isPressed ? 0.6 : 1;
    });
  });

  const keyPositions = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => (i - 2) * 0.45), []
  );

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 4]} intensity={1.5} />
      <pointLight position={[-2, 1, 2]} intensity={2} color="#22d394" />

      {keyPositions.map((x, i) => (
        <mesh
          key={i}
          ref={(el) => (keysRef.current[i] = el)}
          position={[x, 0.02, 0]}
        >
          <boxGeometry args={[0.28, 0.04, 0.28]} />
          <meshStandardMaterial
            color="#22d394"
            emissive="#22d394"
            emissiveIntensity={0.1}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      ))}

      {keyPositions.map((x, i) => (
        <sprite key={`label-${i}`} position={[x, 0.2, 0]}>
          <spriteMaterial
            color="#8899aa"
            opacity={0.6}
            transparent
            depthTest={false}
          />
        </sprite>
      ))}
    </>
  );
}

function NetDoctorScene() {
  const nodesRef = useRef([]);
  const linesRef = useRef([]);

  const nodePositions = useMemo(() =>
    [
      [-1.8, 1.2, 0],
      [1.8, 1.2, 0],
      [0, -1.4, 0],
      [-1.2, -0.4, 1.2],
      [1.2, -0.4, 1.2],
      [0, 0.6, -1.2],
    ], []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    nodePositions.forEach((pos, i) => {
      const mesh = nodesRef.current[i];
      if (!mesh) return;
      mesh.material.emissiveIntensity = 0.2 + Math.sin(t * 0.8 + i * 1.2) * 0.4;
      mesh.scale.setScalar(1 + Math.sin(t * 0.6 + i * 0.8) * 0.15);
    });
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 4]} intensity={1.2} />

      {nodePositions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => (nodesRef.current[i] = el)}
          position={pos}
        >
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial
            color="#22d394"
            emissive="#22d394"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {nodePositions.map((_, i) =>
        nodePositions.slice(i + 1).map((_, j) => {
          const ai = nodePositions[i];
          const aj = nodePositions[i + 1 + j];
          const mid = [
            (ai[0] + aj[0]) / 2,
            (ai[1] + aj[1]) / 2,
            (ai[2] + aj[2]) / 2,
          ];
          const dir = [aj[0] - ai[0], aj[1] - ai[1], aj[2] - ai[2]];
          const len = Math.sqrt(dir[0] ** 2 + dir[1] ** 2 + dir[2] ** 2);
          return (
            <mesh
              key={`line-${i}-${j}`}
              position={mid}
              quaternion={new THREE.Quaternion().setFromUnitVectors(
                new THREE.Vector3(0, 1, 0),
                new THREE.Vector3(dir[0], dir[1], dir[2]).normalize()
              )}
            >
              <cylinderGeometry args={[0.008, 0.008, len, 4]} />
              <meshBasicMaterial color="#22d394" transparent opacity={0.12} />
            </mesh>
          );
        })
      )}
    </>
  );
}

function MailScene() {
  const serversRef = useRef([]);
  const particlesRef = useRef();

  const serverPositions = useMemo(() =>
    [[-1.8, 0.6, 0], [1.8, 0.6, 0], [0, -1, 0], [-1, -0.2, 1.2], [1, -0.2, 1.2]], []
  );

  const particlePositions = useMemo(() => {
    const p = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      p[i * 3] = (Math.random() - 0.5) * 6;
      p[i * 3 + 1] = (Math.random() - 0.5) * 4;
      p[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return p;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    serverPositions.forEach((pos, i) => {
      const mesh = serversRef.current[i];
      if (!mesh) return;
      mesh.position.y = pos[1] + Math.sin(t * 0.6 + i * 1.0) * 0.06;
    });
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.08;
      const mat = particlesRef.current.material;
      mat.opacity = 0.2 + Math.sin(t * 0.3) * 0.1;
    }
  });

  const serverMatProps = { color: "#22d394", emissive: "#22d394", emissiveIntensity: 0.15, metalness: 0.3, roughness: 0.5 };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 4]} intensity={1.2} />
      <pointLight position={[0, 0, 3]} intensity={1} color="#22d394" />

      {serverPositions.map((pos, i) => (
        <mesh key={i} ref={(el) => (serversRef.current[i] = el)} position={pos}>
          <boxGeometry args={[0.5, 0.15, 0.4]} />
          <meshStandardMaterial {...serverMatProps} />
        </mesh>
      ))}

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={200}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#2dd4bf"
          size={0.04}
          transparent
          opacity={0.25}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}

function BotScene() {
  const headRef = useRef();
  const barsRef = useRef([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
      headRef.current.position.y = 0.5 + Math.sin(t * 0.5) * 0.04;
    }
    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      const h = 0.3 + Math.sin(t * 2 + i * 1.1) * 0.7;
      bar.scale.y = Math.max(0.1, h);
    });
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 4]} intensity={1.5} />

      <group>
        <mesh ref={headRef} position={[0, 0.5, 0]}>
          <boxGeometry args={[0.6, 0.5, 0.4]} />
          <meshStandardMaterial color="#22d394" emissive="#22d394" emissiveIntensity={0.2} metalness={0.2} roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[0.5, 0.4, 0.3]} />
          <meshStandardMaterial color="#22d394" emissive="#22d394" emissiveIntensity={0.15} metalness={0.2} roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.55, 0]}>
          <boxGeometry args={[0.2, 0.06, 0.15]} />
          <meshBasicMaterial color="#22d394" />
        </mesh>
        <mesh position={[0, -0.68, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#22d394" />
        </mesh>
      </group>

      <group position={[0, -0.5, 0]}>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            ref={(el) => (barsRef.current[i] = el)}
            position={[(i - 2) * 0.12, 0, 0]}
          >
            <boxGeometry args={[0.04, 0.1, 0.04]} />
            <meshBasicMaterial color="#22d394" transparent opacity={0.8} />
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
    <div
      style={{
        width: "100%",
        height: "min(320px, 55vw)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
