// @flow

import chalk from 'chalk'
import semver from 'semver'
import childprocess from 'child_process'

const exec = (cmd) =>
  childprocess.execSync(cmd).toString().trim()

export const check = async () => {
  const versionRequirements = [{
    name: 'node',
    current: semver.clean(process.version),
    requirement: '>= 4.0.0',
  }, {
    name: 'npm',
    current: exec('npm --version'),
    requirement: '>= 3.0.0',
  }]

  const warnings = versionRequirements.reduce((warnings, mod) => (
    semver.satisfies(mod.current, mod.requirement)
      ? warnings
      : warnings.concat(
        [`${mod.name}: ${chalk.red(mod.current)} should be ${chalk.green(mod.requirement)}`]
      )
  ), [])

  if (warnings.length > 0) {
    console.log('')
    console.log(chalk.yellow('to use this template, you must update following to modules:'))
    console.log()
    warnings.forEach((warning) => {
      console.log('  ' + warning)
    })
    console.log()
    process.exit(1)
  }
}

export default { check }

if (require.main === module) {
  check()
}
