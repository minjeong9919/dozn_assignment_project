/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#216FE4",
        primary100: "#1B5CBD",
        gray: "#B2B2B2",
        red: "#FF0000",
        gray100: "#f2f2f2",
        gray200: "#E2E2E2",
      },
    },
  },
  plugins: [],
};
