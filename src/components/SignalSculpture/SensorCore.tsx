import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';

interface SensorCoreProps {
  pointerNdc: THREE.Vector2;
}

export const SensorCore: React.FC<SensorCoreProps> = ({ pointerNdc }) => {
  const coreRef = useRef<THREE.Mesh | null>(null);

  useFrame(() => {
    if (!coreRef.current) return;
    // Very slow "look" tracking: rotates a few degrees to follow the pointer like an eye
    const targetX = -pointerNdc.y * 0.12; // tilt slightly up/down
    const targetY = pointerNdc.x * 0.16;  // tilt left/right

    coreRef.current.rotation.x += (targetX - coreRef.current.rotation.x) * 0.05;
    coreRef.current.rotation.y += (targetY - coreRef.current.rotation.y) * 0.05;
  });

  return (
    <>
      {/* Sensor Core Sphere (radius 0.32) */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.32, 64, 64]} />
        <meshPhysicalMaterial
          color="#000000"
          metalness={0}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.03}
          reflectivity={0.9}
        />
      </mesh>

      {/* Studio Environment with Lightformers for the signature curved highlight */}
      <Environment resolution={256} frames={1}>
        {/* Upper-left long soft white vertical strip */}
        <Lightformer
          form="rect"
          intensity={4.5}
          position={[-2.5, 3.5, 2.5]}
          scale={[1.2, 8, 1]}
          color="#ffffff"
          target={[0, 0, 0]}
        />

        {/* Right dim cool strip */}
        <Lightformer
          form="rect"
          intensity={1.8}
          position={[3.5, -0.5, 2]}
          scale={[0.6, 5, 1]}
          color="#7c92b8"
          target={[0, 0, 0]}
        />

        {/* Subtle top rim light */}
        <Lightformer
          form="circle"
          intensity={1.2}
          position={[0, 4, -1]}
          scale={[2, 2, 1]}
          color="#e8ecf2"
          target={[0, 0, 0]}
        />
      </Environment>
    </>
  );
};
