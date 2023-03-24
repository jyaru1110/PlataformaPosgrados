/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#005245",
        primarylight: "#F2F5F9",
        gray1: "#696E78",
        whiteprimary: "rgba(255, 255, 255, 0.80)",
        whitebg : "rgba(255, 255, 255, 0.25)",
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
