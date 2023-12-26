import eslintPluginNext from "@next/eslint-plugin-next"
import reactPlugin from "eslint-plugin-react"
import hooksPlugin from "eslint-plugin-react-hooks"
import eslintPluginImport from "eslint-plugin-import"
import eslintPluginPromise from "eslint-plugin-promise"
import tsEslintPlugin from "@typescript-eslint/eslint-plugin"
import tsEslintParser from "@typescript-eslint/parser"

export default [
  {
    plugins: {
      "@next/next": eslintPluginNext,
    },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    plugins: {
      promise: eslintPluginPromise,
    },
    rules: {
      ...eslintPluginPromise.configs.recommended.rules,
    },
  },
  {
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs["jsx-runtime"].rules,
    },
    settings: {
      react: {
        version: "detect", // You can add this if you get a warning about the React version when you lint
      },
    },
  },
  {
    plugins: {
      "react-hooks": hooksPlugin,
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
    },
  },
  {
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
    },
  },
  {
    ignores: [".next"],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.cts", "**/*.mts"],
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        // ecmaFeatures: { modules: true },
        // ecmaVersion: "latest",
        // project: "./tsconfig.json",
        project: true,
      },
    },
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      // @typescript-eslint/eslint-pluginに付属のルールを適用
      ...tsEslintPlugin.configs["eslint-recommended"].rules,
      ...tsEslintPlugin.configs["recommended-type-checked"].rules,
      // 追加の設定
      "@typescript-eslint/padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: "return",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-misused-promises": [2, {
        "checksVoidReturn": {
          "attributes": false
        }
      }],
      "no-else-return": [
        "error",
        {
          allowElseIf: false,
        },
      ],
      "react-hooks/exhaustive-deps": "warn",
      eqeqeq: ["error", "smart"],
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@mui/*/*/*"],
        },
      ],
      // ...eslintPluginImport.configs.recommended.rules,
      "import/no-absolute-path": "error",
      "import/order": [
        "error",
        {
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": false
          },
          groups: [
            "builtin",
            "type",
            "object",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "unknown",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "~/**",
              group: "internal"
            }
          ],
          pathGroupsExcludedImportTypes: ["react"],
        },
      ],
    },
  },
]
