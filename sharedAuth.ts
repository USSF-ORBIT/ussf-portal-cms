import * as cookie from 'cookie'
import {
  JSONValue,
  KeystoneConfig,
  SessionStoreFunction,
  SessionStrategy,
} from '@keystone-6/core/types'

export const withAuth = (keystoneConfig: KeystoneConfig): KeystoneConfig => {
  return {
    ...keystoneConfig,
  }
}

export const sharedSession = ({
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

  let store =
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
      // TODO?
      return ''
    },
    async end({ req, res, createContext }) {
      // TODO?
    },
  }
}
