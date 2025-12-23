import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo, useState } from "react";

// Custom implementation of Float to avoid Drei dependency
function Float({ children, speed = 1, rotationIntensity = 1, floatIntensity = 1 }) {
  const group = useRef();
  const offset = useRef(Math.random() * 100);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + offset.current;
    if (group.current) {
      group.current.rotation.x = (Math.sin(t / 4) * rotationIntensity) / 10;
      group.current.rotation.y = (Math.sin(t / 4) * rotationIntensity) / 10;
      group.current.position.y = (Math.sin(t) * floatIntensity) / 10;
    }
  });

  return <group ref={group}>{children}</group>;
}

// Custom Stars implementation
function Stars({ count = 2000 }) {
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 20; // radius
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count]);

  const stride = 3;
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, stride));

  return (
    <points>
      <bufferGeometry attach="geometry" {...geometry} />
      <pointsMaterial size={0.05} color="white" sizeAttenuation={true} transparent opacity={0.8} />
    </points>
  );
}

// Custom Sparkles (simple particles)
function Sparkles({ count = 100, color = "#f97316" }) {
  const { positions, items } = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 10,
        speed: Math.random() * 0.5 + 0.2,
        offset: Math.random() * 100
      })
    }
    return { items };
  }, [count]);

  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    // Animation logic could go here updating instances, but for simplicity static sparkles or simple movement
    // For a quick fix, let's just rotate the whole group slightly
    meshRef.current.rotation.y += 0.001;
  });

  // Using simple individual meshes for now as instanced mesh is more complex to set up manually without Drei's helper
  // or just use Points which is faster

  // Back to Points for performance
  const pointsPositions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      p[i] = (Math.random() - 0.5) * 25;
    }
    return p;
  }, [count]);

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={pointsPositions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color={color} transparent opacity={0.6} sizeAttenuation={true} />
    </points>
  )
}


function FloatingShape({ position, color, scale, geometryType = 'sphere' }) {
  const geometry = useMemo(() => {
    switch (geometryType) {
      case 'cube': return new THREE.BoxGeometry(1, 1, 1);
      case 'torus': return new THREE.TorusGeometry(0.8, 0.2, 16, 32);
      case 'dodecahedron': return new THREE.DodecahedronGeometry(1);
      default: return new THREE.SphereGeometry(1, 32, 32);
    }
  }, [geometryType]);

  return (
    <Float>
      <mesh position={position} scale={scale}>
        <primitive object={geometry} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 bg-zinc-950">
      <Canvas camera={{ position: [0, 0, 15] }}>

        {/* Lights (Replacing Environment) */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#f97316" />
        <spotLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
        <spotLight position={[0, 10, 0]} intensity={1.5} color="#ffffff" />

        {/* Floating Shapes */}
        <FloatingShape position={[-4, 2, -5]} color="#f97316" scale={1.5} geometryType="dodecahedron" />
        <FloatingShape position={[5, -2, -3]} color="#ea580c" scale={1.2} geometryType="torus" />
        <FloatingShape position={[-6, -4, -8]} color="#fed7aa" scale={2} geometryType="sphere" />
        <FloatingShape position={[6, 4, -10]} color="#fdba74" scale={1.8} geometryType="cube" />

        <Stars count={3000} />
        <Sparkles count={150} />

        {/* Fog */}
        <fog attach="fog" args={['#09090b', 5, 25]} />
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950 pointer-events-none" />
    </div>
  );
}
