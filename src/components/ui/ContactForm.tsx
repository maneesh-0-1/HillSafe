'use client';

import React, { useState } from 'react';

const LOOKING_FOR_OPTIONS = [
  'Site mapping',
  '3D reconstruction',
  'Construction monitoring',
  'Terrain analysis',
  'Research collaboration',
  'Partnership',
  'Investment',
  'Other',
];

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    designation: '',
    email: '',
    phone: '',
    projectLocation: '',
    projectType: 'Construction & Civil Infrastructure',
    interests: [] as string[],
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleInterest = (opt: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(opt)
        ? prev.interests.filter((i) => i !== opt)
        : [...prev.interests, opt],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div id="contact" className="w-full glass-panel rounded-xl p-6 sm:p-10 border border-white/10 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-terrain-green/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-terrain-green animate-ping-slow" />
            <span className="text-xs font-mono tracking-widest uppercase text-slate-400">
              ENGAGE WITH OUR TECHNICAL TEAM
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">
            Let&apos;s map what matters.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Connect directly with Hill Safe founders and drone engineering leads to discuss pilot captures, research partnerships, or project site assessments.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-lg bg-terrain-green/10 border border-terrain-green/30 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-terrain-green/20 text-terrain-green flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Inquiry Transmitted</h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Thank you, <span className="text-terrain-green font-semibold">{formData.name}</span>. Our engineering team will review your project parameters and respond within 24 operational hours.
            </p>
            <div className="text-[11px] font-mono text-slate-400 pt-3 border-t border-terrain-green/20">
              TRANSMISSION LOGGED • REFERENCE ID: #HS-{Math.floor(100000 + Math.random() * 900000)}
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  company: '',
                  designation: '',
                  email: '',
                  phone: '',
                  projectLocation: '',
                  projectType: 'Construction & Civil Infrastructure',
                  interests: [],
                  notes: '',
                });
              }}
              className="mt-2 text-xs font-mono text-terrain-green underline hover:text-white"
            >
              Submit another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-space-950/80 border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-terrain-green transition-colors font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="elena@infrastructure.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-space-950/80 border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-terrain-green transition-colors font-sans"
                />
              </div>
            </div>

            {/* Row 2: Company & Designation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                  Organization / Company *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Civil Engineering"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-space-950/80 border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-terrain-green transition-colors font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                  Designation / Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chief Project Surveyor"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full bg-space-950/80 border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-terrain-green transition-colors font-sans"
                />
              </div>
            </div>

            {/* Row 3: Phone & Project Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 (0) 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-space-950/80 border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-terrain-green transition-colors font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                  Project Location / Region *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Western Ghats Highway Sector 4"
                  value={formData.projectLocation}
                  onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                  className="w-full bg-space-950/80 border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-terrain-green transition-colors font-sans"
                />
              </div>
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                Project Sector / Domain
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full bg-space-950/80 border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-terrain-green transition-colors font-sans"
              >
                <option value="Construction & Civil Infrastructure">Construction & Civil Infrastructure</option>
                <option value="Highways, Tunnels & Mountain Corridors">Highways, Tunnels & Mountain Corridors</option>
                <option value="Slope & Hydrological Hazard Assessment">Slope & Hydrological Hazard Assessment</option>
                <option value="Mining, Quarry & Volumetric Earthworks">Mining, Quarry & Volumetric Earthworks</option>
                <option value="Academic / Geotechnical R&D">Academic / Geotechnical R&D</option>
                <option value="Venture / Technology Investment">Venture / Technology Investment</option>
              </select>
            </div>

            {/* What are you looking for? (Multi-select pill badges) */}
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                What are you looking for? (Select all applicable)
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {LOOKING_FOR_OPTIONS.map((opt) => {
                  const selected = formData.interests.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleInterest(opt)}
                      className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
                        selected
                          ? 'border-terrain-green bg-terrain-green/20 text-terrain-green font-semibold shadow-[0_0_10px_rgba(0,245,155,0.2)]'
                          : 'border-white/10 bg-space-900/50 text-slate-400 hover:border-white/20 hover:text-slate-200'
                      }`}
                    >
                      {selected ? '✓ ' : '+ '}
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional Project Parameters */}
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                Site Scope / Terrain Details
              </label>
              <textarea
                rows={3}
                placeholder="Approximate acreage, terrain profile, repeat monitoring frequency, or specific site questions..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-space-950/80 border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-terrain-green transition-colors font-sans"
              />
            </div>

            {/* Disclaimer & Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-md bg-terrain-green text-space-950 font-display font-bold text-base hover:bg-[#1cfda9] active:scale-[0.99] transition-all shadow-[0_0_25px_rgba(0,245,155,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-space-950 border-t-transparent rounded-full animate-spin" />
                    <span>Processing Transmission...</span>
                  </>
                ) : (
                  <>
                    <span>Talk to Hill Safe</span>
                    <span className="font-mono text-xs">→</span>
                  </>
                )}
              </button>
              <p className="text-[11px] font-mono text-slate-500 text-center mt-3">
                * Hill Safe values confidential site specifications. No marketing spam.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
