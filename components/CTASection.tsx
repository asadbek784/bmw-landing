'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Button } from './ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // Animate CTA content
    gsap.fromTo(
      contentRef.current.querySelectorAll('h2, p, button'),
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
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
      className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center py-20 px-4 md:px-8"
    >
      <div
        ref={contentRef}
        className="max-w-3xl mx-auto w-full text-center space-y-8 z-10 relative"
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight">
          Ready for <br /> The Next Drive
        </h2>

        <p className="text-xl text-gray-700 font-light leading-relaxed">
          Experience the future of automotive engineering. Schedule your exclusive test drive
          today and discover what precision truly means.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 cursor-pointer"
          >
            Book a Test Drive
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-gray-800 text-gray-800 hover:bg-gray-50 font-semibold px-8 py-3 rounded-lg transition-all duration-300 cursor-pointer"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-8 w-full text-center text-sm text-gray-500 space-y-2">
        <p>© 2024 Precision Engineered. All rights reserved.</p>
        <div className="flex items-center justify-center gap-6 text-xs">
          <a href="#" className="hover:text-gray-700 transition">
            Privacy
          </a>
          <a href="#" className="hover:text-gray-700 transition">
            Terms
          </a>
          <a href="#" className="hover:text-gray-700 transition">
            Contact
          </a>
        </div>
      </footer>
    </section>
  );
}
