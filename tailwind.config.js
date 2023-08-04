/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      transitionDuration: {
        'custom': '0.8s',
      },
      screens: {
        'x1': '1531px',
        'x2': '1201px',
        'x3': '993px',
        'x4': '768px',
        'x5': '481px',
        'x6': '321px',
      },
    },
  },
  plugins: [],
}

