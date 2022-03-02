import type {
  KeystoneConfig,
  SessionStoreFunction,
  SessionStrategy,
} from '@keystone-6/core/types'

import type { SessionData, KeystoneUser, AuthenticatedUser } from '../../types'
import { session } from './session'

const USER_NAME_ID_FIELD = 'userId'
const USER_LIST_KEY = 'User'

const withAuthData = (
  _sessionStrategy: SessionStrategy<SessionData>
): SessionStrategy<AuthenticatedUser> => {
  const { get, ...sessionStrategy } = _sessionStrategy

  // This loads the Keystone user from Postgres & adds to session
  return {
    ...sessionStrategy,
    get: async ({ req, createContext }) => {
      const sessionData = await get({ req, createContext })
      const sudoContext = createContext({ sudo: true })

      if (
        !sessionData ||
        !sessionData.passport ||
        !sessionData.passport.user ||
        !sessionData.passport.user.userId ||
        !sudoContext.query[USER_LIST_KEY]
      ) {
        return
      }

      try {
        const {
          passport: { user },
        } = sessionData

        // Look up Keystone user
        const data = await sudoContext.query[USER_LIST_KEY].findOne({
          where: { nameId: user.userId },
          query: `id nameId name isAdmin isEnabled`,
        })

        if (!data) {
          console.log('No user in Keystone exists, create one')
          // TODO - check access!
          const keystoneUser = await sudoContext.query[USER_LIST_KEY].createOne(
            {
              data: {
                name: 'Test User',
                nameId: user.userId,
                isAdmin: true,
                isEnabled: true,
              },
              query: `id nameId name isAdmin isEnabled`,
            }
          )

          return { ...user, ...keystoneUser }
        }

        return { ...user, ...data }
      } catch (e) {
        // ?
        console.log(e)
        return
      }
    },
  }
}

// const checkSessionAccess = sessionUser

export const withSharedAuth = (
  keystoneConfig: KeystoneConfig
): KeystoneConfig => {
  const sessionWithUser = withAuthData(session)

  return {
    ...keystoneConfig,
    session: sessionWithUser,
  }
}
