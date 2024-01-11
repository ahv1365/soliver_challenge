// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primaryColor: "beige",
        secondaryColor: "gray",
        tabColor: "gray",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
