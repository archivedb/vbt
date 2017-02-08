// @flow

import path from 'path'

// 'node_modules/vbt/src'
export const buildRootPath = (...paths: Array<string>) =>
  path.join(__dirname, '..', ...paths)

export const projectPath = (...paths: Array<string>) =>
  path.join(process.cwd(), ...paths)
