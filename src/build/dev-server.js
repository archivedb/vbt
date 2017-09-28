// @flow

import opn from 'opn'
import http from 'http'
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import createDevMiddleware from 'webpack-dev-middleware'
import createHotMiddleware from 'webpack-hot-middleware'
import createProxyMiddleware from 'http-proxy-middleware'
import createHistoryApiFallback from 'connect-history-api-fallback'

import { dev as config } from '../config'

if (!process.env.NODE_ENV) process.env.NODE_ENV = config.env.NODE_ENV

const { default: webpackConfig } =
  process.env.NODE_ENV === 'testing'
    ? require('../config/webpack.prod')
    : require('../config/webpack.dev')

const app = express()
const compiler = webpack(webpackConfig)

// https://github.com/chimurai/http-proxy-middleware
Object.entries(config.proxyTable).forEach(([context, options]) => {
  app.use(createProxyMiddleware(
    (options: any).filter || context,
    typeof options === 'string' ? { target: options } : options,
  ))
})

const devMiddleware = createDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
})

const hotMiddleware = createHotMiddleware(compiler, {
  log: () => {},
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, callback) => {
    hotMiddleware.publish({ action: 'reload' })
    callback()
  })
})

// handle fallback for html5 history api
app.use(createHistoryApiFallback())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving compilation error display
app.use(hotMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.assetsPublicPath, config.assetsSubDirectory)

app.use(staticPath, express.static('./static'))

const server = http.createServer(app)

export const start = (): Promise<void> => new Promise((resolve, reject) => {
  server.listen(config.port, (e) => {
    if (e) reject(e)
    console.log(`> server started at port ${config.port}\n`)
  })

  devMiddleware.waitUntilValid(() => {
    const url = `http://localhost:${server.address().port}`
    console.log(`> listening at ${url}\n`)
    if (process.env.NODE_ENV === 'development') {
      opn(url)
    }
    resolve()
  })
})

export const close = () => {
  server.close()
}

export default {
  start,
  close,
}

if (require.main === module) {
  start()
}
