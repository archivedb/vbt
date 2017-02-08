// @flow

require('babel-register')({
  babelrc: false,
  plugins: [
    'transform-flow-strip-types',
    'transform-object-rest-spread',
    'transform-es2015-modules-commonjs',
  ],
  ignore: (filename) => (
    filename.includes('node_modules') && !filename.includes('node_modules/vbt')
  ),
})
