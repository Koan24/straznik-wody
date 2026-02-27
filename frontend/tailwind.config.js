/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a",
        accent: "#2563eb",
        success: "#10b981",
        danger: "#dc2626",
        water: "#0ea5e9",
        background: "#f1f5f9",
        darkbg: "#0f172a",
      },
      boxShadow: {
        card: "0 4px 14px 0 rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        xl2: "1rem",
      }
    },
  },
  plugins: [],
}