'use client';

import React, { useState } from 'react';
import { FIELD_TEST_DATA } from '@/src/lib/constants';

interface FieldTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FieldTestModal: React.FC<FieldTestModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'telemetry' | 'pipeline'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl glass-panel-active rounded-xl border border-white/20 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-space-900 border border-white/10 text-slate-400 hover:text-white hover:border-terrain-green transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-terrain-green animate-ping-slow" />
          <span className="text-xs font-mono uppercase tracking-widest text-terrain-green">
            FIELD LOG RECORD • ALPHA 01
          </span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
          22-Acre Construction Field Validation
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
          Hill Safe conducted an early field test over an active 22-acre civil construction corridor to evaluate automated aerial flight paths, sensor exposure calibration, tie-point extraction, and dense 3D terrain reconstruction.
        </p>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6 font-mono text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === 'overview'
                ? 'bg-terrain-green text-space-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            01. WORKFLOW EVIDENCE
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === 'telemetry'
                ? 'bg-terrain-green text-space-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            02. SENSOR TELEMETRY LOGS
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === 'pipeline'
                ? 'bg-terrain-green text-space-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            03. RECONSTRUCTION METRICS
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Visual Workflow Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-space-950/70 border border-white/10 space-y-2">
                <div className="text-[10px] font-mono text-terrain-green uppercase font-semibold">STAGE A • CAPTURE</div>
                <div className="text-sm font-display font-semibold text-white">428 Aerial Frames</div>
                <div className="h-28 rounded bg-space-900 flex items-center justify-center border border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                  <div className="text-center font-mono text-[10px] text-slate-400">
                    <div className="text-terrain-green font-bold text-lg mb-1">80% / 70%</div>
                    OVERLAP FORWARD/LATERAL
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Multi-angle lawnmower grid flight with 30° gimbal pitch compensation for terrain inclination.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-space-950/70 border border-white/10 space-y-2">
                <div className="text-[10px] font-mono text-telemetry-blue uppercase font-semibold">STAGE B • SFM DENSE</div>
                <div className="text-sm font-display font-semibold text-white">Point Cloud Formation</div>
                <div className="h-28 rounded bg-space-900 flex items-center justify-center border border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-dot-pattern opacity-40 text-telemetry-blue" />
                  <div className="text-center font-mono text-[10px] text-slate-400 relative z-10">
                    <div className="text-telemetry-blue font-bold text-lg mb-1">18.45M</div>
                    REGISTERED 3D POINTS
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Keypoint matching using invariant scale features, refined by bundle adjustment.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-space-950/70 border border-white/10 space-y-2">
                <div className="text-[10px] font-mono text-radar-amber uppercase font-semibold">STAGE C • DIGITAL TERRAIN</div>
                <div className="text-sm font-display font-semibold text-white">DEM & Contour Layers</div>
                <div className="h-28 rounded bg-space-900 flex items-center justify-center border border-white/5 relative overflow-hidden">
                  <div className="text-center font-mono text-[10px] text-slate-400">
                    <div className="text-radar-amber font-bold text-lg mb-1">0.50m</div>
                    CONTOUR RESOLUTION
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Continuous TIN triangulation generating slope gradients, cut volumes, and water drainage axes.
                </p>
              </div>
            </div>

            {/* Field Findings Box */}
            <div className="p-4 rounded-lg bg-space-900/60 border border-white/10 space-y-2 font-mono text-xs">
              <div className="text-slate-300 font-semibold uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-terrain-green" />
                Key Validation Observations:
              </div>
              <ul className="space-y-1 text-slate-400 list-disc list-inside text-[11px]">
                <li>Achieved 2.14 cm/pixel Ground Sampling Distance at 85m flight altitude with zero motion blur.</li>
                <li>Validated automated boundary compensation over 45-degree slope embankments.</li>
                <li>Successfully detected 3 active soil slip zones and water stagnation depressions.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'telemetry' && (
          <div className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-space-950 rounded border border-white/5">
                <div className="text-slate-500 text-[10px]">TOTAL AREA</div>
                <div className="text-white font-bold text-sm mt-0.5">{FIELD_TEST_DATA.coverageArea}</div>
              </div>
              <div className="p-3 bg-space-950 rounded border border-white/5">
                <div className="text-slate-500 text-[10px]">FLIGHT ALTITUDE</div>
                <div className="text-white font-bold text-sm mt-0.5">{FIELD_TEST_DATA.flightAltitude}</div>
              </div>
              <div className="p-3 bg-space-950 rounded border border-white/5">
                <div className="text-slate-500 text-[10px]">FLIGHT DURATION</div>
                <div className="text-white font-bold text-sm mt-0.5">{FIELD_TEST_DATA.flightTime}</div>
              </div>
              <div className="p-3 bg-space-950 rounded border border-white/5">
                <div className="text-slate-500 text-[10px]">GROUND SAMPLING</div>
                <div className="text-white font-bold text-sm mt-0.5">{FIELD_TEST_DATA.groundSamplingDistance}</div>
              </div>
            </div>

            <div className="p-4 bg-space-950/80 rounded border border-white/10 space-y-2 text-[11px] text-slate-400 leading-relaxed">
              <div className="text-white font-semibold">Sensor Payload Notes:</div>
              <div>• Optical Camera: Sony Exmor 1-inch CMOS sensor, 24mm equivalent focal length.</div>
              <div>• GNSS Positioning: Multi-band L1/L2 RTK with base station corrections.</div>
              <div>• Wind Tolerance Tested: Sustained 28 km/h gusts with 0.12m attitude variance.</div>
            </div>
          </div>
        )}

        {activeTab === 'pipeline' && (
          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 bg-space-950/80 rounded border border-white/10 space-y-3">
              <div className="text-terrain-green font-semibold uppercase text-xs">
                DATA PROCESSING WORKFLOW TIMINGS
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">1. Image Ingestion & EXIF GPS Extraction</span>
                  <span className="text-white font-semibold">2m 40s</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">2. Keypoint Matching & Camera Calibration</span>
                  <span className="text-white font-semibold">18m 15s</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">3. Dense Multi-View Stereo Reconstruction</span>
                  <span className="text-white font-semibold">34m 20s</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">4. Digital Surface Model (DSM) & Slope Contours</span>
                  <span className="text-white font-semibold">9m 50s</span>
                </div>
                <div className="flex justify-between pt-1 text-terrain-green">
                  <span>TOTAL PRELIMINARY PROCESSING TIME</span>
                  <span className="font-bold">1h 05m 05s</span>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 italic">
              * Hill Safe R&D is currently optimizing distributed GPU point-cloud clustering to cut processing latency by 60%.
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-3">
          <span>STATUS: RESEARCH & PROTOTYPE DEMONSTRATION</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-white/10 text-white hover:bg-terrain-green hover:text-space-950 font-semibold transition-all"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
