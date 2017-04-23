// @flow

import webpack from 'webpack'
import merge from 'webpack-merge'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import { build as config } from '../config'
import { projectPath } from '../utils/paths'
import webpackBaseConfig from './webpack.base'
import { stringifyObjectValues } from '../utils/object'
import { generateAssetsPath, styleLoaders } from '../utils/webpack-assets'

const webpackProdConfig = merge(webpackBaseConfig, {
  devtool: config.productionSourceMap ? '#source-map' : false,
  module: {
    rules: styleLoaders({ sourceMap: config.productionSourceMap, extract: true }),
  },
  output: {
    path: config.assetsRoot,
    filename: generateAssetsPath('js/[name].[chunkhash].js'),
    chunkFilename: generateAssetsPath('js/[id].[chunkhash].js'),
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': stringifyObjectValues(config.env),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      sourceMap: true,
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: generateAssetsPath('css/[name].[contenthash].css'),
    }),
    // compress extracted css
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
      },
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlPlugin({
      filename: config.index,
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
    }),
    // split vendors js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: (module, count) => (
        // any required modules inside node_modules are extracted to vendors
        module.resource &&
          module.resource.endsWith('.js') &&
          module.resource.includes('node_modules')
      ),
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendors hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendors'],
    }),
    // copy custom static assets
    new CopyPlugin([{
      from: projectPath('static'),
      to: config.assetsSubDirectory,
      ignore: ['.*'],
    }]),
  ],
})

// https://github.com/th0r/webpack-bundle-analyzer
if (config.bundleAnalyzerReport) {
  webpackProdConfig.plugins.push(new BundleAnalyzerPlugin())
}

export default webpackProdConfig
