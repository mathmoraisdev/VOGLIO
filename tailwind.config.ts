import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#FFFFFF',
        secondary: '#E5E5E5',
        border: '#1A1A1A',
        muted: {
          DEFAULT: '#1A1A1A',
          foreground: '#A3A3A3',
        },
        primary: {
          DEFAULT: '#365eff',
          50: '#e8ebff',
          100: '#d1d7ff',
          200: '#a3afff',
          300: '#7587ff',
          400: '#475fff',
          500: '#365eff',
          600: '#2b4bcc',
          700: '#203899',
          800: '#162666',
          900: '#0b1333',
        },
      },
      fontFamily: {
        sans: ['var(--font-general-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
}
export default config

