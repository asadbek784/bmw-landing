'use client';

import { useRef, useEffect, useState, useCallback, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CarModel from './CarModel';
import { CAMERA_POSITIONS, CAR_ROTATIONS } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

interface SceneProps {
  onLoadingComplete?: () => void;
}

// Main 3D scene component
function Scene({ onLoadingComplete }: SceneProps) {
  const groupRef = useRef<Group>(null);
  const cameraRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { camera } = useThree();
  const autoRotateRef = useRef(true);



  // Handle auto-rotation for hero section
  useFrame(() => {
    if (groupRef.current && autoRotateRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  // Set up scroll-triggered camera animations
  useEffect(() => {
    if (!groupRef.current) return;

    const carGroup = groupRef.current;
    const scrollContainer = document.documentElement;

    // Create GSAP timeline tied to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // smooth scrub - 0.5 second behind scroll
        onUpdate: (self) => {
          // Get scroll progress (0 to 1)
          const progress = self.progress;

          // Determine which section we're in
          if (progress < 0.25) {
            // Hero section - auto rotate
            autoRotateRef.current = true;
          } else {
            // Stop auto-rotation after hero
            autoRotateRef.current = false;

            if (progress < 0.5) {
              // Feature section (25-50%)
              const sectionProgress = (progress - 0.25) / 0.25;
              camera.position.lerpVectors(
                new Vector3(...Object.values(CAMERA_POSITIONS.hero)),
                new Vector3(...Object.values(CAMERA_POSITIONS.feature)),
                sectionProgress
              );

              carGroup.rotation.y = gsap.utils.interpolate(
                CAR_ROTATIONS.hero.y,
                CAR_ROTATIONS.feature.y,
                sectionProgress
              );
            } else if (progress < 0.75) {
              // Detail section (50-75%)
              const sectionProgress = (progress - 0.5) / 0.25;
              camera.position.lerpVectors(
                new Vector3(...Object.values(CAMERA_POSITIONS.feature)),
                new Vector3(...Object.values(CAMERA_POSITIONS.detail)),
                sectionProgress
              );

              carGroup.rotation.y = gsap.utils.interpolate(
                CAR_ROTATIONS.feature.y,
                CAR_ROTATIONS.detail.y,
                sectionProgress
              );
            } else {
              // CTA section (75-100%)
              const sectionProgress = (progress - 0.75) / 0.25;
              camera.position.lerpVectors(
                new Vector3(...Object.values(CAMERA_POSITIONS.detail)),
                new Vector3(...Object.values(CAMERA_POSITIONS.ctaEnd)),
                sectionProgress
              );

              carGroup.rotation.y = gsap.utils.interpolate(
                CAR_ROTATIONS.detail.y,
                CAR_ROTATIONS.ctaEnd.y,
                sectionProgress
              );
            }
          }

          // Always look at the car
          camera.lookAt(0, 0.3, 0);
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [camera]);

  const handleModelLoaded = useCallback(() => {
    setIsLoading(false);
    onLoadingComplete?.();
  }, [onLoadingComplete]);

  const handleModelError = useCallback((errorMsg: string) => {
    setError(errorMsg);
    setIsLoading(false);
    onLoadingComplete?.();
  }, [onLoadingComplete]);

  if (error) {
    return (
      <>
        <PerspectiveCamera makeDefault position={[0, 0.5, 3.5]} fov={50} />
        <group ref={groupRef}>
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#e74c3c" />
          </mesh>
        </group>
        <ambientLight intensity={0.8} />
      </>
    );
  }

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.5, 3.5]} fov={50} />
      <group ref={groupRef}>
        <CarModel isLoading={isLoading} onLoaded={handleModelLoaded} onError={handleModelError} />
      </group>

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 10, 7]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Environment HDRI for realistic reflections */}
      <Environment preset="city" intensity={0.8} />
    </>
  );
}

// Wrapper component for the canvas
function CarSceneComponent({ onLoadingComplete }: SceneProps) {


  return (
    <Canvas
      shadows
      style={{ width: '100%', height: '100%' }}
      dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Scene onLoadingComplete={onLoadingComplete} />
    </Canvas>
  );
}

export default memo(CarSceneComponent);
