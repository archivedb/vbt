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

  return new Promise((resolve, reject) =>
    webpack(webpackConfig, (e, stats) => {
      spinner.stop()
      if (e) throw e

      console.log(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }))

      if (stats.hasErrors()) {
        console.log(chalk.red(`
          Build failed with errors.
          ${stats.toJson().errors}
        `))
        resolve(1)
      } else {
        console.log(chalk.cyan(`
          Build complete.
        `.trimRight()))
        console.log(chalk.yellow(`
          Tips:
            Built files are meant to be served over an http server.
            Open index.html over file:// won't work.
        `))
        resolve(0)
      }
    })
  )
}

export default { start }

if (require.main === module) {
  start()
}
