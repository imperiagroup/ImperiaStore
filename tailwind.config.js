/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontSize: {
        "5xl": "2rem",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["lofi"],
  },
};
