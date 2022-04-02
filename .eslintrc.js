module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['@nuxtjs/eslint-config-typescript', '@vue/airbnb'],
  plugins: ['vue'],
  globals: {
    $this: 'readable',
  },
  // add your custom rules here
  rules: {},

};
