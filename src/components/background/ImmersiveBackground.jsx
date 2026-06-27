import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Stars() {
  const ref = useRef();
  const positions = useMemo(() => {
    const p = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const r = 20 + Math.random() * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, []);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.0015; });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={500} array={positions} itemSize={3} /></bufferGeometry>
      <pointsMaterial color="#446688" size={0.03} transparent opacity={0.12} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function AmbientRing({ radius, opacity, speedX, speedY, color }) {
  const ref = useRef();
  useFrame((_, d) => {
    if (ref.current) { ref.current.rotation.x += d * speedX; ref.current.rotation.y += d * speedY; }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.012, 8, 80]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function DriftOrb({ position, color, size, speed }) {
  const ref = useRef();
  const base = useRef(new THREE.Vector3(position[0], position[1], position[2]));
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.x = base.current.x + Math.sin(t * 0.3) * 1.5;
    ref.current.position.y = base.current.y + Math.sin(t * 0.2 + 1) * 1.2;
    ref.current.position.z = base.current.z + Math.sin(t * 0.25 + 2) * 0.8;
    ref.current.material.opacity = 0.015 + Math.sin(t * 0.4) * 0.008;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.02} />
    </mesh>
  );
}

export default function ImmersiveBackground() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} aria-hidden="true">
      <Canvas dpr={[1, reduce ? 1 : 1.5]} gl={{ alpha: true, powerPreference: "low-power" }} style={{ width: "100%", height: "100%" }}>
        <Stars />
        {!reduce && <AmbientRing radius={12} opacity={0.025} speedX={0.004} speedY={0.002} color="#22d394" />}
        {!reduce && <AmbientRing radius={18} opacity={0.015} speedX={0.002} speedY={0.003} color="#2dd4bf" />}
        {!reduce && <AmbientRing radius={8} opacity={0.02} speedX={0.003} speedY={0.005} color="#22d394" />}
        {!reduce && <DriftOrb position={[-8, 3, -10]} color="#22d394" size={2.5} speed={0.3} />}
        {!reduce && <DriftOrb position={[7, -4, -12]} color="#2dd4bf" size={2} speed={0.25} />}
        {!reduce && <DriftOrb position={[0, 6, -15]} color="#34d399" size={1.8} speed={0.35} />}
      </Canvas>
    </div>
  );
}
