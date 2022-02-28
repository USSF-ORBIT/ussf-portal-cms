import * as cookie from 'cookie'
import type {
  JSONValue,
  KeystoneConfig,
  SessionStoreFunction,
  SessionStrategy,
} from '@keystone-6/core/types'

import redisClient from './redis'

export const withAuth = (keystoneConfig: KeystoneConfig): KeystoneConfig => {
  return {
    ...keystoneConfig,
  }
}

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

const useSession = ({
  store: storeOption,
  secret,
  maxAge,
}: {
  store: SessionStoreFunction
  secret: string
  maxAge: number
  secure: boolean
}): SessionStrategy<JSONValue> => {
  if (!secret) {
    throw new Error('You must specify a session secret to use sessions')
  }

  if (secret.length < 32) {
    throw new Error('The session secret must be at least 32 characters long')
  }

  const store =
    typeof storeOption === 'function' ? storeOption({ maxAge }) : storeOption
  let isConnected = false

  return {
    async get({ req, createContext }) {
      const cookies = cookie.parse(req.headers.cookie || '')
      const token = cookies['sid']

      if (!token) return

      if (!isConnected) {
        await store.connect?.()
        isConnected = true
      }

      return store.get(`sess:${token}`)
    },
    async start({ res, data, createContext }) {
      // TODO
      return ''
    },
    async end({ req, res, createContext }) {
      // TODO
    },
  }
}

export const session = useSession({
  secret: process.env.SESSION_SECRET || '',
  maxAge: 60 * 60 * 4, // 4 hours
  secure: process.env.NODE_ENV === 'production',
  store: redisSessionStore({
    client: redisClient,
  }),
})
