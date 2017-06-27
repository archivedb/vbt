// @flow

export const run = async (args: Array<string>) => {
  await require('./check-versions').check()

  const command = args.slice(2).join(' ')

  switch (command) {
    case 'dev':
      process.env.NODE_ENV = 'development'
      await require('./dev-server').start()
      break

    case 'test':
      process.env.NODE_ENV = 'testing'
      process.env.BABEL_ENV = 'testing'
      process.env.PORT = '8070'
      await require('./unit-runner').start()
      await require('./e2e-runner').start()
      break

    case 'test unit':
      process.env.NODE_ENV = 'testing'
      process.env.BABEL_ENV = 'testing'
      await require('./unit-runner').start()
      break

    case 'test e2e':
      process.env.NODE_ENV = 'testing'
      process.env.PORT = '8070'
      await require('./e2e-runner').start()
      break

    case 'build':
      process.env.NODE_ENV = 'production'
      await require('./build').start()
      break

    default:
      // ignore
  }
}
