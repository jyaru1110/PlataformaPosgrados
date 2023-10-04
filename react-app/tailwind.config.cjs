/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#005C4E",
        secondary: "#B78F4E",
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
        secondary: "#B78F4E",
        headerbg:"#F8F8F8"
      },
      fontFamily: {
        poppins : ['Poppins', 'sans-serif'],
        timesnr : ['Times New Roman', 'sans-serif'],
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
