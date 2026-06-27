import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODES = 32;
const RADIUS = 2.4;

function randomSpherePoints(n, r) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pts.push(new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    ));
  }
  return pts;
}

function NetworkTopology() {
  const groupRef = useRef();
  const glowRef = useRef();
  const nodePositions = useMemo(() => randomSpherePoints(NODES, RADIUS), []);

  const connections = useMemo(() => {
    const c = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < RADIUS * 0.5) {
          c.push([i, j]);
        }
      }
    }
    return c;
  }, [nodePositions]);

  const linePositions = useMemo(() => {
    const arr = [];
    connections.forEach(([i, j]) => {
      arr.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
      arr.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
    });
    return new Float32Array(arr);
  }, [connections, nodePositions]);

  const lineGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return g;
  }, [linePositions]);

  const particles = useMemo(() => {
    const p = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.5 + Math.random() * 0.8;
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.03;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 0.3) * 0.08);
      glowRef.current.material.opacity = 0.04 + Math.sin(t * 0.4) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[RADIUS, 20, 20]} />
        <meshBasicMaterial color="#22d394" wireframe transparent opacity={0.04} />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[RADIUS * 0.6, 16, 16]} />
        <meshBasicMaterial color="#22d394" transparent opacity={0.04} />
      </mesh>

      <lineSegments geometry={lineGeom}>
        <lineBasicMaterial color="#22d394" transparent opacity={0.1} />
      </lineSegments>

      {nodePositions.map((pos, i) => {
        const pulse = Math.sin(i * 1.7) * 0.4 + 0.6;
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.035 + pulse * 0.025, 6, 6]} />
            <meshBasicMaterial color="#22d394" transparent opacity={0.35 * pulse} />
          </mesh>
        );
      })}

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={60} array={particles} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#22d394" size={0.015} transparent opacity={0.15} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}

export default function HeroCore3D() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <Canvas camera={{ position: [0, 0, 4.8], fov: 42 }} dpr={[1, reduce ? 1 : 1.5]} gl={{ alpha: true }} style={{ width: "100%", height: "100%" }}>
      {!reduce && <NetworkTopology />}
    </Canvas>
  );
}
