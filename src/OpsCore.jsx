import { useEffect, useRef } from "react";
import * as THREE from "three";

const NODES = [
  { color: "#43d2e0", radius: 2.05, incline: 0.18, speed: 0.34, offset: 0 },
  { color: "#f6c453", radius: 2.3, incline: -0.32, speed: 0.27, offset: 1.3 },
  { color: "#8b7bff", radius: 2.5, incline: 0.5, speed: 0.22, offset: 2.6 },
  { color: "#34d399", radius: 2.15, incline: -0.12, speed: 0.3, offset: 3.9 },
  { color: "#ef9b3f", radius: 2.4, incline: 0.05, speed: 0.25, offset: 5.1 }
];

export default function OpsCore() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 760px)").matches || !window.matchMedia("(pointer: fine)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.4, 7.6);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: "low-power" });
    } catch {
      mount.classList.add("ops-core-stage--fallback");
      return () => mount.classList.remove("ops-core-stage--fallback");
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.1 : 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    scene.add(new THREE.AmbientLight("#dff7ff", 1.1));
    const key = new THREE.DirectionalLight("#f8fcff", 3.2);
    key.position.set(3.4, 3.6, 4.4);
    scene.add(key);
    const rim = new THREE.PointLight("#43d2e0", 16, 14);
    rim.position.set(-3.2, 1.1, 3.2);
    scene.add(rim);

    const coreGlow = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.62, 1),
      new THREE.MeshBasicMaterial({ color: "#fff3d2", transparent: true, opacity: 0.85 })
    );
    group.add(coreGlow);

    const coreShell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.92, 1),
      new THREE.MeshStandardMaterial({
        color: "#0b1424",
        emissive: "#f6c453",
        emissiveIntensity: 0.55,
        roughness: 0.32,
        metalness: 0.4,
        wireframe: false,
        transparent: true,
        opacity: 0.46
      })
    );
    group.add(coreShell);

    const coreWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.04, 1),
      new THREE.MeshBasicMaterial({ color: "#43d2e0", wireframe: true, transparent: true, opacity: 0.3 })
    );
    group.add(coreWire);

    const nodeMeshes = NODES.map((node) => {
      const mesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.17, 0),
        new THREE.MeshStandardMaterial({
          color: node.color,
          emissive: node.color,
          emissiveIntensity: 0.7,
          roughness: 0.3,
          metalness: 0.2
        })
      );
      group.add(mesh);
      return mesh;
    });

    const linkLines = NODES.map((node) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
      const material = new THREE.LineBasicMaterial({ color: node.color, transparent: true, opacity: 0.4 });
      const line = new THREE.Line(geometry, material);
      group.add(line);
      return line;
    });

    const particles = new THREE.BufferGeometry();
    const particleCount = isMobile ? 36 : 90;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 3.2 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const y = THREE.MathUtils.randFloatSpread(3.6);
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * radius;
    }
    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleCloud = new THREE.Points(
      particles,
      new THREE.PointsMaterial({ color: "#dff7ff", size: 0.015, transparent: true, opacity: 0.32 })
    );
    scene.add(particleCloud);

    let pointerX = 0;
    let pointerY = 0;
    let isVisible = true;

    const onMove = (event) => {
      if (reduceMotion) return;
      const rect = mount.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    mount.addEventListener("pointermove", onMove);
    window.addEventListener("resize", onResize);
    onResize();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(mount);

    const nodeVec = new THREE.Vector3();
    const clock = new THREE.Clock();
    let frameId;

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();

      NODES.forEach((node, index) => {
        const angle = elapsed * node.speed + node.offset;
        const x = Math.cos(angle) * node.radius;
        const z = Math.sin(angle) * node.radius;
        const y = Math.sin(angle * 0.6 + node.offset) * node.radius * Math.sin(node.incline);
        nodeVec.set(x, y, z);
        nodeMeshes[index].position.copy(nodeVec);
        nodeMeshes[index].rotation.y = angle * 1.4;

        const linePositions = linkLines[index].geometry.attributes.position.array;
        linePositions[0] = 0;
        linePositions[1] = 0;
        linePositions[2] = 0;
        linePositions[3] = x;
        linePositions[4] = y;
        linePositions[5] = z;
        linkLines[index].geometry.attributes.position.needsUpdate = true;
      });

      group.rotation.y = elapsed * 0.05 + pointerX * 0.12;
      group.rotation.x = -0.05 + pointerY * 0.06;
      coreWire.rotation.y = -elapsed * 0.08;
      coreWire.rotation.x = elapsed * 0.05;
      coreGlow.scale.setScalar(1 + Math.sin(elapsed * 1.4) * 0.05);
      particleCloud.rotation.y = elapsed * 0.012;

      renderer.render(scene, camera);
    };

    const animate = () => {
      if (isVisible) renderFrame();
      frameId = requestAnimationFrame(animate);
    };

    if (reduceMotion) renderFrame();
    else animate();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      mount.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      coreGlow.geometry.dispose();
      coreGlow.material.dispose();
      coreShell.geometry.dispose();
      coreShell.material.dispose();
      coreWire.geometry.dispose();
      coreWire.material.dispose();
      nodeMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      linkLines.forEach((line) => {
        line.geometry.dispose();
        line.material.dispose();
      });
      particles.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="ops-core-stage" aria-hidden="true" />;
}
