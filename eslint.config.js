import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

// Flat config aligned with Vite + React (automatic JSX runtime).
export default defineConfig([
  globalIgnores([
    "dist",
    "dist-renderer",
    "coverage",
    "node_modules",
  ]),

  {
    files: ["**/*.{js,jsx}"],

    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    rules: {
      // Vite React scaffold: ignore unused React / component / icon bindings.
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^[A-Z_]",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      // Allow sharing helpers/constants from component files (common in this app).
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // React Hooks v7 Compiler-oriented rules — warn only until call sites are cleaned up.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/static-components": "warn",
    },
  },
]);
