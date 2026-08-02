import type { Config } from "tailwindcss";

/**
 * A colour that follows the theme.
 *
 * The value lives in a CSS variable as bare RGB channels, which is what lets
 * `text-ink/70` and `bg-ink/5` keep working: Tailwind substitutes the opacity
 * into the same declaration rather than needing a second variable per shade.
 */
function themed(variable: string): string {
  return `rgb(var(${variable}) / <alpha-value>)`;
}

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  // The class is set on <html> before paint by the snippet in index.html, so a
  // reader who has chosen dark never sees the light page first.
  darkMode: "class",
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

        /* Everything below swaps with the theme.
         *
         * Light is the palette this site has always had: paper, warm brown and
         * Tufts blue. Dark is not that palette dimmed — brown goes muddy next
         * to black — so it trades the warmth for blue, white and a cool grey,
         * on a page that is nearly black. */

        // The page itself, and the panels that float above it.
        surface: themed("--surface"),
        raised: themed("--raised"),
        // Every piece of text, every hairline, every hover wash. Always used
        // with an opacity, which is why one colour covers all three.
        ink: themed("--ink"),
        // The blue: links, icons, focus rings, the one button a page is asking
        // for. `accent-ink` is what reads on top of it.
        accent: themed("--accent"),
        "accent-ink": themed("--accent-ink"),
        "accent-hover": themed("--accent-hover"),
        // Where a link lands on hover. Warm in light, brighter blue in dark.
        "link-hover": themed("--link-hover"),
        // The band at the top of every page.
        header: themed("--header"),
        // The plate a route is drawn on, and the hairline around it.
        canvas: themed("--canvas"),
        edge: themed("--edge"),
        // The distance badge.
        chip: themed("--chip"),
        "chip-ink": themed("--chip-ink"),
        // The route line itself, on a thumbnail or drawn large. It deepens on
        // hover in light and brightens in dark, which is the same gesture
        // against two different backgrounds.
        route: themed("--route"),
        "route-hover": themed("--route-hover"),
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
