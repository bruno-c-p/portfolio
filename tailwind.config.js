/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.js",
  ],
  theme: {
    extend: {
      padding: {
        '4pc': '4%',
      },
      fontFamily: {
        sans: ["'Gabarito'", "sans-serif"],
        serif: ["'Young Serif'", "serif"],
      },
    },
  },
  plugins: [],
}