/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        md: '768px',
        mx: { max: '450px' },
        ml: { max: '321px' },
        mk: { max: '364px' },
      },
    },
  },
  plugins: [],
};
