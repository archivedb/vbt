// @flow

export const run = async (args: Array<string>) => {
  await require('./check-versions').check()

  const command = args.slice(2).join(' ')

  let exitCode = 0

  switch (command) {
    case 'dev':
      process.env.NODE_ENV = 'development'
      await require('./dev-server').start()
      // avoid exiting immediately
      await (new Promise(() => {}))
      break

    case 'test':
      process.env.NODE_ENV = 'testing'
      process.env.BABEL_ENV = 'testing'
      process.env.PORT = '8070'
      exitCode += await require('./unit-runner').start()
      exitCode += await require('./e2e-runner').start()
      break

    case 'test unit':
      process.env.NODE_ENV = 'testing'
      process.env.BABEL_ENV = 'testing'
      exitCode += await require('./unit-runner').start()
      break

    case 'test e2e':
      process.env.NODE_ENV = 'testing'
      process.env.PORT = '8070'
      exitCode += await require('./e2e-runner').start()
      break

    case 'build':
      process.env.NODE_ENV = 'production'
      exitCode += await require('./build').start()
      break

    default:
      // ignore
  }

  return exitCode
}

if (require.main === module) {
  run(process.argv).then(process.exit)
}
