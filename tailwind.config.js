/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      },
    },
    colors:{
      'primaryColor': '#01C38E',
      'primaryColorv2': '#0b9973',
      'primaryColorv3': '#e3fcf6',
      'secondaryColor': '#132D46 ',
      'textLightAshColor': '#e8e8e8',
      'textAshColor': '#cdcaca',
      'textAshColorv2': '#999999',
      'textBgColor': '#F1F1F1',
      'textOrangeColor': '#EA6C00',
      'textBlueColor': '#04BADE',
      'textDeepBlueColor': '#0483ba',
      'borderColor': '#c5c2c2',
      'whiteColor': '#fff',
      'redColor': '#FF0000',
      'blackColor': '#000',
    },
  },
  plugins: [],
}

