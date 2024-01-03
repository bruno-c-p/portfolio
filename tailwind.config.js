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
      colors: {
        'dark-bg': '#1B1E28',
        'secondary': '#D9D9D9',
        'tertiary': '#BFBFBF',
        'quaternary': '#A6A6A6',
        'quinary': '#8C8C8C',
        'senary': '#737373',
        'septenary': '#595959',
        'octonary': '#404040',
        'nonary': '#262626',
        'denary': '#0D0D0D',
      },
    },
  },
  plugins: [],
}