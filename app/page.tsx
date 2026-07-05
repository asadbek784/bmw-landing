'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import DetailSection from '@/components/DetailSection';
import CTASection from '@/components/CTASection';
import LoadingIndicator from '@/components/LoadingIndicator';
import CanvasErrorBoundary from '@/components/CanvasErrorBoundary';

const CarScene = dynamic(() => import('@/components/CarScene'), {
  ssr: false,
});

export default function Page() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-hide loading indicator after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSceneReady = () => {
    setIsLoading(false);
  };

  return (
    <main className="relative w-full bg-white overflow-x-hidden">
      {/* Loading Indicator */}
      <LoadingIndicator visible={isLoading} />

      {/* Fixed 3D Scene Background */}
      <div className="fixed top-0 left-0 w-screen h-screen z-0 overflow-hidden bg-gradient-to-b from-slate-100 to-slate-50">
        <CanvasErrorBoundary>
          <CarScene onLoadingComplete={handleSceneReady} />
        </CanvasErrorBoundary>
      </div>

      {/* Content Sections - stacked on top of canvas */}
      <div className="relative z-10" style={{ position: 'relative', pointerEvents: 'auto' }}>
        {/* Hero Section */}
        <HeroSection>
          {/* 3D Canvas fills background */}
        </HeroSection>

        {/* Feature Section */}
        <FeatureSection />

        {/* Detail Section */}
        <DetailSection />

        {/* CTA Section */}
        <CTASection />
      </div>
    </main>
  );
}
