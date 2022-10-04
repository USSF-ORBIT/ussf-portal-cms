/* eslint-disable @typescript-eslint/no-var-requires */

const { exec } = require('child_process')
exec('/app/node_modules/.bin/prisma migrate deploy', (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)
})
