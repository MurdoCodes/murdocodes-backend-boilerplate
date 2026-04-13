// eslint.config.mjs
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import jest from "eslint-plugin-jest";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // 1. Global ignores
  {
    ignores: ["dist/", "node_modules/", "coverage/", "*.config.*"],
  },

  // 2. Base config: Node globals for all files
  {
    languageOptions: {
      globals: globals.node,
    },
  },

  // 3. JavaScript files: CommonJS
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },

  // 4. TypeScript files: parser + plugin registration
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      // ✅ Register the plugin with the exact name used in rules
      "@typescript-eslint": tseslint.plugin,
    },
  },

  // 5. ESLint core recommended rules
  pluginJs.configs.recommended,

  // 6. TypeScript-ESLint recommended rules
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint.plugin, // ✅ Register again for this object
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  // 7. Jest config for test files
  {
    files: ["src/tests/**/*.{ts,tsx}"],
    plugins: {
      // ✅ Register jest plugin for this object
      jest,
      "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      globals: globals.jest,
    },
    rules: {
      ...jest.configs["flat/recommended"]?.rules,
      "jest/prefer-expect-assertions": "off",
    },
  },

  // 8. Custom rules (with plugin registration!)
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint.plugin, // ✅ Critical: register here too
      prettier: eslintPluginPrettier,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },

  // 9. Prettier: disable conflicting ESLint rules
  eslintConfigPrettier,
];
