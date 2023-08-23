/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        '4pc': '4%',
      },
      fontFamily: {
        sans: ["'Red Hat Display'", "sans-serif"],
      },
    },
  },
  plugins: [],
}