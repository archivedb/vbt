// @flow

import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlPlugin from 'html-webpack-plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'

import { dev as config } from '../config'
import { buildRootPath } from '../build/paths'
import { styleLoaders, mapObjectValues, stringifyObjectValues } from '../build/utils'
import webpackBaseConfig from './webpack.base'

const addDevClientToEntry =
  mapObjectValues(v => [v].concat(buildRootPath('build/dev-client')))

export default merge(webpackBaseConfig, {
  devtool: '#cheap-module-eval-source-map',
  entry: addDevClientToEntry(webpackBaseConfig.entry),
  module: {
    rules: styleLoaders({ sourceMap: config.cssSourceMap }),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': stringifyObjectValues(config.env),
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlPlugin({
      filename: config.index,
      template: 'src/index.html',
      inject: true,
    }),
    new FriendlyErrorsPlugin(),
  ],
})
