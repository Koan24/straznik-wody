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
        /* =========================
           LIGHT THEME
        ========================== */
        background: "#EDF1F6",
        surface: "#E3EBED",
        surfaceAlt: "#D0E7E9",

        primary: "#93C1DD",
        primaryHover: "#B5D7F1",

        border: "#D0E7E9",

        /* =========================
           DARK THEME
        ========================== */
        darkbg: "#061A40",
        darksurface: "#003559",
        darksurfaceAlt: "#0353A4",

        darkprimary: "#006DAA",
        darkprimaryHover: "#0353A4",

        darkborder: "#0353A4",

        /* =========================
           STATUSY (zostają sensowne)
        ========================== */
        success: "#10b981",
        danger: "#dc2626",
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