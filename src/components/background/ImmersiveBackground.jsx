import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function StarField() {
  const ref = useRef();
  const positions = useMemo(() => {
    const p = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      const r = 30 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.002;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={400} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#446688" size={0.04} transparent opacity={0.15} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function AmbientRing() {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.x += delta * 0.005;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[10, 0.015, 8, 80]} />
      <meshBasicMaterial color="#22d394" transparent opacity={0.03} />
    </mesh>
  );
}

function AmbientRing2() {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.003;
    if (ref.current) ref.current.rotation.x += delta * 0.004;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[14, 0.01, 8, 60]} />
      <meshBasicMaterial color="#22d394" transparent opacity={0.02} />
    </mesh>
  );
}

export default function ImmersiveBackground() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} aria-hidden="true">
      <Canvas dpr={[1, reduce ? 1 : 1.5]} gl={{ alpha: true, powerPreference: "low-power" }} style={{ width: "100%", height: "100%" }}>
        <StarField />
        {!reduce && <AmbientRing />}
        {!reduce && <AmbientRing2 />}
      </Canvas>
    </div>
  );
}
