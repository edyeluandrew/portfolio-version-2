/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'win11': {
          'accent': '#60cdff',
          'accent-dark': '#0078d4',
          'bg': 'rgba(32, 32, 32, 0.85)',
          'bg-solid': '#202020',
          'border': 'rgba(255, 255, 255, 0.0578)',
          'border-active': 'rgba(255, 255, 255, 0.0837)',
        }
      },
      fontFamily: {
        'segoe': ['"Segoe UI Variable"', '"Segoe UI"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'window-open': 'windowOpen 0.15s ease-out',
        'fade-in': 'fadeIn 0.3s ease forwards',
        'slide-up': 'slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        windowOpen: {
          'from': { opacity: '0', transform: 'scale(0.95)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        fadeIn: {
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(12px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        'xl': '20px',
        '2xl': '40px',
      }
    },
  },
  plugins: [],
}
