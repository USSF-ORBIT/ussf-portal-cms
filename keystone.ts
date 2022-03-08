import { config } from '@keystone-6/core'

import { lists } from './src/schema'
// import { withSharedAuth } from './src/lib/auth'

export default config({
  lists,
  db: {
    provider: 'postgresql',
    url: `${process.env.DATABASE_URL}` || '',
    enableLogging: true,
    useMigrations: false, // TODO - set to true after deploying
  },
  ui: {
    publicPages: ['/custom-page'],
    // TODO - add redirect here if no session
    // pageMiddleware: async ({ context, isValidSession }) => {},
    isAccessAllowed: (context) => {
      console.log('IMAGE TAG', process.env.IMAGE_TAG)
      console.log('check for session', context.session)
      // return true
      return !!context.session
    },
  },
})
