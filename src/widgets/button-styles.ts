/**
 * How much weight a button or link carries.
 *
 * `quiet` is the default because most of these sit in rows of three or four;
 * `primary` is for the one action a page is really asking for.
 */
export type ButtonVariant = "quiet" | "primary" | "outline";

export const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  quiet: "text-black/70 hover:bg-black/5 hover:text-black/90",
  primary: "bg-tufts-blue text-white hover:bg-tufts-dark-blue",
  outline: "border border-black/15 text-black/70 hover:bg-black/5",
};

export const VARIANT_ICON_COLORS: Record<ButtonVariant, string> = {
  quiet: "#3172AE",
  primary: "#FFFFFF",
  outline: "#3172AE",
};

export const BUTTON_BASE =
  "inline-flex select-none flex-row items-center justify-center gap-2 rounded px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-tufts-blue focus-visible:ring-offset-2";
