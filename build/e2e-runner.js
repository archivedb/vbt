// @flow

import spawn from 'cross-spawn'
import devServer from './dev-server'

const options = [
  '--config', 'config/nightwatch.js',
  '--env', 'chrome',
]

export const start = () => {
  // 1. start the dev server using production config
  devServer.start()

  // 2. run the nightwatch test suite against it to run in additional browsers:
  //    1. add an entry in config/nightwatch.js under 'test_settings'
  //    2. add it to the --env flag below
  // or override the environment flag, for example: `npm run e2e -- --env chrome,firefox`
  // for more information on nightwatch's config file, see
  // http://nightwatchjs.org/guide#settings-file
  const runner = spawn('node_modules/.bin/nightwatch', options, { stdio: 'inherit' })

  runner.on('error', (err) => {
    devServer.close()
    throw err
  })

  runner.on('exit', (code) => {
    devServer.close()
    process.exit(code)
  })
}

export default { start }

if (require.main === module) {
  start()
}
