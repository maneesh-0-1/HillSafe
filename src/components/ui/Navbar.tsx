'use client';

import React, { useState, useEffect } from 'react';
import { SITE_METADATA } from '@/src/lib/constants';

interface NavbarProps {
  currentScroll?: number;
  onNavigate?: (sceneIndex: number) => void;
  onRequestAssessment?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScroll = 0, onNavigate, onRequestAssessment }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-space-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/80 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="relative w-7 h-7 flex items-center justify-center border border-terrain-green/40 bg-space-900 rounded-sm">
                <span className="w-2 h-2 bg-terrain-green rounded-full group-hover:scale-125 transition-transform" />
                <span className="absolute -inset-1 border border-terrain-green/20 rounded-sm animate-pulse-subtle pointer-events-none" />
              </div>
              <div>
                <span className="font-display font-bold text-lg tracking-wider text-white flex items-center gap-1.5">
                  HILL SAFE
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-terrain-green/10 text-terrain-green border border-terrain-green/20">
                    ALPHA
                  </span>
                </span>
                <span className="block text-[10px] tracking-widest uppercase text-slate-400 font-mono -mt-0.5">
                  Site Intelligence
                </span>
              </div>
            </button>
          </div>

          {/* Center Telemetry Readout (Desktop) */}
          <div className="hidden lg:flex items-center gap-5 text-[11px] font-mono text-slate-400 bg-space-900/60 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-terrain-green animate-ping-slow" />
              <span className="text-slate-200">{SITE_METADATA.coordinates}</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-500">DATUM:</span>
              <span className="text-slate-300">{SITE_METADATA.elevationDatum}</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-500">PHASE:</span>
              <span className="text-terrain-green font-medium">FIELD VALIDATION</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('technology')}
              className="text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-terrain-green transition-colors"
            >
              Technology
            </button>
            <button
              onClick={() => scrollToSection('prototype')}
              className="text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-terrain-green transition-colors"
            >
              Field Data
            </button>
            <button
              onClick={() => scrollToSection('applications')}
              className="text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-terrain-green transition-colors"
            >
              Applications
            </button>
            <button
              onClick={() => scrollToSection('pinn')}
              className="text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-terrain-green transition-colors"
            >
              R&D (PINN)
            </button>
            <button
              onClick={() => scrollToSection('imc-2026')}
              className="text-xs font-mono uppercase tracking-wider text-telemetry-blue hover:text-white transition-colors flex items-center gap-1"
            >
              <span className="w-1 h-1 rounded-full bg-telemetry-blue" />
              IMC 2026
            </button>

            {/* Assessment CTA */}
            <button
              onClick={onRequestAssessment || (() => scrollToSection('contact'))}
              className="text-xs font-mono tracking-wider uppercase px-4 py-2 rounded border border-terrain-green/40 bg-terrain-green/10 text-terrain-green hover:bg-terrain-green hover:text-space-950 transition-all font-semibold shadow-sm hover:shadow-[0_0_15px_rgba(0,245,155,0.3)] active:scale-95"
            >
              Site Assessment
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onRequestAssessment || (() => scrollToSection('contact'))}
              className="text-[11px] font-mono px-2.5 py-1 rounded border border-terrain-green/40 bg-terrain-green/10 text-terrain-green"
            >
              Inquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 bg-space-950/95 backdrop-blur-2xl rounded-lg p-4 space-y-3">
            <div className="text-[10px] font-mono text-slate-500 pb-1 border-b border-white/5">
              TELEMETRY: {SITE_METADATA.coordinates}
            </div>
            <button
              onClick={() => scrollToSection('technology')}
              className="block w-full text-left py-1.5 text-xs font-mono uppercase text-slate-300 hover:text-terrain-green"
            >
              01 — Technology Pipeline
            </button>
            <button
              onClick={() => scrollToSection('prototype')}
              className="block w-full text-left py-1.5 text-xs font-mono uppercase text-slate-300 hover:text-terrain-green"
            >
              02 — 22-Acre Field Validation
            </button>
            <button
              onClick={() => scrollToSection('data-slider')}
              className="block w-full text-left py-1.5 text-xs font-mono uppercase text-slate-300 hover:text-terrain-green"
            >
              03 — Spatial Comparison Tool
            </button>
            <button
              onClick={() => scrollToSection('applications')}
              className="block w-full text-left py-1.5 text-xs font-mono uppercase text-slate-300 hover:text-terrain-green"
            >
              04 — Industry Applications
            </button>
            <button
              onClick={() => scrollToSection('pinn')}
              className="block w-full text-left py-1.5 text-xs font-mono uppercase text-slate-300 hover:text-terrain-green"
            >
              05 — Physics-Informed AI (R&D)
            </button>
            <button
              onClick={() => scrollToSection('imc-2026')}
              className="block w-full text-left py-1.5 text-xs font-mono uppercase text-telemetry-blue hover:text-white"
            >
              06 — India Mobile Congress 2026
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-center mt-2 py-2 text-xs font-mono uppercase bg-terrain-green text-space-950 font-bold rounded"
            >
              Request Site Assessment
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
