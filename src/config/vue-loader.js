// @flow

import config from '../config'
import { vueCssLoaders } from '../utils/webpack-assets'

// check env & config/index.js to decide whether to enable css source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
const cssSourceMap =
  process.env.NODE_ENV === 'production'
    ? (config.productionSourceMap || false)
    : (config.cssSourceMap || false)

export default {
  loaders: vueCssLoaders({
    sourceMap: cssSourceMap,
    extract: process.env.NODE_ENV === 'production',
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href',
  },
}
