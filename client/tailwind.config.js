/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: '#2F39A9',
        ocean: '#2E6FA0',
        cyanBlue: '#49A4BB',
        mint: '#15D8B3',
        bgDark: '#0B1120',
      }
    },
  },
  plugins: [],
}
