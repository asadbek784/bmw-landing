'use client';

import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group, Mesh } from 'three';

interface CarModelProps {
  isLoading?: boolean;
  onLoaded?: () => void;
  onError?: (error: string) => void;
}

// Low-poly car model built from primitives
// This is a placeholder - can be easily swapped for a real .glb model
export function CarModelPlaceholder() {
  return (
    <group>
      {/* Simple test cube */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Car body - main chassis */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.5, 2]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.8, 0.3]}>
        <boxGeometry args={[0.75, 0.35, 0.05]} />
        <meshStandardMaterial color="#a8d8ff" metalness={0.3} roughness={0.1} opacity={0.8} transparent />
      </mesh>

      {/* Front wheels */}
      <mesh position={[-0.35, 0.15, 0.7]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.15, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      <mesh position={[0.35, 0.15, 0.7]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.15, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Rear wheels */}
      <mesh position={[-0.35, 0.15, -0.7]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.15, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      <mesh position={[0.35, 0.15, -0.7]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.15, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Front bumper */}
      <mesh position={[0, 0.35, 1.05]} castShadow>
        <boxGeometry args={[0.8, 0.2, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.3, 0.5, 1.05]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ffff88" emissive="#ffff00" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.3, 0.5, 1.05]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ffff88" emissive="#ffff00" emissiveIntensity={0.4} />
      </mesh>

      {/* Rear lights */}
      <mesh position={[-0.3, 0.5, -1.05]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff0000" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.3, 0.5, -1.05]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff0000" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

// External model loader (for real .glb files)
// To use: replace CarModelPlaceholder with <CarModelExternalLoader />
// and provide a model URL
export function CarModelExternalLoader({ modelUrl = '/models/car.glb' }: { modelUrl?: string }) {
  const groupRef = useRef<Group>(null);

  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { scene } = useGLTF(modelUrl);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (scene && groupRef.current) {
        groupRef.current.add(scene);
      }
    }, [scene]);

    return <group ref={groupRef} />;
  } catch {
    // Fallback to placeholder if model fails to load
    return <CarModelPlaceholder />;
  }
}

export default function CarModel({ isLoading = false, onLoaded, onError }: CarModelProps) {
  useEffect(() => {
    if (!isLoading && onLoaded) {
      onLoaded();
    }
  }, [isLoading, onLoaded]);

  return <CarModelPlaceholder />;
}
