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
          DEFAULT: "#F7931A",
          forest: "#F7931A",
          deep: "#8B5200",
          mid: "#FB923C",
          light: "#FFF0D6",
          mint: "#FDE68A",
          dark: "#8B5200",
        },
        green: {
          forest: "#1B6E4F",
          deep: "#0f3d28",
          mid: "#2D8A64",
          light: "#E0F2E9",
        },
        amber: { DEFAULT: "#F7931A", light: "#FFF0D6" },
        coral: { DEFAULT: "#E86C5A", light: "#FDECEA" },
        sky: { DEFAULT: "#5B8DD9", light: "#E8F0FD" },
        plum: { DEFAULT: "#9B6ED4", light: "#F3ECFC" },
        accent: {
          DEFAULT: "#F7931A",
          light: "#FFF0D6",
        },
        surface: {
          DEFAULT: "#FDF8F2",
          base: "#FDF8F2",
          green: "#FFF8EE",
          2: "#F4F7F5",
        },
        ink: {
          DEFAULT: "#1A1A18",
          muted: "#5C5A54",
          subtle: "#8A8880",
        },
        muted: "#5C5A54",
        line: "#E5DFD4",
        status: {
          valid: "#1B6E4F",
          "valid-bg": "#D4EDDA",
          wait: "#D4840A",
          "wait-bg": "#FFF3CD",
          error: "#B91C1C",
          "error-bg": "#F8D7DA",
          info: "#155e75",
          "info-bg": "#D1ECF1",
        },
      },
      fontFamily: {
        display: ["Lora", "Georgia", "serif"],
        body: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        "2xl": "28px",
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.06)",
        hover: "0 6px 20px rgba(0,0,0,0.10)",
      },
      maxWidth: {
        site: "1100px",
      },
    },
  },
  plugins: [],
};
