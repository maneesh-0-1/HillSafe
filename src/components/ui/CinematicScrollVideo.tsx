'use client';

import React, { useRef, useEffect } from 'react';

interface StageAnnotation {
  range: [number, number];
  tag: string;
  stageName: string;
  category: string;
  metric: string;
  description: string;
}

const STAGES: StageAnnotation[] = [
  {
    range: [0.0, 2.0],
    tag: 'STAGE 01 // EMERGENCE',
    stageName: 'PHYSICAL AIRFRAME',
    category: 'HARDWARE SYSTEM',
    metric: 'UAV STATS: QUAD-ROTOR CARBON FIBER • RTK CENTIMETER ACCURACY',
    description: 'Every site assessment originates with physical presence in complex terrain.',
  },
  {
    range: [2.0, 4.5],
    tag: 'STAGE 02 // SUBASSEMBLY',
    stageName: 'INTERNAL SENSORS & ACTUATORS',
    category: 'MODULAR ARCHITECTURE',
    metric: 'PAYLOAD: DUAL OPTICAL GIMBAL • ONBOARD EDGE COMPUTE • BRUSHLESS STATORS',
    description: 'Precision mechanical assemblies separate into synchronized photogrammetric capture units.',
  },
  {
    range: [4.5, 6.5],
    tag: 'STAGE 03 // AERIAL PASS',
    stageName: '22-ACRE TOPOGRAPHY CAPTURE',
    category: 'ACTIVE SURVEY',
    metric: 'RESOLUTION: 2.14 CM GSD • 80% FORWARD OVERLAP • WIREFRAME SCAN',
    description: 'Centimeter-accurate aerial passes transform rugged hill quarry surfaces into computational data.',
  },
  {
    range: [6.5, 8.5],
    tag: 'STAGE 04 // RECONSTRUCTION',
    stageName: 'DIGITAL SURFACE MODEL',
    category: 'SPATIAL PROCESSING',
    metric: 'TIE-POINTS: 18.45M DENSE CLOUD • MULTI-VIEW STEREO • CONTOURS',
    description: 'Dense point clouds triangulate into digital elevation twins for immediate slope analytics.',
  },
  {
    range: [8.5, 10.0],
    tag: 'STAGE 05 // SYSTEM MATURITY',
    stageName: 'SITE INTELLIGENCE PIPELINE',
    category: 'OPERATIONAL DECISION',
    metric: 'PIPELINE: DRONE → CAPTURE → 3D MESH → TERRAIN → ANALYSIS → DECISION',
    description: 'The physical world is completely unified with computational site forecasting.',
  },
];

