import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";

function AnimatedHouse() {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.12;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.035;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.35}>
      <group ref={group} rotation={[0.04, -0.35, 0]}>
        <mesh position={[0, -0.55, 0]} receiveShadow>
          <boxGeometry args={[4.6, 0.16, 3.5]} />
          <meshStandardMaterial color="#dfe7f2" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.18, 0]} castShadow>
          <boxGeometry args={[2.6, 1.45, 1.9]} />
          <meshStandardMaterial color="#ffffff" roughness={0.45} />
        </mesh>
        <mesh position={[0, 1.05, 0]} castShadow rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[2.05, 2.05, 2.05]} />
          <meshStandardMaterial color="#f57c00" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.04, 0.99]} castShadow>
          <boxGeometry args={[0.42, 0.86, 0.06]} />
          <meshStandardMaterial color="#0d47a1" roughness={0.4} />
        </mesh>
        {[-0.74, 0.74].map((x) => (
          <mesh key={x} position={[x, 0.38, 1]} castShadow>
            <boxGeometry args={[0.42, 0.38, 0.07]} />
            <meshStandardMaterial color="#8ec5ff" roughness={0.15} metalness={0.05} />
          </mesh>
        ))}
        <mesh position={[-1.75, 0.28, 0.92]} castShadow>
          <boxGeometry args={[0.12, 1.65, 0.12]} />
          <meshStandardMaterial color="#1565c0" />
        </mesh>
        <mesh position={[1.75, 0.28, 0.92]} castShadow>
          <boxGeometry args={[0.12, 1.65, 0.12]} />
          <meshStandardMaterial color="#1565c0" />
        </mesh>
        <mesh position={[0, 1.08, 1.08]} castShadow>
          <boxGeometry args={[3.9, 0.1, 0.1]} />
          <meshStandardMaterial color="#f57c00" />
        </mesh>
      </group>
    </Float>
  );
}

export default function ThreeShowcase() {
  return (
    <div className="three-showcase" aria-label="Interactive 3D home construction model">
      <Canvas shadows camera={{ position: [4, 3, 5], fov: 42 }} dpr={[1, 1.75]}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 5, 3]} intensity={1.7} castShadow />
        <Suspense fallback={null}>
          <AnimatedHouse />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.65} />
      </Canvas>
    </div>
  );
}
