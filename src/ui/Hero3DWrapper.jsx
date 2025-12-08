import { Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TestCube from "./TestCube";

export default function Hero3DWrapper() {
  return (
    <Canvas 
      className="absolute inset-0" 
      camera={{ position: [3, 3, 5] }}
      gl={{ antialias: true, alpha: true }}
      onCreated={(state) => {
        // Ensure canvas is properly initialized
        if (state.gl) {
          state.gl.setClearColor('#ffffff', 0);
        }
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 4, 4]} intensity={1} />
      <Suspense fallback={null}>
        <TestCube />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
