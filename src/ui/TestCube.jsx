import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function TestCube() {
  const cubeRef = useRef();

  // Rotate cube every frame with error handling
  useFrame(() => {
    if (cubeRef.current) {
      try {
        cubeRef.current.rotation.x += 0.01;
        cubeRef.current.rotation.y += 0.01;
      } catch (error) {
        console.error('TestCube rotation error:', error);
      }
    }
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
