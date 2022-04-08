import url from 'url'
import { config } from '@keystone-6/core'

import { lists } from './src/schema'
import { withSharedAuth } from './src/lib/auth'
import { getAbsoluteUrl } from './src/util/getAbsoluteUrl'

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
      publicPages: ['/api/sysinfo'],
      pageMiddleware: async ({ context, isValidSession }) => {
        const { req, session } = context
        const pathname = url.parse(req!.url!).pathname!

        if (isValidSession) {
          return
        }

        if (session && pathname !== '/no-access') {
          // Signed in but no access allowed
          return { kind: 'redirect', to: '/no-access' }
        } else if (session) {
          // Allow access to the no access page :)
          return
        }

        // If not other public paths & no session, redirect to login page
        if (pathname !== '/api/sysinfo') {
          // CYPRESS DEBUG ONLY
          return { kind: 'redirect', to: '/no-access' }

          /*
          const requestUrl = getAbsoluteUrl(req).origin
          const redirectUrl = `${requestUrl}${req!.url}`

          const to = `${
            process.env.PORTAL_URL
          }/login?redirectTo=${encodeURIComponent(redirectUrl)}`

          return { kind: 'redirect', to }
          */
        }
      },
      enableSessionItem: true,
      isAccessAllowed: ({ session }) => session?.accessAllowed === true,
    },
  })
)
