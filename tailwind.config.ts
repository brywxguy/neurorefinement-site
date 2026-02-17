import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — extracted from NeuroRefinement logos
        // Deep teal-navy primary + warm gold accent + cream backgrounds
        brand: {
          50:  '#f0f5f7',
          100: '#d6e3e9',
          200: '#adc7d3',
          300: '#7da6b8',
          400: '#52859c',
          500: '#2A4E5E',   // Primary — deep teal-navy from logo
          600: '#234250',
          700: '#1E3A47',
          800: '#19303B',
          900: '#142832',
          950: '#0B1820',
        },
        ocean: {
          50:  '#f0f6fb',
          100: '#dceaf5',
          200: '#c0d9ee',
          300: '#94c0e2',
          400: '#5F96B8',   // Steel blue from concentric circles
          500: '#3B6F8E',
          600: '#2D5A75',
          700: '#264C63',
          800: '#213F52',
          900: '#1D3545',
          950: '#132230',
        },
        sage: {
          50:  '#f0f5f2',
          100: '#d9e8de',
          200: '#b5d2be',
          300: '#8db89b',
          400: '#6B8F7B',   // Sage green from light logo tagline
          500: '#567A65',
          600: '#456350',
          700: '#384F41',
          800: '#2D4035',
          900: '#24342B',
          950: '#141E18',
        },
        sand: {
          50:  '#F5F0E8',   // Cream from light logo background
          100: '#EDE7DB',
          200: '#E2D9C8',
          300: '#D1C4AB',
          400: '#BFAD8E',
          500: '#AD9672',
          600: '#9A8060',
          700: '#7E6950',
          800: '#675643',
          900: '#554738',
          950: '#2E261F',
        },
        gold: {
          50:  '#FDF8ED',
          100: '#FAF0D5',
          200: '#F5DFAA',
          300: '#ECC975',
          400: '#D4A853',   // Gold accent from dark logo tagline
          500: '#C99B45',
          600: '#B5853A',
          700: '#966B31',
          800: '#7A572C',
          900: '#654828',
          950: '#382614',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body:    ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        '5xl': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'warm': '0 4px 30px rgba(42, 78, 94, 0.08)',
        'warm-lg': '0 10px 50px rgba(42, 78, 94, 0.12)',
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 6px 16px rgba(0,0,0,0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
