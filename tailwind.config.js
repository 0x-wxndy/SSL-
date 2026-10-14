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
          DEFAULT: "#E8455A",
          forest: "#E8455A",
          deep: "#B02A3C",
          mid: "#F06B7A",
          light: "#FFF0F2",
          mint: "#FFE0E5",
          dark: "#B02A3C",
        },
        green: {
          forest: "#1B6E4F",
          deep: "#0f3d28",
          mid: "#2D8A64",
          light: "#E0F2E9",
        },
        amber: { DEFAULT: "#F5C518", light: "#FFF8D6" },
        yellow: {
          DEFAULT: "#F5C518",
          deep: "#D4A017",
          light: "#FFF8D6",
        },
        coral: { DEFAULT: "#E8455A", light: "#FFF0F2" },
        sky: { DEFAULT: "#1AA6A0", light: "#E6F7F6" },
        teal: { DEFAULT: "#1AA6A0", light: "#E6F7F6" },
        plum: { DEFAULT: "#8B5CF6", light: "#F3EEFF" },
        accent: {
          DEFAULT: "#E8455A",
          light: "#FFF0F2",
        },
        surface: {
          DEFAULT: "#FFFBF5",
          base: "#FFFBF5",
          green: "#FFF8EE",
          2: "#F7F4F0",
        },
        ink: {
          DEFAULT: "#1C1917",
          muted: "#57534E",
          subtle: "#78716C",
        },
        muted: "#57534E",
        line: "#E7E0DC",
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
