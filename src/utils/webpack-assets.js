// @flow

import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import config from '../config'

export const generateAssetsPath = (name: string) =>
  path.posix.join(config.assetsSubDirectory, name)

export const vueCssLoaders = (options: Object = {}) => {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap,
    },
  }

  // generate loader string to be used with extract text plugin
  const generateLoaders = (loader?: string, loaderOptions: Object = {}) => {
    let loaders = [cssLoader]

    if (loader) {
      loaders = loaders.concat([{
        loader: `${loader}-loader`,
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      }])
    }

    // extract css when that option is specified
    // (which is the case during production build)
    // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus'),
  }
}

// generate loaders for standalone style files (outside of .vue)
export const styleLoaders = (options: Object = {}) =>
  Object.entries(vueCssLoaders(options)).
    map(([extension, loader]) => ({
      test: new RegExp('\\.' + extension + '$'),
      use: loader,
    }))
