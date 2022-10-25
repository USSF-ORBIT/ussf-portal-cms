/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'
const { spawnSync } = require('child_process')

const child = spawnSync(
  './node_modules/.bin/keystone',
  ['prisma', 'migrate', 'deploy'],
  { encoding: 'utf-8' }
)
console.log('error', child.error)
console.log('stdout ', child.stdout)
console.log('stderr ', child.stderr)
