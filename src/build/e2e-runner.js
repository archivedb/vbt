// @flow

import path from 'path'
import chalk from 'chalk'
import spawn from 'cross-spawn'
import { existsSync } from 'fs'

import devServer from './dev-server'
import { buildRootPath } from '../utils/paths'

const options = [
  '--config', buildRootPath('config/nightwatch.js'),
  '--env', 'chrome',
]

// 'node_modules/nightwatch/lib/index.js'
const nightwatchPath = require.resolve('nightwatch')

const nightwatchExecPath = path.join(path.dirname(nightwatchPath), '../bin/nightwatch')

if (!existsSync(nightwatchExecPath)) {
  console.error(chalk.red(`can not access nightwatch at ${nightwatchExecPath}\n`))
  process.exit(1)
}

console.log(chalk.green(`using nightwatch at ${nightwatchExecPath}\n`))

export const start = async () => {
  // 1. start the dev server using production config
  await devServer.start()

  // 2. run the nightwatch test suite against it
  // to run in additional browsers:
  //    1. add an entry in config/nightwatch.js under 'test_settings'
  //    2. add it to the --env flag below
  // or override the environment flag, for example: `npm run e2e -- --env chrome,firefox`
  // for more information on nightwatch's config file, see
  // http://nightwatchjs.org/guide#settings-file
  const nightwatchProcess =
    spawn(nightwatchExecPath, options, { stdio: 'inherit' })

  nightwatchProcess.on('error', (e) => {
    devServer.close()
    throw e
  })

  nightwatchProcess.on('exit', (code) => {
    devServer.close()
    process.exit(code)
  })
}

export default { start }

if (require.main === module) {
  start()
}
