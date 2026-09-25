'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';

export const DataComparisonSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage
  const [comparisonMode, setComparisonMode] = useState<'capture-vs-mesh' | 'mesh-vs-analysis'>('capture-vs-mesh');
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(rect.width, x));
    const percentage = (clampedX / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <div id="data-slider" className="w-full glass-panel rounded-xl p-5 sm:p-7 border border-white/10 my-10 relative">
      {/* Header and Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-white/10 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-terrain-green" />
            <span className="text-xs font-mono tracking-widest uppercase text-slate-400">
              GEOSPATIAL COMPARISON ENGINE
            </span>
          </div>
          <h3 className="font-display font-semibold text-lg text-white">
            Dual-Stream Spatial Verification Tool
          </h3>
        </div>

        {/* Comparison Mode Toggles */}
        <div className="flex items-center bg-space-950 p-1 rounded-lg border border-white/10 text-xs font-mono">
          <button
            onClick={() => setComparisonMode('capture-vs-mesh')}
            className={`px-3 py-1.5 rounded transition-all ${
              comparisonMode === 'capture-vs-mesh'
                ? 'bg-terrain-green text-space-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            RAW AERIAL ↔ 3D MESH
          </button>
          <button
            onClick={() => setComparisonMode('mesh-vs-analysis')}
            className={`px-3 py-1.5 rounded transition-all ${
              comparisonMode === 'mesh-vs-analysis'
                ? 'bg-telemetry-blue text-space-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3D MODEL ↔ SLOPE ANALYSIS
          </button>
        </div>
      </div>

      {/* Interactive Slider Area */}
      <div
        ref={containerRef}
        onMouseDown={(e) => {
          handleMove(e.clientX);
          handleMouseDown();
        }}
        onTouchStart={(e) => {
          if (e.touches[0]) {
            handleMove(e.touches[0].clientX);
            handleTouchStart();
          }
        }}
        className="relative w-full h-[380px] sm:h-[480px] rounded-lg overflow-hidden select-none cursor-ew-resize border border-white/10 bg-space-950"
      >
        {/* Layer 1: Left View (Full container underneath) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {comparisonMode === 'capture-vs-mesh' ? (
            /* Raw Aerial Imagery Simulation */
            <div className="w-full h-full bg-[#12171e] relative">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="aerialGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
                  </pattern>
                  <linearGradient id="aerialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="50%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#1e2229" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#aerialGrad)" />
                <rect width="100%" height="100%" fill="url(#aerialGrid)" />
                {/* Simulated landscape features */}
                <path
                  d="M0,240 Q150,180 320,260 T600,210 T900,310 L900,500 L0,500 Z"
                  fill="#1b2430"
                  stroke="#334155"
                  strokeWidth="1.5"
                />
                <path
                  d="M0,320 Q200,280 450,340 T800,310 L800,500 L0,500 Z"
                  fill="#141c26"
                  stroke="#475569"
                  strokeWidth="1"
                />
                {/* Construction haul road track */}
                <path
                  d="M40,500 C180,420 280,310 420,240 S620,180 840,110"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="4"
                  strokeDasharray="6 3"
                  opacity="0.35"
                />
              </svg>

              {/* Technical Stamp Overlay */}
              <div className="absolute top-4 left-4 glass-panel px-3 py-2 rounded text-[11px] font-mono text-slate-300 border-l-2 border-l-terrain-green">
                <div className="font-semibold text-white">STREAM A: RAW ORTHOPHOTO CAPTURE</div>
                <div className="text-[10px] text-slate-400">RESOLUTION: 2.14 cm/px • NADIR ANGLE: 0.0°</div>
                <div className="text-[10px] text-terrain-green mt-0.5">CAMERA: 48MP GLOBAL SHUTTER</div>
              </div>
            </div>
          ) : (
            /* 3D Wireframe / Mesh Reconstruction Simulation */
            <div className="w-full h-full bg-[#0a0f16] relative">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="meshGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <polygon points="0,0 30,0 15,30" fill="none" stroke="rgba(0,245,155,0.18)" strokeWidth="0.8" />
                    <polygon points="30,0 30,30 15,30" fill="none" stroke="rgba(0,245,155,0.12)" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="#070b10" />
                <rect width="100%" height="100%" fill="url(#meshGrid)" />
                {/* Triangular TIN Mesh features */}
                <path
                  d="M0,280 L180,210 L340,300 L520,240 L700,320 L900,260 L900,500 L0,500 Z"
                  fill="rgba(0,245,155,0.06)"
                  stroke="rgba(0,245,155,0.4)"
                  strokeWidth="1.2"
                />
                <circle cx="180" cy="210" r="3" fill="#00F59B" />
                <circle cx="340" cy="300" r="3" fill="#00F59B" />
                <circle cx="520" cy="240" r="3" fill="#00F59B" />
                <circle cx="700" cy="320" r="3" fill="#00F59B" />
              </svg>

              <div className="absolute top-4 left-4 glass-panel px-3 py-2 rounded text-[11px] font-mono text-slate-300 border-l-2 border-l-terrain-green">
                <div className="font-semibold text-white">STREAM A: 3D DENSE SURFACE TIN MESH</div>
                <div className="text-[10px] text-slate-400">POINTS: 18.45M • FACES: 36.2M TRIANGLES</div>
                <div className="text-[10px] text-terrain-green mt-0.5">ALGORITHM: STRUCTURE FROM MOTION</div>
              </div>
            </div>
          )}
        </div>

        {/* Layer 2: Right View (Clipped via clip-path) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
        >
          {comparisonMode === 'capture-vs-mesh' ? (
            /* 3D Reconstructed Mesh (Right side of comparison 1) */
            <div className="w-full h-full bg-[#080d14] relative">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="reconGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="24" y2="24" stroke="rgba(0,229,255,0.22)" strokeWidth="0.8" />
                    <line x1="24" y1="0" x2="0" y2="24" stroke="rgba(0,229,255,0.22)" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="#09101a" />
                <rect width="100%" height="100%" fill="url(#reconGrid)" />
                {/* 3D elevation contour rings */}
                <ellipse cx="600" cy="300" rx="350" ry="140" fill="none" stroke="#00E5FF" strokeWidth="1.2" opacity="0.6" />
                <ellipse cx="600" cy="300" rx="270" ry="105" fill="none" stroke="#00F59B" strokeWidth="1.2" opacity="0.7" />
                <ellipse cx="600" cy="300" rx="190" ry="70" fill="none" stroke="#F59E0B" strokeWidth="1.2" opacity="0.8" />
                <ellipse cx="600" cy="300" rx="100" ry="35" fill="none" stroke="#FF6B4A" strokeWidth="1.2" opacity="0.9" />
              </svg>

              <div className="absolute top-4 right-4 glass-panel px-3 py-2 rounded text-[11px] font-mono text-slate-300 text-right border-r-2 border-r-telemetry-blue">
                <div className="font-semibold text-white">STREAM B: 3D DIGITAL ELEVATION MODEL</div>
                <div className="text-[10px] text-slate-400">CONTOUR INTERVAL: 0.50 METERS</div>
                <div className="text-[10px] text-telemetry-blue mt-0.5">PROCESSING: STEREO DENSE MATCHING</div>
              </div>
            </div>
          ) : (
            /* Analytical Slope / Drainage Heatmap (Right side of comparison 2) */
            <div className="w-full h-full bg-[#080d14] relative">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="slopeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B4A" stopOpacity="0.8" />
                    <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.7" />
                    <stop offset="70%" stopColor="#00E5FF" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#00F59B" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="#05080e" />
                {/* Slope gradient zones */}
                <path
                  d="M0,240 Q300,180 500,280 T900,200 L900,500 L0,500 Z"
                  fill="url(#slopeGrad)"
                />
                {/* Drainage flow vectors */}
                <path d="M400,220 L400,340" stroke="#00E5FF" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" />
                <path d="M520,240 L500,370" stroke="#00E5FF" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M680,260 L650,400" stroke="#00E5FF" strokeWidth="2" strokeDasharray="4 4" />
              </svg>

              <div className="absolute top-4 right-4 glass-panel px-3 py-2 rounded text-[11px] font-mono text-slate-300 text-right border-r-2 border-r-radar-coral">
                <div className="font-semibold text-white">STREAM B: DERIVED SLOPE & RUNOFF VECTORS</div>
                <div className="text-[10px] text-slate-400">CRITICAL GRADE (&gt;35°): HIGHLIGHTED IN ORANGE</div>
                <div className="text-[10px] text-radar-coral mt-0.5">HYDROLOGICAL DIRECTION: D8 FLOW MODEL</div>
              </div>
            </div>
          )}
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_15px_rgba(255,255,255,0.7)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-space-950 border-2 border-white flex items-center justify-center shadow-xl">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
            </svg>
          </div>
        </div>

        {/* Bottom Status Ticker */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-slate-400 bg-space-950/70 backdrop-blur px-3 py-1.5 rounded border border-white/10 pointer-events-none">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-terrain-green" />
            DRAG HANDLE HORIZONTALLY TO COMPARE DATA STREAMS
          </span>
          <span>SLIDER RATIO: {Math.round(sliderPosition)}% / {100 - Math.round(sliderPosition)}%</span>
        </div>
      </div>

      {/* Narrative Footer */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 gap-2">
        <div>
          <span className="text-slate-200 font-semibold">Validation Insight:</span> Hill Safe converts discrete optical exposures into calibrated 3D terrain geometries with millimeter relative scale.
        </div>
        <div className="text-[11px] text-terrain-green">
          * Field data acquired during 22-acre validation campaign
        </div>
      </div>
    </div>
  );
};
