// @flow

import { projectPath } from '../utils/paths'
import { dynamicImportSync } from '../utils/dynamic-import'

export const getConfig = (name: string, defaultConfig: mixed = {}) => {
  const config =
    dynamicImportSync(projectPath(`config/${name}.js`)) ||
    dynamicImportSync(projectPath(`${name}.config.js`)) ||
    defaultConfig
  return config
}
