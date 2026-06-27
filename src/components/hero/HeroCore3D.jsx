import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 6;
const ORBIT_RADIUS = 2.2;
const CORE_RADIUS = 0.5;

const COLORS = ["#22d394", "#2dd4bf", "#34d399", "#14b8a6", "#0ea5e9", "#06b6d4"];

function Core() {
  const ref = useRef();
  const matRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    ref.current.rotation.y = t * 0.15;
    ref.current.rotation.z = Math.cos(t * 0.15) * 0.05;
    matRef.current.emissiveIntensity = 0.3 + Math.sin(t * 0.5) * 0.15;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[CORE_RADIUS, 1]} />
      <meshStandardMaterial
        ref={matRef}
        color="#22d394"
        emissive="#22d394"
        emissiveIntensity={0.3}
        metalness={0.4}
        roughness={0.3}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

function InnerGlow() {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.scale.setScalar(1 + Math.sin(t * 0.4) * 0.05);
    ref.current.material.opacity = 0.15 + Math.sin(t * 0.6) * 0.05;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[CORE_RADIUS * 1.8, 16, 16]} />
      <meshBasicMaterial
        color="#22d394"
        transparent
        opacity={0.15}
        depthWrite={false}
      />
    </mesh>
  );
}

function OrbitingNode({ index, color, speed }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const { pointer } = useThree();
  const angleOffset = (index / NODE_COUNT) * Math.PI * 2;
  const tiltAngle = (index / NODE_COUNT) * Math.PI;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const angle = t * speed + angleOffset;

    const x = Math.cos(angle) * ORBIT_RADIUS;
    const y = Math.sin(angle) * ORBIT_RADIUS * 0.5;
    const z = Math.sin(angle * 0.7 + tiltAngle) * ORBIT_RADIUS * 0.3;

    const mx = pointer.x * 0.3;
    const my = pointer.y * 0.2;
    groupRef.current.position.set(
      x + mx * 0.5,
      y + my * 0.5,
      z + mx * 0.3
    );

    meshRef.current.scale.setScalar(1 + Math.sin(t * 2 + index) * 0.15);
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function OrbitRings() {
  const ref = useRef();

  const ringPoints = useMemo(() => {
    const pts = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(
          Math.cos(theta) * ORBIT_RADIUS,
          Math.sin(theta) * ORBIT_RADIUS * 0.5,
          0
        )
      );
    }
    return pts;
  }, []);

  const ringPoints2 = useMemo(() => {
    const pts = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(
          Math.cos(theta) * ORBIT_RADIUS * 0.7,
          0,
          Math.sin(theta) * ORBIT_RADIUS * 0.7
        )
      );
    }
    return pts;
  }, []);

  const geometry1 = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(ringPoints.length * 3);
    ringPoints.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [ringPoints]);

  const geometry2 = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(ringPoints2.length * 3);
    ringPoints2.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [ringPoints2]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={ref}>
      <line>
        <primitive object={geometry1} />
        <lineBasicMaterial color="#22d394" transparent opacity={0.08} />
      </line>
      <line>
        <primitive object={geometry2} />
        <lineBasicMaterial color="#22d394" transparent opacity={0.06} />
      </line>
    </group>
  );
}

function ConnectionLines() {
  const ref = useRef();
  const nodePositions = useRef(new Float32Array(NODE_COUNT * 3));

  const lineGeometry = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 2 * 3);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setIndex(
      Array.from({ length: NODE_COUNT }, (_, i) => [i * 2, i * 2 + 1]).flat()
    );
    return g;
  }, []);

  useFrame(() => {
    const pos = lineGeometry.attributes.position.array;
    for (let i = 0; i < NODE_COUNT; i++) {
      pos[i * 6] = 0;
      pos[i * 6 + 1] = 0;
      pos[i * 6 + 2] = 0;
      pos[i * 6 + 3] = nodePositions.current[i * 3];
      pos[i * 6 + 4] = nodePositions.current[i * 3 + 1];
      pos[i * 6 + 5] = nodePositions.current[i * 3 + 2];
    }
    lineGeometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial color="#22d394" transparent opacity={0.08} />
    </lineSegments>
  );
}

function SceneContent() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 3, 4]} intensity={0.8} />
      <directionalLight position={[-2, -1, 2]} intensity={0.3} color="#22d394" />

      <Core />
      <InnerGlow />
      <OrbitRings />
      {!reduce && (
        <>
          {Array.from({ length: NODE_COUNT }, (_, i) => (
            <OrbitingNode
              key={i}
              index={i}
              color={COLORS[i % COLORS.length]}
              speed={0.2 + Math.random() * 0.15}
            />
          ))}
        </>
      )}
    </>
  );
}

export default function HeroCore3D() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      dpr={[1, reduce ? 1 : 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <SceneContent />
    </Canvas>
  );
}
