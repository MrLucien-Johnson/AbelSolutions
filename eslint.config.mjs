import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Static GitHub Pages export committed at repo root (legacy Pages source).
    "_next/**",
    "404/**",
    "_not-found/**",
    "about/**",
    "construction-services/**",
    "contact/**",
    "cookies/**",
    "privacy/**",
    "projects/**",
    "quote/**",
    "technology-services/**",
    "terms/**",
    "index.html",
    "index.txt",
    "404.html",
    "__next.*.txt",
    "promo/renders/**",
    "promo/audio/**",
    "promo/captures/**",
  ]),
]);

export default eslintConfig;
