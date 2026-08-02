import { useTheme } from "@/lib/hooks/theme";
import { cn } from "@/lib/utilities/style-utils";
import { Moon, Sun } from "@phosphor-icons/react";

interface ThemeToggleProps {
  className?: string;
}

/**
 * Switches the page between light and dark.
 *
 * Shows where you are going rather than where you are — a moon on the light
 * page — which is the way every other one of these works.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={cn(
        // Lives in the header band, so it is white on blue in both themes.
        "rounded p-1.5 text-white/80 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/70",
        className,
      )}
    >
      {dark ? (
        <Sun size={18} weight="bold" />
      ) : (
        <Moon size={18} weight="bold" />
      )}
    </button>
  );
}
