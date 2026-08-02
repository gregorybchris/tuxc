import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "tufts-blue": "#3172AE",
        "tufts-brown": "#5E4B3C",
        // The brown lightened but kept warm. Fading the brown with opacity alone
        // turns it grey, which is how the palette loses its warmth.
        "tufts-paper": "#F6F1EB",
        "tufts-dark-blue": "#002E6D",
        "light-blue": "#4B87F7",
        // Only ever used to fill a favorited star.
        gold: "#E0A526",
      },
      maxWidth: {
        // A column of running text, kept near 65 characters.
        measure: "34rem",
        // Everything else. The header and footer share it, so the logo lines up
        // with the left edge of whatever page you are on.
        page: "72rem",
      },
    },
    fontFamily: {
      manrope: ["Manrope Variable"],
      // Also the page default, which is what portalled content — dialogs, the
      // sort menu — inherits, since those render outside the app's wrapper.
      sans: [
        "Manrope Variable",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ],
    },
  },
  plugins: [],
} satisfies Config;
