/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
        "archivo-black": ['"Archivo Black"', "sans-serif"],
      },
    },
    plugins: [],
  },
};
