import { existsSync } from 'fs'
import { projectPath } from '../build/paths'

const proxyConfigFile = projectPath('proxy.config.js')

const proxy = existsSync(proxyConfigFile) ? require(proxyConfigFile).default : {}

export default proxy
