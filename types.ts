/**
 * ***********************
 * Types for User / Auth
 * ***********************
 * */

// The raw data stored in Redis
export type SessionData = {
  cookie: any // TODO
  passport: {
    user: SessionUser
  }
}

export interface SAMLUser {
  issuer: string
  nameID: string
  nameIDFormat: string
  inResponseTo: string
  sessionIndex: string
  attributes: {
    subject: string
    edipi: string
    common_name: string
    fascn: string
    givenname: string
    surname: string
    userprincipalname: string
    userGroups: string[]
  }
}

export type SessionUser = SAMLUser & {
  userId: string
}

export type KeystoneUser = {
  isAdmin: boolean
  isEnabled: boolean
  name: string
}

export type AuthenticatedUser = SessionUser & KeystoneUser
