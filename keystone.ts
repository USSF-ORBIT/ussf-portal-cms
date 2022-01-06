// https://keystonejs.com/docs/apis/config
import { config } from '@keystone-6/core'

import { lists } from './schema'
import { withAuth, session } from './auth'

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      provider: 'postgresql',
      url: 'postgres://keystone:keystonecms@localhost:5432/keystone',
      enableLogging: true,
      useMigrations: false, // TODO - set to true after deploying
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
  })
)
