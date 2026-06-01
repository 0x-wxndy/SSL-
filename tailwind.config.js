/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1A6B4A",
          light: "#E8F5EE",
          mid: "#2E9B6E",
          dark: "#0f3d28",
        },
        accent: {
          DEFAULT: "#D4840A",
          light: "#FBF0DC",
        },
        surface: {
          DEFAULT: "#FAF7F2",
          2: "#F3EDE4",
        },
        ink: "#1A1A18",
        muted: "#5C5A54",
        line: "#E5DFD4",
      },
      fontFamily: {
        display: ["Libre Baskerville", "Georgia", "serif"],
        sans: ["IBM Plex Sans", "sans-serif"],
      },
      maxWidth: {
        site: "1100px",
      },
    },
  },
  plugins: [],
};
