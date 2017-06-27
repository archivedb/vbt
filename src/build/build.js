// @flow

import ora from 'ora'
import path from 'path'
import chalk from 'chalk'
import trash from 'trash'
import webpack from 'webpack'

import { build as config } from '../config'
import webpackConfig from '../config/webpack.prod'

export const start = async () => {
  const spinner = ora('building for production..')

  spinner.start()

  await trash([path.join(config.assetsRoot, config.assetsSubDirectory)])

  webpack(webpackConfig, (e, stats) => {
    spinner.stop()
    if (e) throw e

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
