'use client';

import React from 'react';
import { SITE_METADATA } from '@/src/lib/constants';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-white/10 bg-space-950 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle background coordinate grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* IMC 2026 Showcase Banner */}
        <div id="imc-2026" className="glass-panel-active rounded-xl p-6 sm:p-8 mb-16 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-terrain-green animate-ping-slow" />
                <span className="text-xs font-mono tracking-widest uppercase text-terrain-green font-semibold">
                  OFFICIAL DEEP-TECH SHOWCASE
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                SEE HILL SAFE AT IMC 2026
              </h3>
              <p className="text-slate-300 text-sm max-w-xl">
                Meet our founding and engineering team in New Delhi. Experience live aerial capture demonstrations, photogrammetric reconstruction workflows, and preliminary site intelligence pipelines.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-space-950/70 p-4 rounded-lg border border-white/10">
              <div className="space-y-1 text-left sm:text-right font-mono">
                <div className="text-xs text-slate-400 uppercase">VENUE & DATES</div>
                <div className="text-sm font-bold text-white">{SITE_METADATA.eventDates}</div>
                <div className="text-xs text-terrain-green">{SITE_METADATA.eventVenue}</div>
              </div>
              <button
                onClick={() => scrollTo('contact')}
                className="px-4 py-2.5 rounded bg-terrain-green text-space-950 font-display font-semibold text-xs uppercase tracking-wider hover:bg-[#1cfda9] transition-all whitespace-nowrap"
              >
                Schedule IMC Meeting
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-sm bg-terrain-green/10 border border-terrain-green/40 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-terrain-green" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-wider">
                HILL SAFE
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed font-sans">
              Drone-based site intelligence for a safer, more measurable physical world. Transforming aerial capture into precision 3D spatial models and physics-informed terrain insights.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs font-mono text-slate-400">
              <span>LAT: 17.3850° N</span>
              <span>•</span>
              <span>LON: 78.4867° E</span>
              <span>•</span>
              <span className="text-terrain-green">ACTIVE VALIDATION</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3 font-mono text-xs">
            <div className="text-slate-200 font-semibold tracking-wider uppercase mb-2">Navigation</div>
            <div>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-slate-400 hover:text-terrain-green transition-colors">
                Home
              </button>
            </div>
            <div>
              <button onClick={() => scrollTo('technology')} className="text-slate-400 hover:text-terrain-green transition-colors">
                Technology
              </button>
            </div>
            <div>
              <button onClick={() => scrollTo('applications')} className="text-slate-400 hover:text-terrain-green transition-colors">
                Applications
              </button>
            </div>
            <div>
              <button onClick={() => scrollTo('prototype')} className="text-slate-400 hover:text-terrain-green transition-colors">
                Prototype & Field Work
              </button>
            </div>
            <div>
              <button onClick={() => scrollTo('pinn')} className="text-slate-400 hover:text-terrain-green transition-colors">
                Research & Development
              </button>
            </div>
            <div>
              <button onClick={() => scrollTo('contact')} className="text-slate-400 hover:text-terrain-green transition-colors">
                Contact
              </button>
            </div>
          </div>

          {/* Connect & Social */}
          <div className="space-y-3 font-mono text-xs">
            <div className="text-slate-200 font-semibold tracking-wider uppercase mb-2">Connect</div>
            <div>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>↗</span> LinkedIn
              </a>
            </div>
            <div>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>↗</span> YouTube (Field Logs)
              </a>
            </div>
            <div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>↗</span> Instagram
              </a>
            </div>
            <div className="pt-3 text-[11px] text-slate-500">
              Inquiries: contact@hillsafe.ai
            </div>
          </div>
        </div>

        {/* Technical Disclaimer */}
        <div className="py-6 border-b border-white/5">
          <div className="text-[11px] font-mono text-slate-500 leading-relaxed max-w-4xl">
            <span className="text-slate-400 font-semibold uppercase">Technical Disclaimer: </span>
            {SITE_METADATA.disclaimer}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-3">
          <div>
            © 2026 Hill Safe Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>ENGINEERED FOR STEEP TERRAIN</span>
            <span>•</span>
            <span>DEEP-TECH SPATIAL INTELLIGENCE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
