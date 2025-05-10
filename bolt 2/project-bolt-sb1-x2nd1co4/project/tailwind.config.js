/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(329, 99%, 78%)',
          dark: 'hsl(329, 99%, 68%)',
          light: 'hsl(329, 99%, 88%)',
        },
        secondary: {
          DEFAULT: 'hsl(184, 85%, 60%)',
          dark: 'hsl(184, 85%, 50%)',
          light: 'hsl(184, 85%, 70%)',
        },
        accent: {
          DEFAULT: 'hsl(55, 97%, 71%)',
          dark: 'hsl(55, 97%, 61%)',
          light: 'hsl(55, 97%, 81%)',
        },
        success: {
          DEFAULT: 'hsl(142, 71%, 45%)',
          dark: 'hsl(142, 71%, 35%)',
          light: 'hsl(142, 71%, 55%)',
        },
        warning: {
          DEFAULT: 'hsl(32, 95%, 60%)',
          dark: 'hsl(32, 95%, 50%)',
          light: 'hsl(32, 95%, 70%)',
        },
        error: {
          DEFAULT: 'hsl(0, 91%, 65%)',
          dark: 'hsl(0, 91%, 55%)',
          light: 'hsl(0, 91%, 75%)',
        },
      },
      fontFamily: {
        display: ['Bubblegum Sans', 'cursive'],
        body: ['Nunito', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
    },
  },
  plugins: [],
};