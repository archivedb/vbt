// @flow

require('../utils/register')

const fs = require('fs')
const chromedriver = require('chromedriver')
const seleniumServer = require('selenium-server')
const { dev: config } = require('../config')
const { projectPath } = require('../utils/paths')

const customCommandsPath = [projectPath('test/e2e/commands')].filter(fs.existsSync)

const customAssertionsPath = [projectPath('test/e2e/assertions')].filter(fs.existsSync)

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: [projectPath('test/e2e/specs')],
  output_folder: projectPath('test/e2e/reports'),
  custom_commands_path: [projectPath('node_modules/nightwatch-helpers/commands')].concat(customCommandsPath),
  custom_assertions_path: [projectPath('node_modules/nightwatch-helpers/assertions')].concat(customAssertionsPath),

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
