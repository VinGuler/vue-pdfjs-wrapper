module.exports = {
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },

  root: true,

  env: {
    node: true
  },

  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],

  "ignorePatterns": ["dist/**", "**/vendor/*.js"],

  parserOptions: {
    parser: 'babel-eslint'
  }
}
