// @flow

import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import config from '../config'

export const assetsPath = (name: string) =>
  path.posix.join(config.assetsSubDirectory, name)

export const vueCssLoaders = (options: Object = {}) => {
  // generate loader string to be used with extract text plugin
  const generateLoaders = (loaders) => {
    const sourceLoader = loaders.
      map((loader) =>
        loader.includes('?')
          ? (loader.replace(/\?/, '-loader?') + (options.sourceMap ? '&sourceMap' : ''))
          : (loader + '-loader' + (options.sourceMap ? '?sourceMap' : ''))
      ).
      join('!')

    // extract css when that option is specified
    // (which is the case during production build)
    // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
    return options.extract
      ? ExtractTextPlugin.extract({ use: sourceLoader, fallback: 'vue-style-loader' })
      : ['vue-style-loader', sourceLoader].join('!')
  }

  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus']),
  }
}

// generate loaders for standalone style files (outside of .vue)
export const styleLoaders = (options: Object = {}) =>
  Object.entries(vueCssLoaders(options)).
    map(([extension, loader]) => ({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader,
    }))

export const mapObjectValues = (f: (v: any) => any) => (o: Object) =>
  Object.entries(o).
    map(([k, v]) => ({ [k]: f(v) })).
    reduce((z, o) => Object.assign(z, o), {})

export const stringifyObjectValues =
  mapObjectValues(v => JSON.stringify(v))
