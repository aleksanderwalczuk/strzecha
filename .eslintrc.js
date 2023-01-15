module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  root: true,
  extends: [
    'plugin:vue/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    semi: 0,
    'space-before-function-paren': 0
  }
}
