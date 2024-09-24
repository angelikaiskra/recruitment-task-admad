/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    container: {
      screens: {
        '2xl': '1024px',
      }
    },
    extend: {
        maxHeight: {
          'calc-content': 'calc(100vh-116px)'
        }
    }
  },
  plugins: [],
}

