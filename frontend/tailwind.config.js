/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'sms':'414px',
      'sm': '480px', // Custom small screen size
      'sb': '563px',
      'pd':'845px',
      'md': '768px', // Custom medium screen size
      'pc':'1140px',
      'nv':'1014px',
      'lg': '1024px', // Custom large screen size
      'xl': '1280px', // Custom extra large screen size
      '2xl': '1536px', // Custom extra extra large screen size
    },
  },
  plugins: [],
}