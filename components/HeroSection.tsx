'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroSectionProps {
  children: React.ReactNode;
}

export default function HeroSection({ children }: HeroSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero content on mount
    if (contentRef.current) {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
      });
    }

    // Pulsing scroll indicator
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        opacity: 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-white flex items-center justify-center">
      {/* 3D Canvas background */}
      <div className="absolute inset-0">{children}</div>

      {/* Hero content overlay */}
      <div ref={contentRef} className="relative z-10 text-center px-4 md:px-8">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight tracking-tight mb-6">
          Precision <br className="hidden sm:block" /> Engineered
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-light">
          Experience the future of automotive excellence. Built for those who demand more.
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-sm text-gray-500 uppercase tracking-widest font-light">Scroll</span>
        <svg
          className="w-5 h-8 text-gray-400 animate-pulse"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
