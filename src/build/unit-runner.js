// @flow

import karma from 'karma'
import { buildRootPath } from '../utils/paths'

const options = {
  configFile: buildRootPath('config/karma.js'),
  singleRun: true,
}

export const start = (): Promise<void> => new Promise((resolve, reject) => {
  // https://karma-runner.github.io/latest/dev/public-api.html
  const server = new karma.Server(options, resolve)

  server.start()
})

export default { start }

if (require.main === module) {
  start()
}
