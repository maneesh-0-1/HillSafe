/**
 * Procedural Web Audio Sound Synthesizer for Hill Safe UAV.
 * Generates realistic brushless motor frequencies, rotor harmonics,
 * Doppler variation, and tactical LiDAR radar acoustic pings.
 */
export class DroneAudioEngine {
  constructor() {
    this.ctx = null;
    this.isEnabled = false;

    // Motor oscillators
    this.osc1 = null;
    this.osc2 = null;
    this.gainNode = null;
    this.filterNode = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    this.ctx = new AudioContext();

    // Master filter to keep sound warm and atmospheric
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(380, this.ctx.currentTime);

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.0, this.ctx.currentTime);

    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    // Motor fundamental tone (brushless multi-pole hum ~ 95Hz)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(95, this.ctx.currentTime);
    this.osc1.connect(this.filterNode);
    this.osc1.start();

    // Motor harmonic (sub-rotor prop resonance ~ 190Hz)
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(190, this.ctx.currentTime);
    this.osc2.connect(this.filterNode);
    this.osc2.start();

    // Subtle rotor blade turbulence noise
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(220, this.ctx.currentTime);
    noiseFilter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.gainNode);
    whiteNoise.start();
  }

  toggle() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isEnabled = !this.isEnabled;
    const targetGain = this.isEnabled ? 0.08 : 0.0;
    this.gainNode.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.15);
    return this.isEnabled;
  }

  update(rotorSpeedMultiplier, isEvading) {
    if (!this.ctx || !this.isEnabled) return;

    // Pitch shifts upward with throttle / evasion thrust
    const baseFreq = 95 * rotorSpeedMultiplier;
    this.osc1.frequency.setTargetAtTime(baseFreq, this.ctx.currentTime, 0.1);
    this.osc2.frequency.setTargetAtTime(baseFreq * 2.05, this.ctx.currentTime, 0.1);

    const targetCutoff = isEvading ? 620 : 380;
    this.filterNode.frequency.setTargetAtTime(targetCutoff, this.ctx.currentTime, 0.15);
  }

  playEvasionChime() {
    if (!this.ctx || !this.isEnabled) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1320, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }
}
