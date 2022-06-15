module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        "neutral-xl": "hsl(34, 21%, 97%)",
        "neutral-l": "hsl(34, 41%, 97%)",
        "neutral-d": "hsl(33, 32%, 80%)",
        "neutral-g": "#AAACB4",
        black: "#311936",
        "accent-teal": "#52A1AC",
        "accent-red": "#F23C1E",
        "primary-100": "hsl(346, 31%, 90%)",
        "primary-300": "hsl(346, 51%, 35%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
