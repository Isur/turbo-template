module.exports = {
  root: true,
  extends: ["@repo/eslint-config/react.js"],
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ["./src/**/*.{ts,tsx,js,jsx}"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
};
