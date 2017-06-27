// @flow

import { loadConfig } from '../utils/load-config'

export default loadConfig('env.prod', {
  NODE_ENV: 'production',
})
