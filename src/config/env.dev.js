// @flow

import merge from 'webpack-merge'
import prodEnv from './env.prod'
import { loadConfig } from '../utils/load-config'

export default merge(prodEnv, loadConfig('env.dev', {
  NODE_ENV: 'development',
}))
