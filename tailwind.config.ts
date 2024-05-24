import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        "var(--font-space-grotesk)",
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
      ],
      mono: ["var(--font-space-mono)", "ui-monospace", "monospace"],
    },
  },
  plugins: [],
};
export default config;
