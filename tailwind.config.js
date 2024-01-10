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
        'dark-gray': '#1B1E28',
        'dark-green': '#42675A',
        'primary-green': '#5DE4C7',
        'secondary-green': '#5FB3A1',
        'primary-yellow': '#FFFAC2',
        'primary-gray': '#A6ACCD',
        'secondary-gray': '#A4AACB',
        'tertiary-gray': '#303340',
        'white-gray': '#E4F0FB',
      },
    },
  },
  plugins: [],
}