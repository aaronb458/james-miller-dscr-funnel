import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#1B2A4A",
          "navy-dark": "#0f1c30",
          "navy-light": "#223563",
          gold: "#C9A84C",
          "gold-dark": "#a87d1e",
          "gold-light": "#d4b06a",
          cream: "#F8F7F4",
          "warm-gray": "#F2F1EE",
          "text-primary": "#111827",
          "text-secondary": "#4B5563",
          "text-muted": "#9CA3AF",
        },
      },
      fontFamily: {
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        body: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        'card': '14px',
        'btn': '14px',
      },
    },
  },
  plugins: [],
};
export default config;
