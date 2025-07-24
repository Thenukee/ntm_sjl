/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:     "#FFF8F2",
        terra:     "#C75E4B",
        sky:       "#5EA9DD",
        evening:   "#243B55",
        sage:      "#A7D2C4",
        violet:    "#4C4E8F",
      },
    },
  },
  plugins: [],
};
