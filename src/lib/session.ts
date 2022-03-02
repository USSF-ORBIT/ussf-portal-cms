import * as cookie from 'cookie'
import type {
  SessionStoreFunction,
  SessionStrategy,
} from '@keystone-6/core/types'

import type { SessionData } from '../../types'
import redisClient from './redis'

const redisSessionStore = ({
  client,
}: {
  client: typeof redisClient
}): SessionStoreFunction => {
  return ({ maxAge }) => ({
    async connect() {
      await client.connect()
    },
    async get(key) {
      const result = await client.get(key)
      if (typeof result === 'string') {
        return JSON.parse(result)
      }
    },
    async set(key, value) {
      await client.setEx(key, maxAge, JSON.stringify(value))
    },
    async delete(key) {
      await client.del(key)
    },
    async disconnect() {
      await client.quit()
    },
  })
}

const MAX_AGE = 60 * 60 * 4
const TOKEN_NAME = 'sid' // The key used to store the session in Redis

export const sharedRedisSession = ({
  store: storeOption,
  maxAge = MAX_AGE,
}: {
  store: SessionStoreFunction
  maxAge?: number
}): SessionStrategy<SessionData> => {
  const store =
    typeof storeOption === 'function' ? storeOption({ maxAge }) : storeOption
  let isConnected = false

  return {
    async get({ req }) {
      const cookies = cookie.parse(req.headers.cookie || '')
      const token = cookies[TOKEN_NAME]

      if (!token) return

      if (!isConnected) {
        await store.connect?.()
        isConnected = true
      }

      // TODO - types
      const data = (await store.get(`sess:${token}`)) as SessionData | undefined
      return data
    },
    async start({ res, data, createContext }) {
      // TODO - this should never be use because session will always be started by the portal client
      console.log('start session', data)
      return ''
    },
    async end({ req, res, createContext }) {
      // TODO - log out
      console.log('end session')
    },
  }
}

export const session = sharedRedisSession({
  maxAge: 60 * 60 * 4, // 4 hours
  store: redisSessionStore({
    client: redisClient,
  }),
})
