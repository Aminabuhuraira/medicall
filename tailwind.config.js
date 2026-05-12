/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        base: '#F4F8FF',
        surface: '#FFFFFF',
        navy: { deep: '#030D1E', mid: '#071B3A', soft: '#1A3A5C' },
        electric: { DEFAULT: '#0052D9', light: '#3B82F6', soft: 'rgba(0,82,217,0.1)' },
        emerald: { DEFAULT: '#059669', soft: 'rgba(5,150,105,0.1)' },
        cyan: { DEFAULT: '#0052D9', soft: 'rgba(0,82,217,0.1)' },
        bio: '#059669',
        danger: '#FF2D55',
        amber: '#F59E0B',
        ink: { DEFAULT: '#0B1D35', muted: '#3D5A80', dim: '#7A9ABB' },
        border: '#E0EAF8',
      },
      borderRadius: {
        card: '16px',
        btn: '10px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(5,23,66,0.06), 0 12px 36px rgba(5,23,66,0.05)',
        glow: '0 0 30px rgba(0,82,217,0.22)',
        glowGreen: '0 0 20px rgba(5,150,105,0.3)',
        bloom: '0 16px 48px -12px rgba(0,82,217,0.28)',
        lift: '0 8px 32px rgba(5,23,66,0.12)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        breathe: {
          '0%,100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.3)', opacity: '0.8' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.6)', opacity: '0.8' },
          '100%': { transform: 'scale(2.8)', opacity: '0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        breathe: 'breathe 2s ease-in-out infinite',
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        fadeIn: 'fadeIn 0.6s ease both',
        slideRight: 'slideRight 0.5s cubic-bezier(0.16,1,0.3,1) both',
        slideUp: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both',
        pulseRing: 'pulseRing 2.4s cubic-bezier(0.16,1,0.3,1) infinite',
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        gradientShift: 'gradientShift 8s ease infinite',
        scaleIn: 'scaleIn 0.5s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
};
