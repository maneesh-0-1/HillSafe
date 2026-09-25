'use client';

import React from 'react';
import { ROADMAP_STAGES } from '@/src/lib/constants';

interface RoadmapIndicatorProps {
  compact?: boolean;
}

export const RoadmapIndicator: React.FC<RoadmapIndicatorProps> = ({ compact = false }) => {
  return (
    <div className="w-full glass-panel rounded-lg p-4 sm:p-5 border border-white/10 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-white/5 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-terrain-green animate-ping-slow" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400">
            ENGINEERING READINESS MATURITY
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-500 uppercase">CURRENT STAGE:</span>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-terrain-green/10 text-terrain-green border border-terrain-green/30">
            PROTOTYPE / FIELD VALIDATION
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {ROADMAP_STAGES.map((stage, idx) => {
          const isDone = stage.status === 'completed';
          const isInProgress = stage.status === 'in-progress';

          return (
            <div
              key={stage.label}
              className={`p-2.5 rounded border text-left transition-all ${
                isDone
                  ? 'border-terrain-green/30 bg-terrain-green/5'
                  : isInProgress
                  ? 'border-telemetry-blue/40 bg-telemetry-blue/5'
                  : 'border-white/5 bg-space-900/40 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-slate-500">0{idx + 1}</span>
                {isDone ? (
                  <span className="text-terrain-green text-xs font-bold">✓</span>
                ) : isInProgress ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-telemetry-blue animate-pulse" />
                ) : (
                  <span className="text-slate-600 text-[10px]">○</span>
                )}
              </div>
              <div
                className={`text-[11px] font-mono font-medium leading-tight ${
                  isDone
                    ? 'text-slate-200'
                    : isInProgress
                    ? 'text-telemetry-blue font-semibold'
                    : 'text-slate-500'
                }`}
              >
                {stage.label}
              </div>
              <div className="text-[9px] font-mono text-slate-500 mt-1 uppercase">
                {isDone ? 'VALIDATED' : isInProgress ? 'CURRENT ACTIVE' : 'PLANNED R&D'}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span>* PRELIMINARY DATA WORKFLOWS UNDER TESTING</span>
        <span>BENCHMARKED OVER 22-ACRE SITE</span>
      </div>
    </div>
  );
};
