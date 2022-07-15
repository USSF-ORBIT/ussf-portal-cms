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
  'S3_BUCKET_NAME',
  'S3_REGION',
  'S3_SECRET_ACCESS_KEY',
  'S3_ACCESS_KEY_ID',
  'ASSET_BASE_URL',
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
