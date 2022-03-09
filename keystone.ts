import { config } from '@keystone-6/core'

import { lists } from './src/schema'
import { withSharedAuth } from './src/lib/auth'

export default withSharedAuth(
  config({
    lists,
    db: {
      provider: 'postgresql',
      url: `${process.env.DATABASE_URL}` || '',
      enableLogging: true,
      useMigrations: true,
    },
    ui: {
      /*
      pageMiddleware: async ({ context, isValidSession }) => {
      // TODO - add redirect to portal login here if no session
      },
      */
      enableSessionItem: true,
      isAccessAllowed: ({ session }) => !!session,
    },
  })
)
