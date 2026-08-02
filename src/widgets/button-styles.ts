/**
 * How much weight a button or link carries.
 *
 * `quiet` is the default because most of these sit in rows of three or four;
 * `primary` is for the one action a page is really asking for.
 */
export type ButtonVariant = "quiet" | "primary" | "outline";

export const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  quiet: "text-ink/70 hover:bg-ink/5 hover:text-ink/90",
  primary: "bg-accent text-accent-ink hover:bg-accent-hover",
  outline: "border border-ink/15 text-ink/70 hover:bg-ink/5",
};

/** The icon is blue except on the blue button, where it takes the text's colour. */
export const VARIANT_ICON_CLASSES: Record<ButtonVariant, string> = {
  quiet: "text-accent",
  primary: "text-current",
  outline: "text-accent",
};

// The ring offset punches a gap in the ring the colour of the page behind it,
// which has to be the page rather than white once the page can be black.
export const BUTTON_BASE =
  "inline-flex select-none flex-row items-center justify-center gap-2 rounded px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface";
