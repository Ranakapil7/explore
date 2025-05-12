/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'peach': '#FFBE98',
        'peach-light': '#FFE6D9',
      },
    },
  },
  plugins: [],
}