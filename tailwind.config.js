/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#05070A',
          900: '#07090D',
          850: '#0B0F15',
          800: '#0D1117',
          700: '#161B22',
          600: '#21262D',
        },
        terrain: {
          green: '#00F59B',
          glow: 'rgba(0, 245, 155, 0.25)',
          dark: '#059669',
        },
        telemetry: {
          blue: '#00E5FF',
          glow: 'rgba(0, 229, 255, 0.2)',
          dark: '#0284C7',
        },
        radar: {
          amber: '#F59E0B',
          coral: '#FF6B4A',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'radial-vignette': 'radial-gradient(circle at 50% 40%, rgba(13, 17, 23, 0) 0%, rgba(5, 7, 10, 0.95) 100%)',
        'tech-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
        'scan-lines': 'repeating-linear-gradient(0deg, rgba(0, 245, 155, 0.03), rgba(0, 245, 155, 0.03) 1px, transparent 1px, transparent 2px)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
