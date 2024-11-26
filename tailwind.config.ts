import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");
console.log({ colors });
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: "#F06820",
        // dark: "#1F509A",
      },
    },
  },
  plugins: [require("tailgrids/plugin")],
};
export default config;
