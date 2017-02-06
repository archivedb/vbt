// @flow

import merge from 'webpack-merge'
import prodEnv from './env.prod'

export default merge(prodEnv, {
  NODE_ENV: 'development',
})
