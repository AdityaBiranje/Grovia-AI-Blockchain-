import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Cylinder, Torus, Text } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedCoin() {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Spin like a coin
      groupRef.current.rotation.y = t * 1.5;
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.3;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.3;
    }

    if (lightRef.current) {
      lightRef.current.intensity = 3 + Math.sin(t * 2) * 1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight ref={lightRef} position={[0, 0, 5]} intensity={3} color="#00FF95" />
      <pointLight position={[0, 0, -5]} intensity={2} color="#A6FF47" />
      
      <group ref={groupRef}>
        {/* Main coin body */}
        <Cylinder args={[1.2, 1.2, 0.2, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#00FF95"
            metalness={0.95}
            roughness={0.1}
            emissive="#00FCA8"
            emissiveIntensity={0.3}
          />
        </Cylinder>

        {/* Coin edge ring */}
        <Torus args={[1.2, 0.1, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#A6FF47"
            metalness={0.9}
            roughness={0.2}
            emissive="#00FF95"
            emissiveIntensity={0.4}
          />
        </Torus>

        {/* Letter G on front face */}
        <Text
          position={[0, 0, 0.11]}
          fontSize={0.8}
          color="#0D0D0D"
          anchorX="center"
          anchorY="middle"
          
        >
          G
        </Text>

        {/* Letter G on back face */}
        <Text
          position={[0, 0, -0.11]}
          rotation={[0, Math.PI, 0]}
          fontSize={0.8}
          color="#0D0D0D"
          anchorX="center"
          anchorY="middle"
          
        >
          G
        </Text>

        {/* Outer glow ring */}
        <Torus args={[1.4, 0.08, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial
            color="#00FF95"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </Torus>
      </group>
    </>
  );
}

export const EnergyOrb = () => {
  return (
    <div className="w-full h-[400px] md:h-[600px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <OrbitControls enableZoom={false} enablePan={false} />
        <AnimatedCoin />
      </Canvas>
    </div>
  );
};
