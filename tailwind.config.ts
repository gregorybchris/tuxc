import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "tufts-blue": "#3172AE",
        "tufts-brown": "#5E4B3C",
        "tufts-dark-blue": "#002E6D",
        "light-blue": "#4B87F7",
      },
    },
    fontFamily: {
      manrope: ["Manrope Variable"],
    },
  },
  plugins: [],
} satisfies Config;
