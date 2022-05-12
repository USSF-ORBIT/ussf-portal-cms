import type { KeystoneConfig, SessionStrategy } from '@keystone-6/core/types'
import { graphQLSchemaExtension } from '@keystone-6/core'

import type { Context } from '.keystone/types'

import type {
  SessionData,
  KeystoneUser,
  ValidSession,
  InvalidSession,
} from '../../types'
import { canAccessCMS, isCMSAdmin } from '../util/auth'

import { session, SharedSessionStrategy } from './session'

const withAuthData = (
  _sessionStrategy: SharedSessionStrategy<SessionData>
): SessionStrategy<ValidSession | InvalidSession> => {
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

      const invalidSession: InvalidSession = { accessAllowed: false }

      try {
        // Determine access based on SAML session data
        const userHasAccess = canAccessCMS(user)
        const userIsAdmin = isCMSAdmin(user)

        // Look up Keystone user
        let keystoneUser = (await sudoContext.query.User.findOne({
          where: { userId: user.userId },
          query: `id userId name role isAdmin isEnabled`,
        })) as KeystoneUser

        if (!userHasAccess && !keystoneUser) {
          // NO ACCESS
          return invalidSession
        }

        if (userHasAccess && !keystoneUser) {
          // No existing user, create one
          const {
            attributes: { givenname, surname },
          } = user

          keystoneUser = (await sudoContext.query.User.createOne({
            data: {
              name: `${givenname} ${surname}`,
              userId: user.userId,
              isAdmin: userIsAdmin,
              isEnabled: userHasAccess,
            },
            query: `id userId name role isAdmin isEnabled`,
          })) as KeystoneUser

          return {
            ...user,
            ...keystoneUser,
            accessAllowed: true,
            itemId: keystoneUser.id,
            listKey: 'User',
          }
        } else {
          // keep isEnabled & isAdmin in sync with SAML session data
          keystoneUser = (await sudoContext.query.User.updateOne({
            where: { userId: user.userId },
            data: {
              isEnabled: userHasAccess,
              isAdmin: userIsAdmin,
              syncedAt: new Date(),
            },
            query: `id userId name role isAdmin isEnabled`,
          })) as KeystoneUser

          return userHasAccess
            ? {
                ...user,
                ...keystoneUser,
                accessAllowed: true,
                itemId: keystoneUser.id,
                listKey: 'User',
              }
            : invalidSession
        }
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
            label: user.userId,
            itemId: user.id,
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
