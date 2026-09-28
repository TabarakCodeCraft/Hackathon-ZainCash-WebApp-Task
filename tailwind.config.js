/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        almarai: ["Almarai", "sans-serif"],
      },

      colors: {
        brand: {
          blue: "#3B73FF",
          teal: "#2CA77C",
        },

        app: {
          primary: "rgb(var(--app-primary) / <alpha-value>)",
          secondary: "rgb(var(--app-secondary) / <alpha-value>)",
          soft: "rgb(var(--app-soft) / <alpha-value>)",
        },

        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          elevated: "rgb(var(--surface-elevated) / <alpha-value>)",
          subtle: "rgb(var(--surface-subtle) / <alpha-value>)",
        },

        content: {
          DEFAULT: "rgb(var(--content) / <alpha-value>)",
          muted: "rgb(var(--content-muted) / <alpha-value>)",
          subtle: "rgb(var(--content-subtle) / <alpha-value>)",
        },

        line: {
          DEFAULT: "rgb(var(--line) / <alpha-value>)",
          strong: "rgb(var(--line-strong) / <alpha-value>)",
        },
      },

      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #3B73FF 0%, #2CA77C 100%)",
        "brand-gradient-rtl": "linear-gradient(90deg, #2CA77C 0%, #3B73FF 100%)",
        "app-gradient": "var(--app-gradient)",
      },

      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        modalIn: {
          "0%": { opacity: "0", transform: "translateY(24px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        toastIn: {
          "0%": { opacity: "0", transform: "translateY(-16px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "pulse-slow": "pulse-slow 6s ease-in-out infinite",
        fadeIn: "fadeIn 0.25s ease-out",
        modalIn: "modalIn 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        toastIn: "toastIn 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};