/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      screens: {
        lg: '1025px',
      },
      boxShadow: {
        '3xl': '0 15px 40px -12px rgb(0 0 0 / 0.25)',
      },
      colors: {
        black: '#1E201E',
        lightBlue: '#a6b6c2',
        blue: '#4f637e',
        darkBlue: '#091837',
        beige: '#eac79f',
        green: '#66bb6a',
        red: '#ef5350',
        transparent: '#FFFFFFFF',
        white: '#FFF',
      },
      fontFamily: {
        sans: ['Quicksand'],
        serif: ['RocknRoll One'],
      },
      fontSize: {
        '2xs': '0.9rem',
        '3xl': '2rem',
      },
      height: {
        18: '4.5rem',
        '90vh': '90vh',
      },
      transitionDuration: {
        2000: '2000ms',
        3000: '3000ms',
        5000: '5000ms',
      },
      zIndex: {
        9: '9',
        5: '5',
        4: '4',
      },
    },
  },
  plugins: [],
}
