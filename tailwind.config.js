/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#216FE4",
        gray: "#B2B2B2",
        red: "#FF0000",
        gray100: "#f2f2f2",
      },
    },
  },
  plugins: [],
};
