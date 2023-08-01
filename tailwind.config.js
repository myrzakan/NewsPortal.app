/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      transitionDuration: {
        'custom': '0.8s',
      },
    
    },
  },
  plugins: [],
}

