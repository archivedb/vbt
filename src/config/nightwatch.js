// @flow

require('../utils/register')

const chromedriver = require('chromedriver')
const seleniumServer = require('selenium-server')
const { dev: config } = require('../config')
const { projectPath } = require('../utils/paths')

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: [projectPath('test/e2e/specs')],
  output_folder: projectPath('test/e2e/reports'),
  custom_commands_path: [projectPath('node_modules/nightwatch-helpers/commands'), projectPath('test/e2e/commands')],
  custom_assertions_path: [projectPath('node_modules/nightwatch-helpers/assertions'), projectPath('test/e2e/assertions')],

  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': chromedriver.path,
    },
  },

  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      globals: {
        devServerUrl: `http://localhost:${config.port}`,
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },
  },
}
