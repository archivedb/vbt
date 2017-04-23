// @flow

import ora from 'ora'
import path from 'path'
import chalk from 'chalk'
import rimraf from 'rimraf'
import webpack from 'webpack'

import { build as config } from '../config'
import webpackConfig from '../config/webpack.prod'

export const start = () => {
  const spinner = ora('building for production..')

  spinner.start()

  rimraf.sync(path.join(config.assetsRoot, config.assetsSubDirectory))

  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n')

    console.log(chalk.cyan(`
      Build complete.
    `.trimRight()))
    console.log(chalk.yellow(`
      Tips:
        Built files are meant to be served over an http server.
        Open index.html over file:// won't work.
    `))
  })
}

export default { start }

if (require.main === module) {
  start()
}
