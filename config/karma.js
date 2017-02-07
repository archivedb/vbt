// @flow

import { projectPath } from '../build/paths'
import webpackTestConfig from './webpack.test'

const entry = projectPath('test/unit/index.js')

// https://github.com/webpack/karma-webpack/
// https://karma-runner.github.io/latest/config/configuration-file.html
module.exports = (config: any) => {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    https://karma-runner.github.io/latest/config/browsers.html
    // 2. add it to the `browsers` array below
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: [entry],
    preprocessors: {
      [entry]: ['webpack', 'sourcemap'],
    },
    webpack: webpackTestConfig,
    webpackMiddleware: { noInfo: true },
    coverageReporter: {
      dir: projectPath('test/unit/coverage'),
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' },
      ],
    },
  })
}
