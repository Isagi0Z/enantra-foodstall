// src/ui/Hero3D.jsx
import { Canvas } from "@react-three/fiber";
import { Environment, Float, useTexture } from "@react-three/drei";

function FoodPlate() {
  const texture = useTexture("/nachos.jpg"); // your image in public/

  return (
    <Float
      speed={2}
      rotationIntensity={0.4}
      floatIntensity={0.5}
    >
      <mesh>
        <planeGeometry args={[5, 3]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 opacity-70">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ antialias: true }}
      >
        <Environment preset="sunset" />
        <FoodPlate />
      </Canvas>
    </div>
  );
}
