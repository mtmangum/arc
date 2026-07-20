/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
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
  plugins: [],
}
