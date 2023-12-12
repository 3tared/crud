/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.5rem',
        sm: '1.5rem',
        lg: '2.5rem',
        xl: '4rem',
        '2xl': '5rem',
      },
    },
    extend: {},
  },
  plugins: [],
};
