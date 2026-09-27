/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        skycare: {
          navy: '#071A33',       // Deep Navy
          darkBlue: '#0B2748',   // Dark Blue
          skyBlue: '#174A73',    // Sky Blue
          softBlue: '#3F78A3',   // Soft Blue
          cloud: '#DCEAF3',      // Cloud White / Pale soft blue
          sun: '#F5C978',        // Warm Sun / Gold
          sunHover: '#E8B65A',
          ice: '#F0F7FC',
          card: 'rgba(11, 39, 72, 0.75)',
          cardLight: 'rgba(23, 74, 115, 0.45)',
          cardBorder: 'rgba(220, 234, 243, 0.12)',
          cardBorderHover: 'rgba(220, 234, 243, 0.28)',
          accentCyan: '#48CAE4',
          accentEmerald: '#10B981',
          accentAmber: '#F59E0B',
          accentRose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(245, 201, 120, 0.15)',
        'glow-md': '0 0 25px rgba(245, 201, 120, 0.25)',
        'glow-blue': '0 0 30px rgba(63, 120, 163, 0.25)',
        'weather-card': '0 10px 30px -5px rgba(7, 26, 51, 0.6), 0 0 0 1px rgba(220, 234, 243, 0.1)',
        'weather-card-hover': '0 20px 40px -10px rgba(7, 26, 51, 0.8), 0 0 0 1px rgba(220, 234, 243, 0.25)',
        'float': '0 20px 30px -10px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at 50% 20%, #174A73 0%, #0B2748 50%, #071A33 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(23, 74, 115, 0.5) 0%, rgba(11, 39, 72, 0.7) 100%)',
        'sun-glow': 'radial-gradient(circle at center, rgba(245, 201, 120, 0.35) 0%, rgba(245, 201, 120, 0) 70%)',
        'atmospheric-dawn': 'linear-gradient(180deg, #071A33 0%, #0B2748 40%, #174A73 75%, #3F78A3 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.25s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
