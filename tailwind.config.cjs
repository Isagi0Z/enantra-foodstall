module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#ff5722",  // orange-red (food vibe)
          secondary: "#ff9e80",
          dark: "#1a1a1a",
        },
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        smooth: "0 4px 20px rgba(0,0,0,0.12)",
        menu: "0 10px 30px rgba(0,0,0,0.18)",
      },
      borderRadius: {
        soft: "18px",
      },
      spacing: {
        4.5: "1.15rem",
      },
    },
  },
  plugins: [],
};
