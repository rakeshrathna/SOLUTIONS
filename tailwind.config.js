/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        'primary': '#FFFFFF',
        'secondary': '#FAFAFA',
        'slate-dark': '#E5E5E5',
        'muted': '#555555',
        'muted-dark': '#777777',
        'brand-primary': '#C0222E',
        'brand-hover': '#A61B26',
        'brand-light': 'rgba(192, 34, 46, 0.08)',
        'cyan-glow': '#C0222E',
        'cyan-bright': '#EF4444',
        'cyan-dark': '#A61B26',
        cyan: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#C0222E', // EDUiDEAL Darker Brand Red
          700: '#A61B26', // EDUiDEAL Red Hover
          800: '#8E141E',
          900: '#721018',
          950: '#450A0A',
        },
        brand: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#C0222E', // EDUiDEAL Darker Brand Red
          700: '#A61B26', // EDUiDEAL Red Hover
          800: '#8E141E',
          900: '#721018',
          950: '#450A0A',
        },
        surface: {
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F5F5F5',
          300: '#E5E5E5',
          400: '#D4D4D4',
          500: '#A3A3A3',
          600: '#737373',
          700: '#525252',
          800: '#262626',
          900: '#171717',
          950: '#0A0A0A',
        }
      },
      backdropBlur: {
        'glass': '12px',
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 25px -3px rgba(192, 34, 46, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 30px -5px rgba(192, 34, 46, 0.15)',
        'glow-strong': '0 0 25px rgba(192, 34, 46, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
};
