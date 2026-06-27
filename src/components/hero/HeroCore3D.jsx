import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODES = 24;
const RADIUS = 2.4;
const CONNECT_DIST = RADIUS * 0.55;

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
  const nodePositions = useMemo(() => randomSpherePoints(NODES, RADIUS), []);

  const connections = useMemo(() => {
    const c = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < CONNECT_DIST) {
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

  const dotPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < NODES; i++) {
      const angle = (i / NODES) * Math.PI * 2;
      const r2 = RADIUS + 0.3 + Math.sin(i * 1.7) * 0.3;
      positions.push(new THREE.Vector3(
        Math.cos(angle) * r2,
        Math.sin(angle * 2.3) * 0.5,
        Math.sin(angle) * r2
      ));
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[RADIUS, 20, 20]} />
        <meshBasicMaterial color="#22d394" wireframe transparent opacity={0.04} />
      </mesh>

      <lineSegments geometry={lineGeom}>
        <lineBasicMaterial color="#22d394" transparent opacity={0.12} />
      </lineSegments>

      {nodePositions.map((pos, i) => {
        const pulse = Math.sin(i * 1.3) * 0.3 + 0.7;
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.04 + pulse * 0.02, 6, 6]} />
            <meshBasicMaterial color="#22d394" transparent opacity={0.5 * pulse} />
          </mesh>
        );
      })}

      {dotPositions.slice(0, 6).map((pos, i) => (
        <mesh key={`orb-${i}`} position={pos}>
          <sphereGeometry args={[0.015, 4, 4]} />
          <meshBasicMaterial color="#22d394" transparent opacity={0.3} />
        </mesh>
      ))}
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
