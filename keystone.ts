import url from 'url'
import { config } from '@keystone-6/core'

import { lists } from './src/schema'
import { withSharedAuth } from './src/lib/auth'
import { extendGraphqlSchema } from './src/lib/schema'
import redisClient from './src/lib/redis'
import { session } from './src/lib/session'

const {
  S3_BUCKET_NAME: bucketName,
  S3_REGION: region,
  S3_ACCESS_KEY_ID: accessKeyId,
  S3_SECRET_ACCESS_KEY: secretAccessKey,
  ASSET_BASE_URL: baseUrl,
} = process.env

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
    storage: {
      cms_images: {
        kind: 's3',
        type: 'image',
        bucketName: bucketName || '',
        region: region || '',
        accessKeyId: accessKeyId || '',
        secretAccessKey: secretAccessKey || '',
        signed: { expiry: 5000 },
      },
      local_images: {
        kind: 'local',
        type: 'image',
        generateUrl: (path: string) => `${baseUrl}/images${path}`,
        serverRoute: {
          path: '/images',
        },
        storagePath: 'public/images',
      },
      cms_files: {
        kind: 's3',
        type: 'file',
        bucketName: bucketName || '',
        region: region || '',
        accessKeyId: accessKeyId || '',
        secretAccessKey: secretAccessKey || '',
        signed: { expiry: 5000 },
      },
      local_files: {
        kind: 'local',
        type: 'file',
        generateUrl: (path: string) => `${baseUrl}/files${path}`,
        serverRoute: {
          path: '/files',
        },
        storagePath: 'public/files',
      },
    },
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
          // getAbsoluteUrl gets full path to CMS
          // however, client knows the full path so we are just passing /cms
          // this is so we can restrict the locations the client
          // will redirect to as local to the portal or approved places like the cms
          // const requestUrl = getAbsoluteUrl(req).origin
          const requestUrl = '/cms'
          // Following adds the path that a user was attempting to reach to the end
          // of the info passed to the login flow
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
