// @flow

import { projectPath } from '../utils/paths'
import { dynamicImportSync } from '../utils/dynamic-import'

export const loadConfig = <A: Object>(name: string, defaults: A): A =>
  Object.assign({}, defaults,
    dynamicImportSync(projectPath(`config/${name}.js`)) ||
    dynamicImportSync(projectPath(`${name}.config.js`)) ||
    {}
  )
