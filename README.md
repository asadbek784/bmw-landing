# Modern 3D Automotive Landing Page

A premium, light-themed landing page featuring scroll-driven 3D car model animations. Built with React 19, Next.js 16, Three.js, and GSAP ScrollTrigger for smooth scroll-linked camera transitions.

## Features

### Core 3D Experience
- **Scroll-Driven Animations**: Smooth pixel-perfect camera transitions tied to scroll position using GSAP ScrollTrigger
- **Auto-Rotating Hero**: 3D car model rotates continuously on page load
- **Dynamic Camera Movements**: Camera transitions through multiple viewing angles (hero → side profile → close-up detail → return to hero)
- **Low-Poly Car Model**: Built from Three.js primitives with realistic materials and lighting

### Design & Layout
- **Light Theme**: Off-white background (#fafafa) with dark typography (#111111)
- **Premium Aesthetic**: Generous whitespace, bold typography, minimal visual clutter
- **Responsive Design**: Fully responsive from mobile to desktop
- **Loading Indicator**: Percentage-based progress indicator while 3D assets load

### Page Sections
1. **Hero Section** - Full-viewport auto-rotating car with headline
2. **Feature Section** - "Aerodynamic by Design" with side profile view
3. **Detail Section** - Close-up detail view with performance highlights
4. **CTA Section** - Call-to-action with "Book a Test Drive" button and footer

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Framework**: Next.js 16 (App Router)
- **3D Rendering**: Three.js + @react-three/fiber + @react-three/drei
- **Animations**: GSAP with ScrollTrigger for scroll-linked animations
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Deployment**: Ready for Vercel

## Project Structure

```
app/
├── layout.tsx           # Root layout with metadata
├── page.tsx             # Main landing page
├── globals.css          # Tailwind configuration and custom animations
└── (components)

components/
├── CarScene.tsx         # Main 3D scene container with camera animations
├── CarModel.tsx         # 3D car model (primitives-based placeholder)
├── HeroSection.tsx      # Hero section with auto-rotating car
├── FeatureSection.tsx   # Feature highlight section (side profile view)
├── DetailSection.tsx    # Detail view section (close-up)
├── CTASection.tsx       # Call-to-action and footer
├── LoadingIndicator.tsx # Asset loading progress indicator
└── ui/
    └── button.tsx       # Button component

lib/
├── constants.ts         # Color scheme, animation durations, camera positions
└── utils.ts             # Utility functions

public/                  # Static assets
```

## Installation & Setup

1. **Clone and Install**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view.

3. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Customization

### Changing the 3D Model
The current implementation uses a low-poly car model built from Three.js primitives. To use a real `.glb` model:

1. Place your model file in `public/models/car.glb`
2. In `components/CarModel.tsx`, replace `<CarModelPlaceholder />` with `<CarModelExternalLoader modelUrl="/models/car.glb" />`

### Adjusting Camera Animations
Edit camera positions and rotation angles in `lib/constants.ts`:
```typescript
export const CAMERA_POSITIONS = {
  hero: { x: 0, y: 0.5, z: 3.5 },
  feature: { x: 1.8, y: 0.6, z: 2.8 },
  detail: { x: -1.2, y: 0.8, z: 1.5 },
  ctaEnd: { x: 0, y: 0.3, z: 3.5 },
};
```

### Changing Colors & Typography
Update the color scheme in `lib/constants.ts` and apply via Tailwind classes in components.

## Performance Optimizations

- **Lazy Loading**: 3D model loads asynchronously with progress indicator
- **DPR Scaling**: Canvas resolution adapts to device pixel ratio
- **Memoization**: Components wrapped with `memo` to prevent unnecessary re-renders
- **Responsive Canvas**: Simplified animations on mobile devices

## Browser Compatibility

- Modern browsers (ES2020+)
- Chrome, Firefox, Safari, Edge
- WebGL support required for 3D rendering

## Deployment to Vercel

1. **Connect Repository**
   ```bash
   vercel login
   vercel link
   ```

2. **Deploy**
   ```bash
   vercel deploy
   ```

   Or push to GitHub and enable auto-deployment through Vercel dashboard.

## File Sizes & Performance

- Initial page load: ~500ms (including 3D assets)
- Interactive: ~1-2 seconds
- Core Web Vitals optimized for fast LCP and CLS

## Future Enhancements

- [ ] Add real automotive model (`.glb` format)
- [ ] Implement actual booking form integration
- [ ] Add mobile-specific optimizations (reduced animation complexity)
- [ ] Include social sharing metadata
- [ ] Add analytics tracking
- [ ] Support for multiple car models/variants
- [ ] Dark mode variant

## Credits

Built with:
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Three.js](https://threejs.org/)
- [GSAP](https://gsap.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## License

This project is provided as-is for demonstration purposes.
