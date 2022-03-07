/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { initLogger } = require('./logging')

function startup() {
  initLogger()
}

startup()
