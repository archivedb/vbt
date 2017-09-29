// https://github.com/standard/eslint-config-standard/blob/master/eslintrc.json
module.exports = {
  root: true,
  extends: 'standard',
  parser: 'babel-eslint',
  plugins: [
    'html',
  ],
  rules: {
    'no-unused-vars': [1],
    'comma-dangle': [2, 'always-multiline'],
    'dot-location': [2, 'object'],
    'linebreak-style': [2, 'unix'],
    'space-before-function-paren': [2, { 'named': 'never' }],
  },
}
