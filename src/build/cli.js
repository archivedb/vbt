// @flow

export const run = (args: Array<string>) => {
  require('./check-versions').check()

  const command = args.slice(2).join(' ')

  switch (command) {
    case 'dev':
      process.env.NODE_ENV = 'development'
      require('./dev-server').start()
      break

    case 'test unit':
      process.env.NODE_ENV = 'testing'
      process.env.BABEL_ENV = 'testing'
      require('./unit-runner').start()
      break

    case 'test e2e':
      process.env.NODE_ENV = 'testing'
      process.env.PORT = '8070'
      require('./e2e-runner').start()
      break

    case 'build':
      process.env.NODE_ENV = 'production'
      require('./build').start()
      break

    default:
      // ignore
  }
}
