/*
This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options here: https://keystonejs.com/docs/apis/config
*/

import { config } from '@keystone-6/core'
import type { KeystoneContext } from '@keystone-6/core/types'
// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from './src/schema'

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from './src/lib/auth'

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    lists,
    db: {
      provider: 'postgresql',
      url: `${process.env.DATABASE_URL}` || '',
      enableLogging: true,
      useMigrations: false, // TODO - set to true after deploying
      onConnect: async ({ db }: KeystoneContext) => {
        // Create test user here
        // #TODO: Remove this when we have auth in place
        const testUser = await db.User.findOne({
          where: { email: process.env.TEST_EMAIL },
        })
        if (!testUser) {
          await db.User.createOne({
            data: {
              name: process.env.TEST_USERNAME || '',
              password: process.env.TEST_PASSWORD,
              email: process.env.TEST_EMAIL,
            },
          })
        }
      },
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data,
    },
    session,
  })
)
