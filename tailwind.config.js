/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7B1FA2"
      }
    },
  },
  plugins: [
    require("daisyui"),
  ],
}
