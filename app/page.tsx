'use client';

import { useRef, useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import DetailSection from '@/components/DetailSection';
import CTASection from '@/components/CTASection';
import LoadingIndicator from '@/components/LoadingIndicator';
import CarScene from '@/components/CarScene';

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

      {/* Fixed 3D Scene Background - positioned absolutely to fill viewport */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none overflow-hidden bg-gradient-to-b from-slate-100 to-slate-50">
        <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full">
          <CarScene onLoadingComplete={handleSceneReady} />
        </div>
      </div>

      {/* Content Sections - stacked on top of canvas */}
      <div className="relative z-10">
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
