/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#00685E",
        secondary: "#B9975B",
        bgsecondary:"#B9975B10",
        primarylight: "#F2F5F9",
        primarydark: "#E3E8EF",
        gray1: "#757879",
        gray2: "#ACC6C1",
        graytextsecondary:"#9CA0A9",
        whiteprimary: "rgba(255, 255, 255, 0.80)",
        whitebg : "rgba(255, 255, 255, 0.25)",
        redbg:"#FFCDD9",
        redtext:"#670016",
        greenbg: "#C7FFCD",
        greentext: "#006400",
        yellowbg: "#F6E3A7",
        yellowtext: "#59491D",
        deletetext: "#A93029",
        deletebg: "#F9E9E8",
        headerbg:"#F8F8F8",
        complete:"#227B76",
        progress:"#C9B608",
        textform:"#929292",
        primarybg:"#C7E0DC",
        badge:{
          1:"#32547D",
          2:"#7B222E",
          3:"#5F227B"
        },
        grayborder:"#EAEFF2",
        graybg:"#F9FAFB",
        grayfocus:"#EFEFEF",
      },
      fontFamily: {
        poppins : ['Poppins', 'sans-serif'],
        timesnr : ['Times New Roman', 'serif'],
        seravek : ['Seravek', 'sans-serif'],
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
