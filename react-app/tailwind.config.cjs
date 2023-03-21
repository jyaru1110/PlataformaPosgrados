/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#005245",
        primarylight: "#E5FFD1",
        secondary: "#35636E",
        gray1: "#B6B6B6",
      },
      fontFamily: {
        poppins : ['Poppins', 'sans-serif']
      }
    },
    screens: {
      xs : '480px',
      ss : '620px',
      sm : '768px',
      md : '1058px',
      lg : '1200px',
      xl : '1700px',
    },
  },
  plugins: [],
}
