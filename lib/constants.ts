// Color scheme for the landing page
export const COLORS = {
  background: '#fafafa',
  text: '#111111',
  accent: '#1e3a8a', // Deep blue
  accentRed: '#dc2626',
  white: '#ffffff',
  lightGray: '#f3f4f6',
  darkGray: '#4b5563',
} as const;

// Typography scale
export const TYPOGRAPHY = {
  // Hero heading
  h1: 'text-5xl md:text-6xl lg:text-7xl font-bold leading-tight',
  // Section heading
  h2: 'text-4xl md:text-5xl font-bold leading-tight',
  // Subheading
  h3: 'text-2xl md:text-3xl font-semibold leading-relaxed',
  // Body text
  body: 'text-lg md:text-xl leading-relaxed font-regular',
  // Small text
  small: 'text-sm md:text-base leading-relaxed',
} as const;

// Animation durations and easing
export const ANIMATION = {
  scrollDuration: 0.3,
  textStagger: 0.1,
  easingFunction: 'power2.inOut',
} as const;

// Scroll section breakpoints (as percentages of total page height)
export const SCROLL_SECTIONS = {
  hero: { start: 0, end: 0.25 },
  feature: { start: 0.25, end: 0.5 },
  detail: { start: 0.5, end: 0.75 },
  cta: { start: 0.75, end: 1 },
} as const;

// Camera positions for different scroll states
export const CAMERA_POSITIONS = {
  hero: { x: 0, y: 0.5, z: 3.5 },
  feature: { x: 1.8, y: 0.6, z: 2.8 },
  detail: { x: -1.2, y: 0.8, z: 1.5 },
  ctaEnd: { x: 0, y: 0.3, z: 3.5 },
} as const;

// Car model rotation angles
export const CAR_ROTATIONS = {
  hero: { x: 0, y: 0, z: 0 },
  feature: { x: 0, y: 0.3, z: 0 },
  detail: { x: 0, y: 0.5, z: 0 },
  ctaEnd: { x: 0, y: 0, z: 0 },
} as const;
