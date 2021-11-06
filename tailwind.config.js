module.exports = {
  purge: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./build/server/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
