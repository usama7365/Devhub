/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: {min: '320px', max: '639px'},
      small: {min: '320px', max: '933px'},
    },
    extend: {
      colors: {
        // Nord theme colors
        nord: {
          0: '#2E3440',
          1: '#3B4252',
          2: '#434C5E',
          3: '#4C566A',
          snow0: '#D8DEE9',
          snow1: '#E5E9F0',
          snow2: '#ECEFF4',
          frost0: '#8FBCBB',
          frost1: '#88C0D0',
          frost2: '#81A1C1',
          frost3: '#5E81AC',
          aurora0: '#BF616A',
          aurora1: '#D08770',
          aurora2: '#EBCB8B',
          aurora3: '#A3BE8C',
          aurora4: '#B48EAD',
        },
      },
    },
  },
  plugins: [],
};