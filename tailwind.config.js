import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  safelist: [
    'text-violet-300',
    'hover:bg-violet-900/30',
    'text-blue-300',
    'hover:bg-blue-900/30',
    'text-amber-300',
    'hover:bg-amber-950/30',
    'hover:bg-amber-900/30',
    'text-cyan-300',
    'hover:bg-cyan-900/30',
    'text-slate-300',
    'hover:bg-slate-700/30',
    'text-pink-300',
    'hover:bg-pink-900/30',
    'text-white',
    'hover:bg-violet-600',
    'bg-violet-600/30',
    'hover:bg-blue-600',
    'bg-blue-600/30',
    'hover:bg-amber-600',
    'bg-amber-600/30',
    'hover:bg-cyan-600',
    'bg-cyan-600/30',
    'hover:bg-slate-600',
    'bg-slate-600/30',
    'hover:bg-pink-600',
    'bg-pink-600/30',
    'border-2',
    'border-violet-600',
    'border-blue-600',
    'border-amber-600',
    'border-cyan-600',
    'border-slate-600',
    'border-pink-600',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#faf5f0',
          100: '#f5ebe0',
          200: '#e8d4c4',
          300: '#d4a574',
          400: '#c89142',
          500: '#b8752b',
          600: '#a0641f',
          700: '#7d4f18',
          800: '#5a3914',
          900: '#3d2410',
          950: '#2a180a',
        },
        // Routed through CSS variables (see src/assets/main.css) so the same
        // slate-900/text-white/etc. classes used throughout the app render
        // correctly in both the dark (default) and light theme, without
        // needing dark:/light: variants sprinkled through every component.
        white: 'rgb(var(--color-white) / <alpha-value>)',
        slate: {
          50:  'rgb(var(--color-slate-50) / <alpha-value>)',
          100: 'rgb(var(--color-slate-100) / <alpha-value>)',
          200: 'rgb(var(--color-slate-200) / <alpha-value>)',
          300: 'rgb(var(--color-slate-300) / <alpha-value>)',
          400: 'rgb(var(--color-slate-400) / <alpha-value>)',
          500: 'rgb(var(--color-slate-500) / <alpha-value>)',
          600: 'rgb(var(--color-slate-600) / <alpha-value>)',
          700: 'rgb(var(--color-slate-700) / <alpha-value>)',
          800: 'rgb(var(--color-slate-800) / <alpha-value>)',
          900: 'rgb(var(--color-slate-900) / <alpha-value>)',
          950: 'rgb(var(--color-slate-950) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Georgia', 'ui-serif', 'serif'],
        heading: ['Georgia', 'ui-serif', 'serif'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(to bottom, rgba(2,6,23,0.65) 0%, rgba(2,6,23,0.80) 60%, rgba(2,6,23,1) 100%)",
      },
    },
  },
  plugins: [
    // Lets category-color classes (violet/blue/cyan/pink/amber badges, etc.)
    // that aren't routed through the slate/white CSS variables opt into a
    // light-theme-specific override, e.g. `text-violet-300 light:text-violet-800`.
    plugin(({ addVariant }) => {
      addVariant('light', ':is([data-theme="light"] &)')
    }),
  ],
}
