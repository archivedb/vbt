// @flow

import { readFileSync } from 'fs'
import eslintFriendlyFormatter from 'eslint-friendly-formatter'

import config from '../config'
import vueLoaderConfig from '../config/vue-loader'
import { projectPath } from '../build/paths'
import { assetsPath, mapObjectValues } from '../build/utils'

const projectPackageConfig =
  JSON.parse(readFileSync(projectPath('package.json'), 'utf-8'))

const makeEntryPathAbsolute = mapObjectValues(projectPath)

const entry = makeEntryPathAbsolute(projectPackageConfig.entry || {
  entry: {
    app: 'src/index.js',
  },
})

export default {
  entry,
  output: {
    path: config.assetsRoot,
    publicPath: config.assetsPublicPath,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.vue', '.js', '.ts', '.json'],
    modules: [
      projectPath('src'),
      projectPath('node_modules'),
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': projectPath('src'),
      'assets': projectPath('src/assets'),
    },
  },
  module: {
    rules: [{
      test: /\.(vue|jsx?)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      exclude: /node_modules/,
      options: { formatter: eslintFriendlyFormatter },
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      exclude: /node_modules/,
      options: vueLoaderConfig,
    }, {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.tsx?$/,
      use: [{
        loader: 'babel-loader',
      }, {
        loader: 'ts-loader',
      }],
      exclude: /node_modules/,
    }, {
      // TODO https://webpack.js.org/guides/migrating/#json-loader-is-not-required-anymore
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: assetsPath('images/[name].[hash:7].[ext]'),
      },
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: assetsPath('fonts/[name].[hash:7].[ext]'),
      },
    }],
  },
}
