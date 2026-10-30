/** @type {import('tailwindcss').Config} */
// Brand tokens sampled from the official IMS 2027-28 admission poster
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  // Beat the old global CSS (e.g. .grid in App.css) without renaming anything
  important: "#root",
  theme: {
    extend: {
      colors: {
        emerald: {
          50: "#EAF2ED",
          100: "#CFE2D6",
          600: "#0A4E26",
          700: "#003C24",
          800: "#002E1C",
          900: "#002014",
        },
        gold: {
          100: "#F8EBC8",
          300: "#EAC678",
          400: "#E4C062",
          500: "#C6A878",
          600: "#A8884A",
        },
        navy: { 800: "#00284A", 900: "#001E36" },
        ink: "#0A0A20",
        ivory: { 50: "#FFFAF2", 100: "#FCF0DE", 200: "#F4E4C8" },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Outfit"', "system-ui", "sans-serif"],
        arabic: ['"Amiri"', "serif"],
      },
      letterSpacing: { eyebrow: "0.22em" },
      maxWidth: { site: "1280px" },
      boxShadow: {
        card: "0 1px 2px rgba(0,32,20,.06), 0 12px 32px -12px rgba(0,32,20,.18)",
        lift: "0 24px 48px -20px rgba(0,32,20,.35)",
      },
      borderRadius: { arch: "999px 999px 24px 24px" },
      keyframes: {
        "ken-burns": { "0%": { transform: "scale(1.04)" }, "100%": { transform: "scale(1.14)" } },
      },
      animation: { "ken-burns": "ken-burns 24s ease-out both" },
    },
  },
  plugins: [],
};
