// @flow

import { projectPath } from '../utils/paths'
import { dynamicImportSync } from '../utils/dynamic-import'

export const getConfig = (name: string, defaultConfig: mixed = {}) => {
  const config =
    dynamicImportSync(projectPath(`${name}.config.js`)) ||
    dynamicImportSync(projectPath(`config/${name}.js`)) ||
    defaultConfig
  return config
}