export const CinematicScrollVideo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // HUD Direct DOM refs for instant 60fps updates without React re-render overhead
  const timeTickerRef = useRef<HTMLSpanElement>(null);
  const stageTagRef = useRef<HTMLSpanElement>(null);
  const stageCategoryRef = useRef<HTMLSpanElement>(null);
  const stageTitleRef = useRef<HTMLHeadingElement>(null);
  const stageDescRef = useRef<HTMLParagraphElement>(null);
  const stageMetricRef = useRef<HTMLDivElement>(null);
  const scrollProgressTextRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Last stage tracker to avoid redundant DOM innerText sets
  const currentStageIndexRef = useRef(-1);

  useEffect(() => {
    let animId: number;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const tick = () => {
      const container = containerRef.current;
      const videoWrapper = videoWrapperRef.current;
      const video = videoRef.current;

      if (container && videoWrapper && video) {
        const rect = container.getBoundingClientRect();
        const windowH = window.innerHeight;
        const scrollable = rect.height - windowH;

        if (scrollable > 0) {
          // 1. Calculate entrance fade-in as container enters the viewport
          let opacity = 0;
          if (rect.top > windowH) {
            opacity = 0;
          } else if (rect.top > 0) {
            // Fading in as container scrolls into viewport
            opacity = Math.min(1, Math.max(0, (windowH - rect.top) / (windowH * 0.4)));
          } else {
            // Container is pinned (rect.top <= 0)
            opacity = 1.0;
          }

          videoWrapper.style.opacity = opacity.toFixed(3);

          // 2. Calculate scrub progress from 0.0 to 1.0 while pinned
          const scrolled = -rect.top;
          const progress = Math.min(1, Math.max(0, scrolled / scrollable));

          // Subtle cinematic scale from 0.98 to 1.02
          videoWrapper.style.transform = `scale(${(0.98 + progress * 0.02).toFixed(4)})`;

          if (!motionQuery.matches) {
            const duration = video.duration || 10.0;
            const targetTime = progress * duration;

            if (Math.abs(video.currentTime - targetTime) > 0.015) {
              try {
                video.currentTime = targetTime;
              } catch {
                // Ignore transient browser seek errors
              }
            }

            const curTime = video.currentTime;

            // 3. Update HUD ticker
            if (timeTickerRef.current) {
              timeTickerRef.current.textContent = curTime.toFixed(2).padStart(5, '0') + 's';
            }

            // 4. Update progress bar & percentage text
            if (progressBarRef.current) {
              progressBarRef.current.style.width = (progress * 100).toFixed(1) + '%';
            }
            if (scrollProgressTextRef.current) {
              scrollProgressTextRef.current.textContent = `SCROLL PROGRESS: ${Math.round(progress * 100)}%`;
            }

            // 5. Update stage annotations when boundary crossed
            const stageIndex = STAGES.findIndex(
              (s) => curTime >= s.range[0] && curTime < s.range[1]
            );
            const resolvedIndex = stageIndex === -1 ? STAGES.length - 1 : stageIndex;

            if (resolvedIndex !== currentStageIndexRef.current) {
              currentStageIndexRef.current = resolvedIndex;
              const stage = STAGES[resolvedIndex];

              if (stageTagRef.current) stageTagRef.current.textContent = stage.tag;
              if (stageCategoryRef.current) stageCategoryRef.current.textContent = stage.category;
              if (stageTitleRef.current) stageTitleRef.current.textContent = stage.stageName;
              if (stageDescRef.current) stageDescRef.current.textContent = stage.description;
              if (stageMetricRef.current) stageMetricRef.current.textContent = stage.metric;
            }
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      ref={containerRef}
      id="cinematic-journey"
      className="relative w-full h-[280vh] bg-space-950 z-20"
      aria-label="Cinematic Drone and Terrain Journey"
    >
      {/* Sticky Fullscreen Cinematic Viewport (100vh) */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Subtle Backdrop Darkening Grid */}
        <div className="absolute inset-0 bg-space-950 pointer-events-none" />

        {/* 1. Main Cinematic Video Player */}
        <div
          ref={videoWrapperRef}
          className="relative w-full h-full max-w-[1920px] mx-auto flex items-center justify-center transition-opacity duration-150 will-change-transform"
          style={{ opacity: 0, transform: 'scale(0.98)' }}
        >
          <video
            ref={videoRef}
            src="/videos/hill_safe_cinematic.mp4"
            poster="/images/cinematic_poster.jpg"
            preload="metadata"
            muted
            playsInline
            controls={false}
            className="w-full h-full object-cover object-center select-none"
            aria-hidden="true"
          />

          {/* Cinematic Letterbox Framing & Subtle Edge Feathering */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(5,7,10,0.85)]" />
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-space-950 via-space-950/70 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-space-950 via-space-950/80 to-transparent pointer-events-none" />

          {/* 2. Micro Monospace Technical HUD Overlays (Padded cleanly below global navbar) */}
          <div className="absolute inset-0 pt-24 sm:pt-28 pb-8 px-6 sm:px-12 flex flex-col justify-between pointer-events-none z-30">
            {/* Top Technical Metadata Bar */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 pointer-events-auto">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-2 h-2 rounded-full bg-terrain-green animate-ping-slow" />
                <span className="px-2.5 py-1 rounded bg-space-900/90 border border-white/10 text-terrain-green font-semibold tracking-wider uppercase backdrop-blur-md">
                  PHYSICAL REALITY TIMELINE
                </span>
                <span className="hidden sm:inline text-slate-400 font-mono">
                  REF: CINEMATIC-HS-V1
                </span>
              </div>

              {/* Realtime Video Timestamp Ticker */}
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded bg-space-900/90 border border-white/10 font-mono text-slate-200 text-xs backdrop-blur-md">
                  <span ref={timeTickerRef} className="text-terrain-green font-bold">
                    00.00s
                  </span>
                  <span className="text-slate-600 mx-1">/</span>
                  <span className="text-slate-400">10.00s</span>
                </div>
                <div className="hidden md:block text-[10px] text-slate-400 font-mono tracking-wider">
                  24.0 FPS • H.264 HD
                </div>
              </div>
            </div>

            {/* Mid-Screen Aerospace Crosshair & Corner Accents */}
            <div className="relative w-full my-auto pointer-events-none flex justify-between items-center opacity-40">
              <div className="w-8 h-8 border-t-2 border-l-2 border-terrain-green/60" />
              <div className="w-8 h-8 border-t-2 border-r-2 border-terrain-green/60" />
            </div>

            {/* Bottom Story & Sensor Intelligence Annotation Card */}
            <div className="max-w-2xl bg-space-950/85 backdrop-blur-md p-4 sm:p-6 rounded-lg border border-white/15 space-y-3 pointer-events-auto shadow-2xl transition-all duration-300">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-terrain-green" />
                  <span
                    ref={stageTagRef}
                    className="text-xs font-mono font-semibold text-terrain-green tracking-widest uppercase"
                  >
                    {STAGES[0].tag}
                  </span>
                </div>
                <span
                  ref={stageCategoryRef}
                  className="text-[10px] font-mono text-telemetry-blue uppercase tracking-wider px-2 py-0.5 rounded bg-telemetry-blue/10 border border-telemetry-blue/20"
                >
                  {STAGES[0].category}
                </span>
              </div>

              <div className="space-y-1">
                <h3
                  ref={stageTitleRef}
                  className="font-display font-bold text-lg sm:text-2xl text-white tracking-tight"
                >
                  {STAGES[0].stageName}
                </h3>
                <p
                  ref={stageDescRef}
                  className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed"
                >
                  {STAGES[0].description}
                </p>
              </div>

              {/* Dynamic Technical Metric */}
              <div className="pt-1 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-slate-400">
                <div ref={stageMetricRef} className="text-slate-300">
                  {STAGES[0].metric}
                </div>
                <div ref={scrollProgressTextRef} className="text-terrain-green font-semibold">
                  SCROLL PROGRESS: 0%
                </div>
              </div>

              {/* Interactive Scrub Progress Bar */}
              <div className="w-full bg-space-900 h-1.5 rounded-full overflow-hidden border border-white/10">
                <div
                  ref={progressBarRef}
                  className="bg-gradient-to-r from-terrain-green via-telemetry-blue to-radar-amber h-full transition-all duration-75"
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
