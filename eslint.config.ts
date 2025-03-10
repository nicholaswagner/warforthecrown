import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginRouter from '@tanstack/eslint-plugin-router';
import eslintConfigPrettier from "eslint-config-prettier";
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";



export default [
  { files: ["**/*.{md,ts,tsx}"] },
  // pluginJs.configs.recommended, // Enable if using JavaScript files
  ...tseslint.configs.recommended,
  ...pluginRouter.configs['flat/recommended'],
  ...pluginQuery.configs['flat/recommended'],

  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat?.["jsx-runtime"] ?? {},
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      '@tanstack/router': pluginRouter,
      'react-hooks': hooksPlugin,
      'react': reactPlugin,
      "simple-import-sort": simpleImportSortPlugin,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules, // TODO: Simplify when https://github.com/facebook/react/issues/28313 is resolved
      '@tanstack/router/create-route-property-order': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      "prefer-const": "warn",
      "prefer-spread": "warn",
      "react/react-in-jsx-scope": "off",
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
      "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "^_", "argsIgnorePattern": "^_" }],
    },
    settings: {
      react: { version: "detect" },
      "import/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
        }),
      ]
    }
  },
  { ignores: ["dist/", "src/routeTree.gen.ts"] },
  eslintConfigPrettier,
];