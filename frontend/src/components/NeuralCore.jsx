import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Environment, Float, Sparkles } from '@react-three/drei';

function BrainMesh({ isTapping }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    // Rotation animation
    if(meshRef.current) {
        meshRef.current.rotation.y += delta * 0.5;
        // Pulse scale based on tap state
        const targetScale = isTapping ? 1.05 : 1;
        meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.2);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          color="#00F0FF" 
          emissive="#00F0FF" 
          emissiveIntensity={1.5}
          wireframe={true}
          transparent={true}
          opacity={0.8}
        />
        {/* Inner solid core */}
        <Sphere args={[1.8, 32, 32]}>
          <meshStandardMaterial 
            color="#0A0D14" 
            emissive="#00F0FF" 
            emissiveIntensity={0.2}
          />
        </Sphere>
      </mesh>
    </Float>
  );
}

export default function NeuralCore({ onTap }) {
  const [isTapping, setIsTapping] = useState(false);

  const handlePointerDown = () => {
    setIsTapping(true);
    if(onTap) onTap();
  };

  const handlePointerUp = () => {
    setIsTapping(false);
  };

  return (
    <div className="w-full h-64 sm:h-80 relative cursor-pointer" 
         onPointerDown={handlePointerDown}
         onPointerUp={handlePointerUp}
         onPointerLeave={handlePointerUp}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#B026FF" />
        
        <BrainMesh isTapping={isTapping} />
        
        {/* Floating background particles */}
        <Sparkles count={100} scale={10} size={2} speed={0.4} color="#00F0FF" />
        <Sparkles count={50} scale={8} size={1.5} speed={0.2} color="#B026FF" />
        
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
