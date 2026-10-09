import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function VolumetricBeams({ isLit = false }: { isLit: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Floating dust motes in the light beam
  const particleCount = 60;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 4;
      pos[i + 1] = Math.random() * 4 - 1;
      pos[i + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
      const positionsAttr = particlesRef.current.geometry.attributes.position;
      const array = positionsAttr.array as Float32Array;
      for (let i = 1; i < array.length; i += 3) {
        array[i] += delta * 0.15;
        if (array[i] > 3) array[i] = -1;
      }
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <group position={[0.8, -0.2, 0]}>
      {/* Subtle Volumetric Light Cone */}
      <mesh ref={meshRef} position={[0, 0.8, 0]} rotation={[0, 0, -0.15]}>
        <coneGeometry args={[1.6, 3.8, 32, 1, true]} />
        <meshBasicMaterial
          color="#FFE2A8"
          transparent
          opacity={isLit ? 0.08 : 0.015}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Floating Dust Motes */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#FFF4D6"
          transparent
          opacity={isLit ? 0.55 : 0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export const LightCanvas: React.FC<{ isLit?: boolean }> = ({ isLit = false }) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: isLit ? 1 : 0.2,
        transition: 'opacity 1.2s ease'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <VolumetricBeams isLit={isLit} />
      </Canvas>
    </div>
  );
};
