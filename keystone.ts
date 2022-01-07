import { createClient } from 'redis'
// https://keystonejs.com/docs/apis/config
import { config } from '@keystone-6/core'
import { redisSessionStore } from '@keystone-6/session-store-redis'

import { lists } from './schema'

import { withAuth, sharedSession } from './sharedAuth'

const redisClient = createClient({
  url: 'redis://localhost:6379', // process.env.REDIS_URL,
})

redisClient.on('error', function (err) {
  // TODO - error handling
  // eslint-disable-next-line no-console
  console.error('Could not connect to redis', err)
})

redisClient.on('connect', function () {
  // eslint-disable-next-line no-console
  console.log('Connected to Redis successfully')
})

export default withAuth(
  config({
    server: {
      port: 4000,
    },
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
      isAccessAllowed: (context) => {
        console.log('check for session', context.session)
        // TODO - check the user ivgroups here for access
        return !!context.session?.passport?.user
      },
    },
    lists,
    session: sharedSession({
      secret: 'keyboardcatkeyboardcatkeyboardcat',
      maxAge: 60 * 60 * 4, // 4 hours
      secure: process.env.NODE_ENV === 'production',
      store: redisSessionStore({
        client: redisClient,
      }),
    }),
  })
)
