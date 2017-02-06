// @flow

import merge from 'webpack-merge'
import devEnv from './env.dev'

export default merge(devEnv, {
  NODE_ENV: 'testing',
})
