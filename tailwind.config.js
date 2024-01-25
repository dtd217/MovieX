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
      height: {
        header: '560px',
        rate: '400px',
      },
      fontSize: {
        h1: '2.6rem',
      },
      screens: {
        xs: '475px',
      },
      colors: {
        main: '#080a1a',
        subMain: '#f20000',
        dry: '#0b0f29',
        star: '#ffb000',
        text: '#c0c0c0',
        border: '#3b5563',
        dryGray: '#e0d5d5'
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('flowbite/plugin'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}