/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'pacifico': ['"Pacifico"', 'cursive'],
        'sans': ['"Poppins"', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#FFF5F7',
          100: '#FFEBF0',
          200: '#FFCDD9',
          300: '#FFAFC3',
          400: '#FF7396',
          500: '#FF3869',
          600: '#E6325F',
          700: '#BF2A4F',
          800: '#99213F',
          900: '#7D1B33',
        },
        secondary: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#B9E6FE',
          300: '#7CD4FD',
          400: '#36BFFA',
          500: '#0DA2E7',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        accent: {
          50: '#FFFAEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        pastel: {
          pink: '#FFD6E0',
          blue: '#C7EEFF',
          yellow: '#FFF1C6',
          purple: '#E4D0FF',
          green: '#C8F7D6',
        },
      },
      boxShadow: {
        'soft': '0 4px 14px 0 rgba(0, 0, 0, 0.05)',
        'hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'dots-pattern': 'radial-gradient(#e5e7eb 1.5px, transparent 1.5px)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
};