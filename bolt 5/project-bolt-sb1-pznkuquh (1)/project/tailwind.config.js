/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDF6E3',
          100: '#FFEFD9',
          200: '#FFDFD3',
          300: '#FFCCC7',
          400: '#FFA9A9', 
          500: '#FF8C8C',
          600: '#E57373',
          700: '#D35F5F',
          800: '#B54B4B',
          900: '#963939'
        },
        secondary: {
          50: '#F3F4F6',
          100: '#E5E7EB',
          200: '#D1D5DB',
          300: '#9CA3AF',
          400: '#6B7280',
          500: '#4B5563',
          600: '#374151',
          700: '#1F2937',
          800: '#111827',
          900: '#0A0A0A'
        },
        chocolate: {
          100: '#D2B48C',
          200: '#C19A6B',
          300: '#A67B5B',
          400: '#8B5A2B',
          500: '#704214',
          600: '#5C4033',
          700: '#483C32',
          800: '#3B3131',
          900: '#2D2424'
        },
        vanilla: {
          100: '#FFFFF0',
          200: '#FFFACD',
          300: '#FFF8DC',
          400: '#FAEBD7',
          500: '#F5DEB3',
          600: '#DEB887',
          700: '#D2B48C',
          800: '#BC8F8F',
          900: '#A67B5B'
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'cake': '0 4px 10px -1px rgba(0, 0, 0, 0.1), 0 2px 6px -2px rgba(0, 0, 0, 0.05)',
        'cake-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}