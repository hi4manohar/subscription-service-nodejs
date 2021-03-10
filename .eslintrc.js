module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard',
    "prettier"
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    quotes: ["off", "double"],
    indent: ["error", 2],
    semi: ["off", "always"],
    "space-before-function-paren": ["off", 'always'],
    "new-cap": ["off", { newIsCap: true }],
    eqeqeq: ["off", 'always'],
    camelcase: "warn"
  }
}
