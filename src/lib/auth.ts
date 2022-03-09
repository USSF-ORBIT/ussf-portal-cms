import type { KeystoneConfig, SessionStrategy } from '@keystone-6/core/types'
import { graphQLSchemaExtension } from '@keystone-6/core'

import type { SessionData, KeystoneUser, AuthenticatedUser } from '../../types'
import { canAccessCMS, isCMSAdmin } from '../util/access'

import { session, SharedSessionStrategy } from './session'
import type { Context } from '.keystone/types'

const withAuthData = (
  _sessionStrategy: SharedSessionStrategy<SessionData>
): SessionStrategy<AuthenticatedUser> => {
  const { get, ...sessionStrategy } = _sessionStrategy

  // This loads the Keystone user from Postgres & adds to session
  return {
    ...sessionStrategy,
    start: () => {
      // The shared session strategy should never "start" a new session
      // this method should never be called but needs to exist to appease Keystone types
      return Promise.reject(
        new Error('ERROR: Invalid attempt to start a new session in Keystone')
      )
    },
    get: async ({ req, createContext }) => {
      const sessionData = await get({ req, createContext })
      const sudoContext = createContext({ sudo: true })

      if (
        !sessionData ||
        !sessionData.passport ||
        !sessionData.passport.user ||
        !sessionData.passport.user.userId ||
        !sudoContext.query.User
      ) {
        return
      }

      const {
        passport: { user },
      } = sessionData

      if (!canAccessCMS(user)) {
        // NO ACCESS - redirect/error message?
        return
      }

      try {
        // Look up Keystone user
        // TODO - filter on isEnabled: true
        const keystoneUser = (await sudoContext.query.User.findOne({
          where: { userId: user.userId },
          query: `id userId name isAdmin isEnabled`,
        })) as KeystoneUser

        if (!keystoneUser) {
          const {
            attributes: { givenname, surname },
          } = user

          const keystoneUser = (await sudoContext.query.User.createOne({
            data: {
              name: `${givenname} ${surname}`,
              userId: user.userId,
              isAdmin: isCMSAdmin(user),
              isEnabled: true,
            },
            query: `id userId name isAdmin isEnabled`,
          })) as KeystoneUser

          return { ...user, ...keystoneUser }
        }

        return { ...user, ...keystoneUser }
      } catch (e) {
        // Prisma error most likely
        console.error(e)
        throw e
      }
    },
  }
}

const extendGraphqlSchema = graphQLSchemaExtension<Context>({
  typeDefs: `
    type Query {
      """ Authenticated Item """
      authenticatedItem: AuthenticatedItem
    }

    union AuthenticatedItem = User
  `,
  resolvers: {
    Query: {
      authenticatedItem: async (root, args, { session, db }) => {
        if (typeof session?.userId === 'string') {
          const user = await db.User.findOne({
            where: { userId: session.userId },
          })

          return {
            __typename: 'User',
            listKey: 'User',
            label: session.userId,
            itemId: session.id,
            ...user,
          }
        }

        return null
      },
    },
  },
})

export const withSharedAuth = (
  keystoneConfig: KeystoneConfig
): KeystoneConfig => {
  const sessionWithUser = withAuthData(session)

  return {
    ...keystoneConfig,
    session: sessionWithUser,
    extendGraphqlSchema,
  }
}
