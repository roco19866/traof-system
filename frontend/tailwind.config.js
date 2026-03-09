/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9fb',
          100: '#d9f0f5',
          200: '#b8e1ec',
          300: '#86cade',
          400: '#4da6c9',
          500: '#1f6f8b',
          600: '#1a5c75',
          700: '#174c61',
          800: '#174051',
          900: '#173645',
        },
      },
    },
  },
  plugins: [],
}
