'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeatureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // Animate text content as it comes into view
    gsap.fromTo(
      contentRef.current.querySelectorAll('h2, p'),
      {
        opacity: 0,
        x: 30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white flex items-center py-20 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - 3D model is here (full page canvas) */}
          <div className="hidden md:block" />

          {/* Right side - Content */}
          <div ref={contentRef} className="space-y-6">
            <div className="inline-block">
              <div className="h-1 w-12 bg-blue-600 rounded-full mb-4" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
              Aerodynamic by Design
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed font-light">
              Every curve is intentional. Our engineering team spent thousands of hours perfecting
              the aerodynamic profile, reducing drag coefficient to industry-leading levels while
              maintaining an aggressive, purposeful stance.
            </p>

            <ul className="space-y-3 pt-4">
              {[
                'Optimized airflow reduces fuel consumption',
                'Enhanced stability at high speeds',
                'Premium paint finish with ceramic coating',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span className="text-gray-700 font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
