import url from 'url'
import { config } from '@keystone-6/core'

import { lists } from './src/schema'
import { withSharedAuth } from './src/lib/auth'
import { getAbsoluteUrl } from './src/util/getAbsoluteUrl'
import { extendGraphqlSchema } from './src/lib/schema'
import redisClient from './src/lib/redis'
import { session } from './src/lib/session'

export default withSharedAuth(
  config({
    extendGraphqlSchema,
    lists,
    db: {
      provider: 'postgresql',
      url: `${process.env.DATABASE_URL}` || '',
      enableLogging: true,
      useMigrations: true,
      prismaPreviewFeatures: ['fullTextSearch'],
      async onConnect() {
        await redisClient.connect()
      },
    },
    // @ts-expect-error We use a custom SharedSessionStrategy that does not
    // include a `start` method. This makes the TS compiler angry,
    // but does not impact functionality.
    session,
    ui: {
      publicPages: ['/api/sysinfo', '/no-access'],
      pageMiddleware: async ({ context, isValidSession }) => {
        const { req, session } = context

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
        if (pathname !== '/api/sysinfo' && pathname !== '/no-access') {
          const requestUrl = getAbsoluteUrl(req).origin
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const redirectUrl = `${requestUrl}${req!.url}`

          const to = `${
            process.env.PORTAL_URL
          }/login?redirectTo=${encodeURIComponent(redirectUrl)}`

          return { kind: 'redirect', to }
        }
      },

      isAccessAllowed: ({ session }) => session?.accessAllowed === true,
    },
    server: {
      cors: {
        origin: `${process.env.PORTAL_URL}`,
      },
    },
  })
)
