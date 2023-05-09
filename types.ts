import type { UserRole } from 'util/access'

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
}

export type KeystoneUser = {
  id: string
  isAdmin: boolean
  isEnabled: boolean
  name: string
  role: UserRole
} & Pick<SessionUser, 'userId'>

export type AuthenticatedUser = SessionUser & KeystoneUser

export type ValidSession = AuthenticatedUser & {
  accessAllowed: true
  itemId: string
  listKey: 'User'
}

export type InvalidSession = { accessAllowed: false }

/**
 * ***********************
 * Types for Search
 * ***********************
 * */

// Query sent from the client and parsed
export type ParsedSearchQuery = {
  terms: string
  tags: string[]
  labels: string[]
  categories: string[]
}

// Results returned from the CMS Search API to the Portal Client
export type ArticleSearchResult = {
  id: string
  type: 'Article'
  title: string
  preview: string
  permalink: string
  date: string
  labels: string[]
  tags: string[]
}

export type BookmarkSearchResult = {
  id: string
  type: 'Bookmark'
  title: string
  preview: string
  permalink: string
}

export type DocumentationSearchResult = {
  id: string
  type: 'Documentation'
  title: string
  preview: string
  permalink: string
}

// Query sent to the CMS database
export type ArticleQuery = {
  where: {
    status: string
    publishedDate: {
      lte: Date
    }
    category: string
    OR?: any[]
    AND?: [{ OR?: any[] }, { OR?: any[] }]
  }
  include: {
    labels: boolean
    tags: boolean
  }
}

// Results returned from querying the database
export type ArticleQueryResult = {
  id: string
  type: 'Article'
  title: string
  slug: string
  preview: string
  labels: string[]
  tags: string[]
  publishedDate: Date
}

export type BookmarkQueryResult = {
  id: string
  type: 'Bookmark'
  label: string
  url: string
  description: string
}

export type DocumentationPageQueryResult = {
  id: string
  type: 'Documentation'
  pageTitle: string
  description: string
  sections: [{ title: string }]
}

export type DocumentQueryResult = {
  id: string
  type: 'Documentation'
  title: string
  description: string
}
