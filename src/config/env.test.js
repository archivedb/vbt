// @flow

import merge from 'webpack-merge'
import devEnv from './env.dev'
import { loadConfig } from '../utils/load-config'

export default merge(devEnv, loadConfig('env.test', {
  NODE_ENV: 'testing',
}))
