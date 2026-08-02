import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "tuxc-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

// Matches the band at the top of the page in each theme, so the browser chrome
// on a phone continues the header rather than cutting it off.
const THEME_COLORS: Record<Theme, string> = {
  light: "#3172AE",
  dark: "#214B73",
};

const listeners = new Set<() => void>();

function darkMedia(): MediaQueryList {
  return window.matchMedia(DARK_QUERY);
}

/** The theme the reader picked, if they ever picked one. */
function storedTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    // Private browsing can refuse localStorage. Follow the system instead.
    return null;
  }
}

/**
 * What the page is painted as right now.
 *
 * Read off the document rather than kept in a variable, so React agrees with
 * the snippet in index.html that got there first.
 */
function currentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLORS[theme]);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  // Only while the reader has not chosen: once they have, their choice outlives
  // the system flipping to night.
  function onSystemChange(event: MediaQueryListEvent) {
    if (storedTheme() !== null) return;
    applyTheme(event.matches ? "dark" : "light");
  }

  // Another tab of the site changing the setting.
  function onStorage(event: StorageEvent) {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    applyTheme(storedTheme() ?? (darkMedia().matches ? "dark" : "light"));
  }

  const media = darkMedia();
  media.addEventListener("change", onSystemChange);
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * The theme the page is in, and a way to change it.
 *
 * Until the reader chooses, this follows the system. Choosing writes the choice
 * down and stops following.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, currentTheme);

  function setTheme(next: Theme): void {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The page still turns dark; it just will not remember next visit.
    }
    applyTheme(next);
  }

  function toggleTheme(): void {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return { theme, setTheme, toggleTheme };
}

/**
 * Which Mapbox style to draw with.
 *
 * The outdoors style is a bright sheet of paper, which is the one thing on a
 * dark page you cannot fix with a colour token.
 */
export function useMapStyle(): string {
  const { theme } = useTheme();
  return theme === "dark"
    ? "mapbox://styles/mapbox/dark-v11"
    : "mapbox://styles/mapbox/outdoors-v12";
}

interface MapColors {
  /** A route drawn on the map. */
  route: string;
  /** The pin that follows the cursor on the heatmap. */
  pin: string;
  /** The town boundaries. Warm in light; the brown disappears on a dark map. */
  boundary: string;
}

// Mapbox paints on a canvas, so these cannot be Tailwind classes and have to
// be kept in step with the `--route` and `--edge` variables in globals.css by
// hand.
const MAP_COLORS: Record<Theme, MapColors> = {
  light: { route: "#4B87F7", pin: "#3172AE", boundary: "#5E4B3C" },
  dark: { route: "#6BA0FF", pin: "#8CB8FF", boundary: "#A9BDD4" },
};

export function useMapColors(): MapColors {
  const { theme } = useTheme();
  return MAP_COLORS[theme];
}
