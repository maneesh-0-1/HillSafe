'use client';

import React from 'react';
import { DRONE_ANNOTATIONS, APPLICATION_MODULES, SITE_METADATA } from '@/src/lib/constants';
import { AnalyticalLayer } from '@/src/lib/types';
import { DataComparisonSlider } from './DataComparisonSlider';
import { RoadmapIndicator } from './RoadmapIndicator';
import { ContactForm } from './ContactForm';
import { CinematicScrollVideo } from './CinematicScrollVideo';

interface ScrollScenesOverlayProps {
  scrollProgress: number; // 0.0 to 1.0
  activeLayer: AnalyticalLayer;
  setActiveLayer: (layer: AnalyticalLayer) => void;
  onOpenFieldTestModal: () => void;
}

export const ScrollScenesOverlay: React.FC<ScrollScenesOverlayProps> = ({
  scrollProgress,
  activeLayer,
  setActiveLayer,
  onOpenFieldTestModal,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative z-10 w-full pointer-events-auto">
      {/* ========================================================================= */}
      {/* SCENE 01: HERO (0 - 12%) */}
      {/* ========================================================================= */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-between pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {/* Top Technical Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-terrain-green/10 border border-terrain-green/20 text-terrain-green">
              <span className="w-1.5 h-1.5 rounded-full bg-terrain-green animate-ping-slow" />
              SYSTEM ACTIVE: MISSION RUN 01
            </span>
            <span className="hidden sm:inline text-slate-500">
              COORDINATES: {SITE_METADATA.coordinates}
            </span>
          </div>
          <div className="text-right text-slate-500 hidden sm:block">
            REF: HS-UAV-DEM-V1 • STEEP TERRAIN CAPTURE
          </div>
        </div>

        {/* Center Editorial Hero Content */}
        <div className="my-auto max-w-3xl space-y-6 pt-12 sm:pt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-900/80 border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-terrain-green" />
            <span>DRONE-BASED SITE INTELLIGENCE</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
            Turning Physical Landscapes into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terrain-green via-white to-telemetry-blue">
              Digital Site Intelligence.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-xl font-normal leading-relaxed max-w-2xl font-sans">
            Hill Safe is developing drone-based technology for mapping, monitoring and analysing terrain and construction sites through aerial imaging, 3D reconstruction and physics-informed intelligence.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => scrollTo('technology')}
              className="px-6 py-3.5 rounded bg-terrain-green text-space-950 font-display font-semibold text-sm tracking-wide uppercase hover:bg-[#1cfda9] active:scale-95 transition-all shadow-[0_0_20px_rgba(0,245,155,0.3)]"
            >
              Explore the Technology
            </button>
            <button
              onClick={() => scrollTo('prototype')}
              className="px-6 py-3.5 rounded bg-space-900/80 text-white border border-white/15 font-display font-semibold text-sm tracking-wide uppercase hover:border-terrain-green hover:text-terrain-green transition-all backdrop-blur-md"
            >
              See Our Prototype
            </button>
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="flex items-center justify-between pt-8 border-t border-white/5 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 border border-slate-500 rounded-full animate-bounce" />
            <span className="tracking-widest uppercase">SCROLL TO EXPLORE THE JOURNEY</span>
          </div>
          <div className="text-[11px] text-slate-500 hidden sm:block">
            01 / 11 • EMERGENCE
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCENE 02: THE DRONE & EXPLODED VIEW (12 - 25%) */}
      {/* ========================================================================= */}
      <section
        id="technology"
        className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Narrative Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-terrain-green">
              <span>02</span>
              <span>—</span>
              <span className="tracking-widest uppercase">THE HARDWARE INTERFACE</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white leading-tight">
              Purpose-Built for Difficult Terrain.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Hill Safe deploys an aerospace-grade modular carbon airframe with redundant propulsion, RTK centimeter-positioning, and synchronized multi-spectral sensors.
            </p>

            <div className="p-4 rounded-lg bg-space-900/80 border border-white/10 text-xs font-mono text-slate-400 space-y-2">
              <div className="text-white font-semibold uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-terrain-green rounded-full" />
                Exploded Architecture Sequence:
              </div>
              <p className="text-[11px] leading-relaxed">
                As you scroll, the UAV separates along local mechanical axes. This physical machine is how Hill Safe captures the complex contours of the real world.
              </p>
            </div>
          </div>

          {/* Right Subassembly Callout Cards */}
          <div className="lg:col-span-7 space-y-3">
            {DRONE_ANNOTATIONS.map((anno) => (
              <div
                key={anno.id}
                className="glass-panel p-3.5 sm:p-4 rounded-lg border border-white/10 hover:border-terrain-green/40 transition-all text-left"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display font-semibold text-xs sm:text-sm text-white">
                    {anno.name}
                  </span>
                  <span className="text-[10px] font-mono text-terrain-green px-1.5 py-0.5 rounded bg-terrain-green/10">
                    SUBASSEMBLY
                  </span>
                </div>
                <div className="text-[11px] font-mono text-telemetry-blue mb-1">
                  {anno.spec}
                </div>
                <p className="text-[11px] text-slate-400 font-sans leading-snug">
                  {anno.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative Bridge into the Physical Cinematic Experience */}
        <div className="pt-16 pb-4 text-center max-w-xl mx-auto space-y-2 border-t border-white/5 mt-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-terrain-green tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-terrain-green animate-pulse" />
            <span>THE PHYSICAL WORLD // EVERY SITE BEGINS WITH REALITY</span>
          </div>
          <p className="text-xs font-mono text-slate-400">
            Scroll to scrub through the 10-second aerial capture mission timeline.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CINEMATIC TIMELINE: 10-SECOND SCROLL-CONTROLLED VIDEO JOURNEY */}
      {/* ========================================================================= */}
      <CinematicScrollVideo />

      {/* ========================================================================= */}
      {/* SCENE 03: CAPTURE & CONTEXT */}
      {/* ========================================================================= */}
      <section
        id="capture"
        className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24"
      >
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-terrain-green">
            <span>03</span>
            <span>—</span>
            <span className="tracking-widest uppercase">FROM CAPTURE TO CONTEXT</span>
          </div>

          <h2 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight">
            CAPTURE
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
            Centimeter-accurate aerial passes generate hundreds of high-overlap nadir and oblique image frames, transforming physical topology into structured computational data streams.
          </p>

          {/* Visual Transformation Flow Bar */}
          <div className="p-4 rounded-lg bg-space-950/80 border border-white/10 font-mono text-xs text-slate-300 space-y-3">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest">
              CAPTURE TRANSFORMATION CONTINUUM:
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2 py-1 rounded bg-space-900 border border-white/10 text-white font-semibold">
                DRONE SENSOR
              </span>
              <span className="text-terrain-green">→</span>
              <span className="px-2 py-1 rounded bg-space-900 border border-white/10 text-white font-semibold">
                OVERLAPPING FRAMES
              </span>
              <span className="text-terrain-green">→</span>
              <span className="px-2 py-1 rounded bg-terrain-green/10 border border-terrain-green/30 text-terrain-green font-semibold">
                MULTI-PERSPECTIVE DATA
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-[10px] text-slate-400">
              <div>FORWARD OVERLAP: <span className="text-white">80%</span></div>
              <div>SIDE LAP: <span className="text-white">70%</span></div>
              <div>GIMBAL PITCH: <span className="text-white">-30° to -90°</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCENE 04: MAP (38 - 52%) */}
      {/* ========================================================================= */}
      <section
        id="map"
        className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-telemetry-blue">
              <span>04</span>
              <span>—</span>
              <span className="tracking-widest uppercase">SPATIAL RECONSTRUCTION</span>
            </div>

            <h2 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight">
              MAP
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
              Aerial imagery is mathematically processed into spatial representations of the physical site. Feature matching extracts millions of tie-points, forming an analytical 3D point cloud that triangulates into a high-density digital surface model.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3 bg-space-950 rounded border border-white/10">
                <div className="text-[10px] text-slate-500 uppercase">TIE-POINTS</div>
                <div className="text-base font-bold text-white mt-0.5">18.45M</div>
              </div>
              <div className="p-3 bg-space-950 rounded border border-white/10">
                <div className="text-[10px] text-slate-500 uppercase">GSD</div>
                <div className="text-base font-bold text-terrain-green mt-0.5">2.14 cm</div>
              </div>
              <div className="p-3 bg-space-950 rounded border border-white/10">
                <div className="text-[10px] text-slate-500 uppercase">VERTICES</div>
                <div className="text-base font-bold text-telemetry-blue mt-0.5">64×64 Grid</div>
              </div>
              <div className="p-3 bg-space-950 rounded border border-white/10">
                <div className="text-[10px] text-slate-500 uppercase">PROCESSING</div>
                <div className="text-base font-bold text-white mt-0.5">SfM + MVS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCENE 05: TERRAIN INTELLIGENCE (52 - 68%) */}
      {/* ========================================================================= */}
      <section
        id="analyse"
        className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24"
      >
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-terrain-green">
            <span>05</span>
            <span>—</span>
            <span className="tracking-widest uppercase">MULTIDIMENSIONAL ANALYTICS</span>
          </div>

          <h2 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight">
            ANALYSE
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
            Terrain characteristics become measurable, multi-dimensional intelligence layers. Inspect elevation contours, slope gradients, hydrological runoffs, and physical site boundaries in real time.
          </p>

          {/* Interactive Layer Switches */}
          <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>ACTIVE ANALYTICAL LAYER SELECTOR</span>
              <span className="text-terrain-green font-semibold">CLICK TO TOGGLE 3D SHADER</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
              {[
                { id: 'elevation', label: '01. ELEVATION', desc: 'Hypsometric bands' },
                { id: 'slope', label: '02. SLOPE', desc: 'Steepness grade' },
                { id: 'drainage', label: '03. DRAINAGE', desc: 'Runoff channels' },
                { id: 'boundary', label: '04. BOUNDARY', desc: 'Cadastral bounds' },
                { id: 'delta', label: '05. CHANGE DELTA', desc: 'Repeat monitor' },
              ].map((layer) => {
                const isActive = activeLayer === layer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id as AnalyticalLayer)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${isActive
                        ? 'border-terrain-green bg-terrain-green/15 text-white shadow-[0_0_15px_rgba(0,245,155,0.25)]'
                        : 'border-white/10 bg-space-950/60 text-slate-400 hover:text-slate-200 hover:border-white/20'
                      }`}
                  >
                    <div className="font-semibold text-[11px] mb-0.5">{layer.label}</div>
                    <div className="text-[9px] text-slate-500">{layer.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCENE 06: PHYSICS-INFORMED INTELLIGENCE / PINN (68 - 80%) */}
      {/* ========================================================================= */}
      <section
        id="pinn"
        className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-telemetry-blue">06 — RESEARCH INITIATIVE</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-radar-amber/10 text-radar-amber border border-radar-amber/30 uppercase font-semibold">
                R&D / UNDER DEVELOPMENT
              </span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white leading-tight">
              Physics-Informed Neural Networks.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Hill Safe is researching Physics-Informed Neural Networks (PINNs) to combine empirical aerial observations with physical governing laws — embedding soil shear stress, rainfall pore pressure, and slope mechanics directly into the computational loss function.
            </p>

            {/* Neural Formula Continuum */}
            <div className="glass-panel p-4 rounded-lg border border-white/10 font-mono text-xs space-y-2">
              <div className="text-slate-400 text-[10px] uppercase">
                GOVERNING RELATIONSHIP ARCHITECTURE:
              </div>
              <div className="text-white text-xs sm:text-sm font-semibold flex flex-wrap items-center gap-1.5">
                <span className="text-telemetry-blue">PHYSICAL PARAMETERS</span>
                <span className="text-slate-500">×</span>
                <span className="text-terrain-green">OBSERVED DATA</span>
                <span className="text-slate-500">×</span>
                <span className="text-radar-amber">MACHINE LEARNING</span>
              </div>
              <div className="text-terrain-green text-[11px] pt-1">
                ↓ PHYSICS-INFORMED MODEL → TERRAIN & STABILITY INTELLIGENCE
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-500">
              * Research phase. Not currently marketed as an approved landslide prediction or certified geotechnical replacement.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCENE 07: FROM PROTOTYPE TO FIELD (80 - 88%) */}
      {/* ========================================================================= */}
      <section
        id="prototype"
        className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-terrain-green">07 — EMPIRICAL VALIDATION</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-terrain-green/10 text-terrain-green border border-terrain-green/30 uppercase font-semibold">
              REAL FIELD EXPEDITION
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white">
            From Prototype to Field: 22-Acre Site Validation.
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl font-sans">
            Hill Safe completed an end-to-end field test over a 22-acre active civil construction corridor to evaluate automated UAV capture, high-overlap exposure stability, photogrammetric reconstruction pipelines, and terrain visualization.
          </p>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="glass-panel p-4 rounded-lg">
              <div className="text-[10px] font-mono text-slate-500">AREA COVERED</div>
              <div className="font-display font-bold text-xl sm:text-2xl text-white mt-1">22 ACRES</div>
              <div className="text-[10px] font-mono text-slate-400">89,030 m² footprint</div>
            </div>
            <div className="glass-panel p-4 rounded-lg">
              <div className="text-[10px] font-mono text-slate-500">FLIGHT ALTITUDE</div>
              <div className="font-display font-bold text-xl sm:text-2xl text-terrain-green mt-1">85 METERS</div>
              <div className="text-[10px] font-mono text-slate-400">Above Ground Level (AGL)</div>
            </div>
            <div className="glass-panel p-4 rounded-lg">
              <div className="text-[10px] font-mono text-slate-500">FRAMES INGESTED</div>
              <div className="font-display font-bold text-xl sm:text-2xl text-white mt-1">428 TILES</div>
              <div className="text-[10px] font-mono text-slate-400">Sony CMOS Sensor</div>
            </div>
            <div className="glass-panel p-4 rounded-lg">
              <div className="text-[10px] font-mono text-slate-500">RESOLUTION (GSD)</div>
              <div className="font-display font-bold text-xl sm:text-2xl text-telemetry-blue mt-1">2.14 CM/PX</div>
              <div className="text-[10px] font-mono text-slate-400">Ground pixel pitch</div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenFieldTestModal}
              className="px-5 py-3 rounded bg-white/10 hover:bg-terrain-green hover:text-space-950 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all border border-white/15"
            >
              Inspect Complete Field Log & Telemetry →
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCENE 08: EXPLORE OUR DATA (88 - 93%) */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24">
        <div className="space-y-4 mb-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-terrain-green">
            <span>08</span>
            <span>—</span>
            <span className="tracking-widest uppercase">SPATIAL DATA TOOL</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white">
            Explore Our Data.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
            Interact with our dual-stream comparison tool. Compare raw orthomosaic imagery against calibrated 3D terrain meshes and derived slope vector layers.
          </p>
        </div>

        {/* Embedded Interactive Draggable Split-Screen Slider */}
        <DataComparisonSlider />
      </section>

      {/* ========================================================================= */}
      {/* SCENE 09: APPLICATIONS (93 - 96%) */}
      {/* ========================================================================= */}
      <section
        id="applications"
        className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24"
      >
        <div className="space-y-6 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-terrain-green">
            <span>09</span>
            <span>—</span>
            <span className="tracking-widest uppercase">COMMERCIAL & R&D VERTICALS</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white">
            Application Pathways.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl font-sans">
            Hill Safe&apos;s site intelligence architecture is designed to address complex elevation dynamics across infrastructure lifecycle stages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {APPLICATION_MODULES.map((mod) => (
            <div
              key={mod.id}
              className="glass-panel p-6 rounded-xl border border-white/10 hover:border-terrain-green/40 transition-all space-y-4 text-left"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-500 font-bold">{mod.id}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${mod.badge.includes('ACTIVE') || mod.badge.includes('FIELD')
                      ? 'bg-terrain-green/10 text-terrain-green border border-terrain-green/20'
                      : 'bg-radar-amber/10 text-radar-amber border border-radar-amber/20'
                    }`}
                >
                  {mod.badge}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-white">{mod.title}</h3>

              <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed">
                {mod.description}
              </p>

              <div className="pt-2 border-t border-white/5">
                <div className="text-[10px] font-mono text-slate-500 uppercase mb-2">Capabilities:</div>
                <div className="grid grid-cols-2 gap-1.5 text-xs font-mono text-slate-300">
                  {mod.features.map((f) => (
                    <div key={f} className="flex items-center gap-1.5">
                      <span className="text-terrain-green text-[10px]">■</span>
                      <span className="text-[11px]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCENE 10: WHY HILL SAFE / REASSEMBLY (96 - 98%) */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-terrain-green">
            <span>10</span>
            <span>—</span>
            <span className="tracking-widest uppercase">THE COMPLETE SYSTEM</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white">
            Why Hill Safe.
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            As the exploded components smoothly reunify into one whole machine, the physical UAV and digital spatial algorithms become a single closed cyber-physical loop.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs pt-2">
            {[
              { title: 'DRONE-FIRST', desc: 'Built for high altitude and steep wind' },
              { title: 'MODULAR PAYLOAD', desc: 'Optical, LiDAR, and thermal flexibility' },
              { title: 'PHYSICS + AI', desc: 'Grounding computer vision in soil physics' },
              { title: 'STEEP TERRAIN', desc: 'Engineered where terrestrial survey fails' },
              { title: 'REPEAT CAPTURE', desc: 'Time-series spatial difference audits' },
              { title: 'PROTOTYPE READY', desc: 'Actively validating in real field tests' },
            ].map((item) => (
              <div key={item.title} className="p-3 bg-space-950/80 rounded border border-white/10">
                <div className="text-terrain-green font-bold text-xs">{item.title}</div>
                <div className="text-[10px] text-slate-400 mt-1 leading-snug">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCENE 11: FINAL CONVERSION & MATURITY (98 - 100%) */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-900 border border-white/10 text-xs font-mono text-terrain-green">
            <span>11 — CONVERSION</span>
          </div>

          <h2 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight">
            Drone-Based Intelligence for the Physical World.
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-sans leading-relaxed">
            Hill Safe is pioneering modern site intelligence. Transparent engineering, empirical field validation, and physics-driven vision for civil infrastructure.
          </p>
        </div>

        {/* Engineering Readiness Roadmap */}
        <RoadmapIndicator />

        {/* Interactive Site Assessment Contact Form */}
        <ContactForm />
      </section>
    </div>
  );
};
