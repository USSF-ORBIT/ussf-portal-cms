/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { initLogger } = require('./logging')
require('dotenv').config()

const requireVars = [
  'DATABASE_URL',
  'PORTAL_URL',
  'REDIS_URL',
  'SESSION_SECRET',
  'SESSION_DOMAIN',
]

function startup() {
  initLogger()

  requireVars.forEach((v) => {
    if (process.env[`${v}`] === undefined) {
      throw new Error(
        `Startup Error: required environment variable ${v} is undefined`
      )
    }
  })
}

startup()
