/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      transitionDuration: {
        'custom': '0.8s',
      },
      screens: {
        'xs': '320px',
        'sd': '480px',
        'l': '420px',
        'lq': '360px'
      },
    },
  },
  plugins: [],
}

