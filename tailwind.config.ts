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
          charcoal: "#242424",
          brown: "#38300F",
          gold: "#F7CE1F",
          "gold-dark": "#D4AD00",
          cream: "#FAF8F2",
          "warm-gray": "#F5F4F0",
          "text-primary": "#1A1A1A",
          "text-secondary": "#555555",
          "text-muted": "#797979",
        },
      },
      fontFamily: {
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        body: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
