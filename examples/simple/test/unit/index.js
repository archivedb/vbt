import 'src/polyfills'
import 'src/vendors'

// https://webpack.github.io/docs/context.html

// require all src files except app entry and *.html for coverage
const srcContext = require.context('src', true, /^\.\/(?!(?:index(?:\.js)?$)|(?:.+\.html$))/)
srcContext.keys().map(srcContext)

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().map(testsContext)
