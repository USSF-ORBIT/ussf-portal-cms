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
      // TODO - add redirect here if no session
      // pageMiddleware: () => {},
      isAccessAllowed: (context) => {
        return !!context.session
      },
    },
  })
)
