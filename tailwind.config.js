/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yellowCustom: "#ffcd00",
      },
      transitionProperty: {
        transform: "transform",
      },
    },
  },
  plugins: [],
};
