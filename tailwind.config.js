/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7B1FA2",
        secondary: "#6A1B9A",
      }
    },
  },
  plugins: [
    require("daisyui"),
  ],
}
