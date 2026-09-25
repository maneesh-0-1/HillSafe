'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/src/components/ui/Navbar';
import { ScrollScenesOverlay } from '@/src/components/ui/ScrollScenesOverlay';
import { Footer } from '@/src/components/ui/Footer';
import { FieldTestModal } from '@/src/components/ui/FieldTestModal';
import { AnalyticalLayer } from '@/src/lib/types';
import Lenis from 'lenis';

// Dynamically import SceneManager to prevent SSR issues with WebGL / Canvas
const SceneManager = dynamic(
  () => import('@/src/components/canvas/SceneManager').then((mod) => mod.SceneManager),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-0 bg-space-950 flex items-center justify-center pointer-events-none">
        <div className="text-center font-mono text-xs text-terrain-green tracking-widest animate-pulse">
          INITIALIZING SPATIAL SCENE...
        </div>
      </div>
    ),
  }
);

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeLayer, setActiveLayer] = useState<AnalyticalLayer>('elevation');
  const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.8,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // 2. Continuous scroll progress calculation (0.0 to 1.0)
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Determine current active scene name for telemetry HUD
  const getSceneLabel = (p: number) => {
    if (p < 0.10) return '01: EMERGENCE';
    if (p < 0.20) return '02: UAV PLATFORM';
    if (p < 0.32) return '03: CINEMATIC REALITY';
    if (p < 0.44) return '04: AERIAL CAPTURE';
    if (p < 0.56) return '05: SPATIAL MAP';
    if (p < 0.70) return '06: TERRAIN ANALYTICS';
    if (p < 0.82) return '07: PINN RESEARCH';
    if (p < 0.89) return '08: FIELD VALIDATION';
    if (p < 0.94) return '09: DATA INSPECTOR';
    if (p < 0.97) return '10: APPLICATIONS';
    return '11: CONVERSION & IMC';
  };

  return (
    <main className="relative bg-space-950 text-slate-100 min-h-screen overflow-x-clip">
      {/* 1. Global Navigation Bar */}
      <Navbar
        currentScroll={scrollProgress}
        onRequestAssessment={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Persistent 3D Three.js / React Three Fiber Background Canvas */}
      <SceneManager scrollProgress={scrollProgress} activeLayer={activeLayer} />

      {/* 3. Subtle Aerospace Background Grid & Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-tech-grid opacity-25" />
      <div className="fixed inset-0 pointer-events-none z-[1] bg-radial-vignette opacity-80" />

      {/* 4. 11-Scene Continuous Scroll Storytelling DOM Content */}
      <ScrollScenesOverlay
        scrollProgress={scrollProgress}
        activeLayer={activeLayer}
        setActiveLayer={setActiveLayer}
        onOpenFieldTestModal={() => setIsFieldModalOpen(true)}
      />

      {/* 5. Enterprise Deep-Tech Footer & IMC Banner */}
      <Footer />

      {/* 6. Documentary 22-Acre Field Validation Modal */}
      <FieldTestModal
        isOpen={isFieldModalOpen}
        onClose={() => setIsFieldModalOpen(false)}
      />

      {/* 7. Floating Antigravity Telemetry HUD Widget */}
      <aside aria-label="Flight Telemetry HUD" className="fixed bottom-5 right-5 z-40 hidden sm:flex items-center gap-3 glass-panel px-3.5 py-2 rounded-full border border-white/10 shadow-2xl backdrop-blur-xl pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-terrain-green animate-ping-slow" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300">
            {getSceneLabel(scrollProgress)}
          </span>
        </div>
        <span className="text-slate-600 font-mono text-[10px]">|</span>
        <div className="text-[10px] font-mono text-terrain-green font-semibold">
          {Math.round(scrollProgress * 100)}% FLIGHT LOG
        </div>
      </aside>
    </main>
  );
}
