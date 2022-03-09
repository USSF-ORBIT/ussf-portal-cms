import * as cookie from 'cookie'
import type {
  SessionStoreFunction,
  SessionStrategy,
} from '@keystone-6/core/types'
import { unsign } from 'cookie-signature'

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

const TOKEN_NAME = 'sid' // The key used to store the session in Redis

const SESSION_SECRET = `${process.env.SESSION_SECRET}`
const SESSION_DOMAIN = process.env.SESSION_DOMAIN || 'localhost'
const SESSION_EXPIRATION = 60 * 60 * 4 // 4 hours

// The shared session strategy will never "start" a new session
export type SharedSessionStrategy<T> = Omit<SessionStrategy<T>, 'start'>

export const sharedRedisSession = ({
  store: storeOption,
  maxAge = SESSION_EXPIRATION,
  path = '/',
  secure = process.env.NODE_ENV === 'production',
  domain = SESSION_DOMAIN,
  sameSite = 'strict',
}: {
  store: SessionStoreFunction
  maxAge?: number
  path?: string
  secure?: boolean
  domain?: string
  sameSite?: true | false | 'lax' | 'strict' | 'none'
}): SharedSessionStrategy<SessionData> => {
  const store =
    typeof storeOption === 'function' ? storeOption({ maxAge }) : storeOption
  let isConnected = false

  return {
    // Get session out of Redis store
    async get({ req }) {
      const cookies = cookie.parse(req.headers.cookie || '')
      const token = cookies[`${TOKEN_NAME}`]

      // No matching cookie
      if (!token) return

      if (!isConnected) {
        await store.connect?.()
        isConnected = true
      }

      const unsigned = unsign(token, SESSION_SECRET)

      const data =
        ((await store.get(`sess:${unsigned}`)) as unknown as SessionData) ||
        undefined

      return data
    },

    // Delete session from Redis store
    async end({ req, res }) {
      const cookies = cookie.parse(req.headers.cookie || '')
      const token = cookies[`${TOKEN_NAME}`]

      if (!token) return

      if (!isConnected) {
        await store.connect?.()
        isConnected = true
      }

      await store.delete(`sess:${token}`)

      res.setHeader(
        'Set-Cookie',
        cookie.serialize(TOKEN_NAME, '', {
          maxAge: 0,
          expires: new Date(),
          httpOnly: true,
          secure,
          path,
          sameSite,
          domain,
        })
      )
    },
  }
}

export const session = sharedRedisSession({
  maxAge: 60 * 60 * 4, // 4 hours
  store: redisSessionStore({
    client: redisClient,
  }),
})
