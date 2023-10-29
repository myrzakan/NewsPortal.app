/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'md': '800px',
      },
    },
  },
  plugins: [],
}

