const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "unused-imports", "import"],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  rules: {
    "react-refresh/only-export-components": "off",
    "react/prop-types": "off",
    quotes: ["error", "double"],
    "prettier/prettier": "warn",
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/self-closing-comp": "warn",
    "no-duplicate-imports": "warn",
    "import/newline-after-import": [
      "error",
      {
        count: 1,
      },
    ],
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
      },
    ],
    "lines-between-class-members": [
      "warn",
      "always",
      {
        exceptAfterSingleLine: true,
      },
    ],
  },
};
