/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundGradioent: {
        'custom-gradient': 'linear-gradient(90deg, #F4B92E 20%, white 100%)',
      },
      screens: {
        lt: '425px',
      },
    },
  },
  plugins: [],
};
