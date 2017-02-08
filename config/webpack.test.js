// @flow

import webpack from 'webpack'
import merge from 'webpack-merge'

import config from '../config'
import webpackBaseConfig from './webpack.base'
import { styleLoaders } from '../utils/webpack-assets'
import { stringifyObjectValues } from '../utils/object'

const webpackTestConfig = merge(webpackBaseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  devtool: '#inline-source-map',
  module: {
    rules: styleLoaders(),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': stringifyObjectValues(config.env),
    }),
  ],
})

// no need for app entry during tests
Reflect.deleteProperty(webpackTestConfig, 'entry')

export default webpackTestConfig
