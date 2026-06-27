import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function DeepSpace({ count = 2000 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 40 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#88bbee"
        size={0.08}
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Nebula({ count = 500 }) {
  const ref = useRef();
  const [positions, colors] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 15 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      p[i * 3 + 2] = r * Math.cos(phi);

      const t = Math.random();
      if (t < 0.33) {
        c[i * 3] = 0.13; c[i * 3 + 1] = 0.83; c[i * 3 + 2] = 0.58;
      } else if (t < 0.66) {
        c[i * 3] = 0.1; c[i * 3 + 1] = 0.6; c[i * 3 + 2] = 0.8;
      } else {
        c[i * 3] = 0.2; c[i * 3 + 1] = 0.7; c[i * 3 + 2] = 0.5;
      }
    }
    return [p, c];
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.015;
      ref.current.rotation.x = Math.sin(Date.now() * 0.0001) * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.25}
        transparent
        opacity={0.2}
        sizeAttenuation
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DataStreams({ count = 300 }) {
  const ref = useRef();
  const { positions, speeds, lengths } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    const l = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 50;
      p[i * 3 + 1] = (Math.random() - 0.5) * 60;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
      s[i] = 0.3 + Math.random() * 0.7;
      l[i] = 0.5 + Math.random() * 1.5;
    }
    return { positions: p, speeds: s, lengths: l };
  }, [count]);

  const speedsRef = useRef(speeds);
  const lengthsRef = useRef(lengths);
  const positionsRef = useRef(positions);

  useFrame((_, delta) => {
    const p = positionsRef.current;
    for (let i = 0; i < count; i++) {
      p[i * 3 + 1] -= delta * 1.5 * speedsRef.current[i];
      if (p[i * 3 + 1] < -30) {
        p[i * 3 + 1] = 30;
        p[i * 3] = (Math.random() - 0.5) * 50;
        p[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
      }
    }
    if (ref.current) {
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#22d394"
        size={0.06}
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ForegroundParticles({ count = 80 }) {
  const ref = useRef();
  const { pointer } = useThree();
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 40;
      p[i * 3 + 1] = (Math.random() - 0.5) * 40;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10 + 2;
    }
    return p;
  }, [count]);

  const basePositions = useRef(new Float32Array(positions));

  useFrame(() => {
    if (!ref.current) return;
    const p = ref.current.geometry.attributes.position.array;
    const bp = basePositions.current;
    const mx = pointer.x * 2;
    const my = pointer.y * 1.5;
    for (let i = 0; i < count; i++) {
      p[i * 3] = bp[i * 3] + mx * 1.5;
      p[i * 3 + 1] = bp[i * 3 + 1] + my * 1.5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#22d394"
        size={0.12}
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SceneContent() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <>
      <DeepSpace />
      {!reduce && <Nebula />}
      {!reduce && <DataStreams />}
      {!reduce && <ForegroundParticles />}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={0.4}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export default function ImmersiveBackground() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 25], fov: 60 }}
        dpr={[1, reduce ? 1 : 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
