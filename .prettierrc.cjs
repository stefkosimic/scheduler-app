// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  // Standard prettier options
  trailingComma: "es5",
  singleQuote: false,
  tabWidth: 2,
  semi: true,
  // Since prettier 3.0, manually specifying plugins is required
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  // This plugin's options
  importOrder: [
    "^next(/.*)?$", // Matches 'next', 'next/router', 'next/link', etc.
    "^react$",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/components/(.*)$",
    "",
    "^@/providers/(.*)$",
    "",
    "^@/lib/(.*)$",
    "",
    "^@/utils/(.*)$",
    "",
    "^(?!.*[.]css$)[./].*$", // Non-CSS local imports
    ".css$", // CSS imports last
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
};
