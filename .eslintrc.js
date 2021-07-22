module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": ["warn"],
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
  },
  settings: {
    react: {
      version: "latest",
    },
  },
};
