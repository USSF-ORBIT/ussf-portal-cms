/**
 * ***********************
 * Types for User / Auth
 * ***********************
 * */

// The raw data stored in Redis
export type SessionData = {
  cookie: { [key: string]: string }
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
    userGroups: string[] | string
  }
}

export type SessionUser = SAMLUser & {
  userId: string
  accessAllowed: true
}

export type KeystoneUser = {
  isAdmin: boolean
  isEnabled: boolean
  name: string
}

export type AuthenticatedUser = SessionUser & KeystoneUser

export type InvalidSession = { accessAllowed: false }
