module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  root: true,
  extends: [
    "plugin:vue/recommended",
    "standard-with-typescript"

  ],
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json", "./src/**.vue"]
      },
      rules: {
        "space-before-function-paren": 0,
        "@typescript-eslint/return-await": 0,
        "no-return-await": "error"
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ]
    },
    {
      files: ["*.vue"],
      extends: "plugin:vue/recommended",
      rules: {
        "vue/multi-word-component-names": 0
      }
    }
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: {
      ts: "@typescript-eslint/parser",
      "<template>": "espree"
    }
  },
  plugins: [
    "vue"
  ],
  rules: {
    semi: 0,
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/space-before-function-paren": 0,
    "space-before-function-paren": 0,
    quotes: [2, "double", { avoidEscape: true, allowTemplateLiterals: true }],
    "@typescript-eslint/quotes": [2, "double"],
    "vue/multi-word-component-names": 0
    // "@typescript-eslint/semi": [2, "always"]
  }
};
