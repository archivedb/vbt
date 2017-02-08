// @flow

import karma from 'karma'
import { buildRootPath } from '../utils/paths'

const options = {
  configFile: buildRootPath('config/karma.js'),
  singleRun: true,
}

// https://karma-runner.github.io/latest/dev/public-api.html
const server = new karma.Server(options)

export const start = () => {
  server.start()
}

export default { start }

if (require.main === module) {
  start()
}
