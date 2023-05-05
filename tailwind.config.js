/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {},
      fontSize: {
        xsm: "0.65rem",
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
        "6xl": "3.7rem",
        "7xl": "4.2rem",
      },
      dropShadow: {
        "card-lg": "0px 8px 12px rgba(0, 0, 0, 0.9)",
        "card-2xl": "0px 14px 24px rgba(0, 0, 0, 0.9)",
      },
      width: {
        cardMovie: "clamp(220px, 100%, 300px)",
      },
      backgroundSize: {
        auto: "auto",
        cover: "cover",
        contain: "contain",
        "250%": "250% 250%",
      },
      backgroundImage: {
        loading:
          "linear-gradient(111deg, #f00 3%, rgba(0,0,0,0.10) 23%, #f00 47%, rgba(0,0,0,0.10) 74%, #f00 96%)",
      },
      backgroundPosition: {
        "p-30%": "22% 30%",
      },
      screens: {
        xsm: "350px",
      },
      animation: {
        slide: "slide 1500ms ease-in-out",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
});
