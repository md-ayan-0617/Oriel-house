import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface LampViewer3DProps {
  finishColor?: string;
  isLightOn?: boolean;
}

function LampModel({ finishColor = '#A67A43', isLightOn = true }: { finishColor: string; isLightOn: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Gentle idle rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
    if (lightRef.current) {
      lightRef.current.intensity = isLightOn ? 2.5 + Math.sin(Date.now() * 0.003) * 0.15 : 0;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Stone Plinth Base */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1.2, 0.2, 1.2]} />
        <meshStandardMaterial color="#8F8478" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Brass Column / Stem */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.1, 32]} />
        <meshStandardMaterial color={finishColor} roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Spun Brass Shade Collar */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.22, 0.14, 0.15, 32]} />
        <meshStandardMaterial color={finishColor} roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Opal Glass Dome */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.75, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshPhysicalMaterial
          color={isLightOn ? '#FFF4D6' : '#E8DFD0'}
          emissive={isLightOn ? '#FFDFA3' : '#000000'}
          emissiveIntensity={isLightOn ? 0.9 : 0}
          roughness={0.2}
          transmission={0.4}
          thickness={0.5}
        />
      </mesh>

      {/* Finial Pin */}
      <mesh position={[0, 2.28, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={finishColor} roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Point Light inside the shade */}
      <pointLight
        ref={lightRef}
        position={[0, 1.45, 0]}
        color="#FFE0A3"
        intensity={isLightOn ? 2.5 : 0}
        distance={6}
        decay={2}
      />
    </group>
  );
}

export const LampViewer3D: React.FC<LampViewer3DProps> = ({
  finishColor = '#A67A43',
  isLightOn = true
}) => {
  const [controlsKey, setControlsKey] = useState(0);

  const handleReset = () => {
    setControlsKey((prev) => prev + 1);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '480px',
        background: isLightOn ? 'radial-gradient(circle at 50% 60%, #2A211B 0%, #171311 80%)' : '#211C19',
        borderRadius: '2px',
        overflow: 'hidden'
      }}
    >
      <Canvas
        camera={{ position: [0, 1.2, 3.4], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={isLightOn ? 0.4 : 0.25} />
        <directionalLight position={[3, 5, 2]} intensity={0.7} />
        <directionalLight position={[-3, 2, -2]} intensity={0.3} />

        <Suspense fallback={null}>
          <LampModel finishColor={finishColor} isLightOn={isLightOn} />
        </Suspense>

        <OrbitControls
          key={controlsKey}
          enablePan={false}
          minDistance={2}
          maxDistance={5}
          maxPolarAngle={Math.PI / 2 + 0.1}
          autoRotate={false}
        />
      </Canvas>

      {/* Viewer Overlay Controls */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          display: 'flex',
          gap: '10px',
          zIndex: 10
        }}
      >
        <button
          onClick={handleReset}
          className="btn-outline"
          style={{
            padding: '6px 14px',
            fontSize: '11px',
            color: '#F7F2E8',
            borderColor: 'rgba(247, 242, 232, 0.3)',
            backgroundColor: 'rgba(24, 20, 18, 0.6)'
          }}
        >
          RESET ANGLE
        </button>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '11px',
          color: '#D7CDBD',
          letterSpacing: '0.1em',
          backgroundColor: 'rgba(24, 20, 18, 0.6)',
          padding: '4px 10px',
          borderRadius: '2px',
          pointerEvents: 'none'
        }}
      >
        3D ROTATE &bull; {isLightOn ? 'LIGHT 2700K' : 'LIGHT OFF'}
      </div>
    </div>
  );
};
