// @flow

import autoprefixer from 'autoprefixer'

import config from '../config'
import { vueCssLoaders } from '../utils/webpack-assets'

// check env & config/index.js to decide whether to enable css source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
const cssSourceMapDev =
  process.env.NODE_ENV === 'development' && config.cssSourceMap || false
const cssSourceMapProd =
  process.env.NODE_ENV === 'production' && config.productionSourceMap || false
const cssSourceMap = cssSourceMapDev || cssSourceMapProd

export default {
  loaders: vueCssLoaders({
    sourceMap: cssSourceMap,
    extract: process.env.NODE_ENV === 'production',
  }),
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions'],
    }),
  ],
}
