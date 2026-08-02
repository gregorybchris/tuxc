import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    // Route files are downloads, so they have to stay real files. Small ones
    // would otherwise be inlined as data URLs and arrive with the wrong name.
    assetsInlineLimit: (filePath) =>
      filePath.endsWith(".gpx") ? false : undefined,
  },
});
