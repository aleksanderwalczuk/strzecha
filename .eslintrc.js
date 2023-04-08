module.exports = {
  extends: [
    "airbnb-base",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    extraFileExtensions: [".vue"],
  },
  rules: {
    semi: ['error', 'always'],
    'es/no-rest-spread-properties': 'off',
    'class-methods-use-this': 'off',
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      functions: 'never',
    }],
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      ts: 'never',
    }],
    '@typescript-eslint/type-annotation-spacing': ['error'],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['**/*.test.{ts,js}'],
    }],
    '@typescript-eslint/strict-boolean-expressions': ['error', {
      allowNumber: false,
    }],
    '@typescript-eslint/ban-types': ['error', {
      extendDefaults: true,
      types: {
        'Record<string, string>': {
          message: 'Use Record<string, string|undefined> instead',
          fixWith: 'Record<string, string|undefined>',
        },
        'Record<string, number>': {
          message: 'Use Record<string, number|undefined> instead',
          fixWith: 'Record<string, number|undefined>',
        },
      },
    }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
  env: {
    browser: true,
  },
  plugins: ["@typescript-eslint", "import"],
  overrides: [
    {
      files: ["tailwind.config.js"],
      rules: {
        "import/no-extraneous-dependencies": [
          "error",
          { devDependencies: true },
        ],
      },
    },
  ],
  settings: {
    polyfills: [],
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["tsconfig.json", "packages/*/tsconfig.json"],
      },
    },
  },
  ignorePatterns: [".nuxt/**", "node_modules/"],
};
