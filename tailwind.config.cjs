/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundSize: {
        'hidden-link': '0 3px',
        'shown-link': '100% 3px'
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
};
