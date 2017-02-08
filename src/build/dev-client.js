// https://github.com/glenjamin/webpack-hot-middleware#client

require('eventsource-polyfill')

const client = require('webpack-hot-middleware/client?noInfo=true&reload=true')

client.subscribe((event) => {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
