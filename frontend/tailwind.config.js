/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0b1329',
          navy: '#0d1527',
          sky: '#38bdf8',
          pink: '#f43f5e',
        }
      }
    },
  },
  plugins: [],
}

