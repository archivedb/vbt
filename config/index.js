// @flow

// https://vuejs-templates.github.io/webpack/

import chalk from 'chalk'
import devEnv from './env.dev'
import prodEnv from './env.prod'
import testEnv from './env.test'
import { getConfig } from '../utils/get-config'
import { projectPath } from '../utils/paths'

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

console.log(chalk.green(`[config] NODE_ENV ${process.env.NODE_ENV}\n`))

const base = {
  assetsPublicPath: '/',
  assetsSubDirectory: 'static',
  assetsRoot: projectPath('dist'),
  index: process.env.NODE_ENV === 'production'
    ? projectPath('dist/index.html')
    : 'index.html',
}

export const build = {
  ...base,
  env: process.env.NODE_ENV === 'testing' ? testEnv : prodEnv,
  productionSourceMap: true,
  bundleAnalyzerReport: process.env.npm_config_report,
}

export const dev = {
  ...base,
  env: devEnv,
  port: Number(process.env.PORT || 8080),
  proxyTable: getConfig('proxy'),
  // css sourcemaps off by default because relative paths are "buggy"
  // with this option, according to the css-loader readme
  // (https://github.com/webpack/css-loader#sourcemaps)
  // in our experience, they generally work as expected,
  // just be aware of this issue when enabling this option
  cssSourceMap: false,
}

export default process.env.NODE_ENV === 'development' ? dev : build
