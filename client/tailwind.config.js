/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./node_modules/flowbite/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        zoomIn: {
          '0%': { transform: 'scale3d(.3, .3, .3)', opacity: '0' },
          '50%': { opacity: '1' },
        }
      },
      animation: {
        'spin-180': 'spin 0.5s linear 1',
        'zoomIn': 'zoomIn 0.2s linear 1',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('flowbite/plugin'),
  ],
}