/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Minimal neutral palette
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Warm amber accent
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-lg': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-md': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.75', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 16px -4px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 4px 12px -4px rgba(0, 0, 0, 0.05), 0 8px 32px -8px rgba(0, 0, 0, 0.1)',
        'soft-xl': '0 8px 24px -8px rgba(0, 0, 0, 0.1), 0 16px 48px -16px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'scroll-left': 'scrollLeft 30s linear infinite',
        'scroll-slow': 'scrollLeft 48s linear infinite',
        'scroll-slow-reverse': 'scrollRight 48s linear infinite',
        // Local Pros mascot rig
        'mascot-wave': 'mascotWave 4.4s ease-in-out infinite',
        'mascot-bob': 'mascotBob 3.6s ease-in-out infinite',
        'mascot-blink': 'mascotBlink 5.2s steps(1, end) infinite',
        'star-pop': 'starPop 4s ease-in-out infinite',
        // Portfolio browser mockups: slow scroll down a full-page screenshot and back
        'site-pan': 'sitePan 26s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Screenshots are 1:3 and the frame is 16:10, so -79% lands on the bottom edge
        sitePan: {
          '0%, 12%': { transform: 'translateY(0)' },
          '48%, 62%': { transform: 'translateY(-79%)' },
          '98%, 100%': { transform: 'translateY(0)' },
        },
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollRight: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        // A burst of waves, then the arm rests for the rest of the cycle
        mascotWave: {
          '0%, 6%': { transform: 'rotate(0deg)' },
          '11%': { transform: 'rotate(-15deg)' },
          '17%': { transform: 'rotate(13deg)' },
          '23%': { transform: 'rotate(-13deg)' },
          '29%': { transform: 'rotate(11deg)' },
          '35%': { transform: 'rotate(-6deg)' },
          '41%, 100%': { transform: 'rotate(0deg)' },
        },
        mascotBob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-9px)' },
        },
        // Eyelids sit collapsed, then snap shut and open again
        mascotBlink: {
          '0%, 90%': { transform: 'scaleY(0)' },
          '92%, 95%': { transform: 'scaleY(1)' },
          '97%, 100%': { transform: 'scaleY(0)' },
        },
        starPop: {
          '0%, 4%': { transform: 'scale(0)', opacity: '0' },
          '12%, 78%': { transform: 'scale(1)', opacity: '1' },
          '88%, 100%': { transform: 'scale(0)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
