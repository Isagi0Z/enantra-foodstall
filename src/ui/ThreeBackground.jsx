import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        
        {/* SOFT LIGHT */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 2, 3]} intensity={1} />

        {/* FLOATING ORANGE SPHERE */}
        <Sphere args={[1, 64, 64]} position={[-1.5, 0.3, -2]}>
          <MeshDistortMaterial
            color="#ff7b00"
            distort={0.4}
            speed={2}
            roughness={0.2}
          />
        </Sphere>

        {/* FLOATING WHITE SPHERE */}
        <Sphere args={[0.8, 64, 64]} position={[1.2, -0.5, -1.5]}>
          <MeshDistortMaterial
            color="#ffffff"
            distort={0.25}
            speed={1.5}
            opacity={0.25}
            transparent
          />
        </Sphere>

        {/* ROTATING DONUT */}
        <mesh rotation={[0.4, 0.6, 0]}>
          <torusGeometry args={[1.2, 0.35, 32, 100]} />
          <meshStandardMaterial color="#ffb15e" metalness={0.3} roughness={0.1} />
        </mesh>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
