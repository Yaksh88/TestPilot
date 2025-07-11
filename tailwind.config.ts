import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: "#2563eb",
        background: "#f9fafb",
        surface: "#ffffff",
        border: "#e5e7eb",
        muted: "#6b7280",
      },
      borderRadius: {
        xl: "1rem",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        blob: "blob 8s infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
      },
      
    },
  },
  plugins: [],
};

export default config;
