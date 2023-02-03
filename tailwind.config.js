/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        legalGreen: "#183A33",
        legalYellow: "#C6A85C",
        legalGray: "#183A33",
        legalBlue: "#6F8BA4",
        dark: "#052A24",
        legalLightGray: "#98A6A4",
        "warm-gray": colors.warmGray,
        teal: colors.teal,
      },
    },
    fontFamily: {
      euclid: ["euclid"],
    },
    backgroundImage: {
      "landing-mobile": "url('/src/assets/images/image.png')",
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
