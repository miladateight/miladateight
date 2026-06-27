import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Stars() {
  const ref = useRef();
  const positions = useMemo(() => {
    const p = new Float32Array(350 * 3);
    for (let i = 0; i < 350; i++) {
      const r = 20 + Math.random() * 130;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, []);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.0008; });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={350} array={positions} itemSize={3} /></bufferGeometry>
      <pointsMaterial color="#556688" size={0.025} transparent opacity={0.1} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function DeepGeometry() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.015) * 0.08;
      ref.current.rotation.y += 0.002;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -25]}>
      <torusKnotGeometry args={[6, 1.5, 80, 12]} />
      <meshBasicMaterial color="#22d394" wireframe transparent opacity={0.012} />
    </mesh>
  );
}

function SoftGlow({ pos, size, color, speed }) {
  const ref = useRef();
  const b = useRef(new THREE.Vector3(pos[0], pos[1], pos[2]));
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.x = b.current.x + Math.sin(t * 0.15) * 1.5;
    ref.current.position.y = b.current.y + Math.sin(t * 0.12 + 1) * 1.2;
    ref.current.position.z = b.current.z + Math.sin(t * 0.14 + 2) * 0.8;
    ref.current.material.opacity = 0.01 + Math.sin(t * 0.25) * 0.005;
  });
  return (
    <mesh ref={ref} position={pos}>
      <sphereGeometry args={[size, 10, 10]} />
      <meshBasicMaterial color={color} transparent opacity={0.012} />
    </mesh>
  );
}

export default function ImmersiveBackground() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} aria-hidden="true">
      <Canvas dpr={[1, reduce ? 1 : 1.2]} gl={{ alpha: true, powerPreference: "low-power" }} style={{ width: "100%", height: "100%" }}>
        <Stars />
        {!reduce && <DeepGeometry />}
        {!reduce && <SoftGlow pos={[-8, 3, -20]} size={2.5} color="#22d394" speed={0.2} />}
        {!reduce && <SoftGlow pos={[6, -4, -22]} size={2} color="#2dd4bf" speed={0.18} />}
      </Canvas>
    </div>
  );
}
