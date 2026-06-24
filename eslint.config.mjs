import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      ".tmp/**",
      "node_modules/**",
      "scripts/__pycache__/**",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    files: ["scripts/**/*.{js,cjs,mjs}"],
    rules: {
      "@next/next/no-assign-module-variable": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["**/*.ts?(x)"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react-hooks/error-boundaries": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
