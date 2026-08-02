function isMac(): boolean {
  return /Mac|iPhone|iPad/.test(navigator.userAgent);
}

/** The search shortcut, written the way the reader's own keyboard would. */
export function shortcutLabel(): string {
  return isMac() ? "⌘K" : "Ctrl K";
}
