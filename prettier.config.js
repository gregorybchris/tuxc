// prettier.config.js
module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
  // Named rather than left to the plugin to go looking. Without the config the
  // plugin does not know `ink` or `route` are colours, sorts them as unknown
  // classes, and puts them first — so an editor that fails to find it quietly
  // reorders every className away from what CI expects.
  tailwindConfig: "./tailwind.config.ts",
};
