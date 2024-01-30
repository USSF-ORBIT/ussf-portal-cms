import type { BaseItem, KeystoneContext } from '@keystone-6/core/types'

import type { ValidSession } from '../../types'

/** Access function types */
type OperationAccessFn = ({
  session,
  context,
  listKey,
  operation,
}: {
  session?: ValidSession
  context?: KeystoneContext
  listKey?: string
  operation?: string
}) => boolean

type OperationFilterFn = ({
  session,
  context,
  listKey,
  operation,
}: {
  session?: ValidSession
  context?: KeystoneContext
  listKey?: string
  operation?: string
}) => Record<string, any> | boolean

type CreateViewFn = ({
  session,
  context,
}: {
  session?: ValidSession
  context?: KeystoneContext
}) => 'edit' | 'hidden'

type ItemViewFn = ({
  session,
  context,
  item,
}: {
  session?: ValidSession
  context?: KeystoneContext
  item?: BaseItem
}) => 'edit' | 'read' | 'hidden'

/** User Roles */
export const USER_ROLES = {
  USER: 'User',
  AUTHOR: 'Author',
  MANAGER: 'Manager',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

/** Access helpers */
export const isAdmin: OperationAccessFn = ({ session }) => !!session?.isAdmin

/** Filter helpers */
export const isAdminOrSelf: OperationFilterFn = ({ session }) => {
  // if the user is an Admin, they can access all the users
  if (session?.isAdmin) return true

  if (!session) return false

  // otherwise, only allow access to themself
  return { userId: { equals: session?.userId } }
}

/** View helpers */
export const showHideAdminUI: CreateViewFn = ({ session }) =>
  session?.isAdmin ? 'edit' : 'hidden'

export const editReadAdminUI: ItemViewFn = ({ session }) =>
  session?.isAdmin ? 'edit' : 'read'

/** User helpers */
export const userQueryFilter: OperationFilterFn = ({ session }) => {
  // if the user is an Admin, they can access all the users
  if (session?.isAdmin) return true

  if (!session) {
    return false
  }

  // CMS roles can view other users
  if (
    session?.role === USER_ROLES.AUTHOR ||
    session?.role === USER_ROLES.MANAGER
  )
    return true

  // otherwise, only allow access to themself
  return { userId: { equals: session?.userId } }
}

export const userItemView: ItemViewFn = ({ session, item }) => {
  // Admin can edit all users
  if (session?.isAdmin) return 'edit'

  // Everyone else can only edit themselves
  if (item?.id === session?.itemId) return 'edit'

  return 'read'
}

/** Collection helpers */
export const canCreateCollection: OperationAccessFn = ({ session }) => {
  return session?.isAdmin || session?.role === USER_ROLES.MANAGER
}

export const canUpdateCollection: OperationAccessFn = ({ session }) => {
  return session?.isAdmin || session?.role === USER_ROLES.MANAGER
}

export const collectionCreateView: CreateViewFn = ({ session }) =>
  canCreateCollection({ session }) ? 'edit' : 'hidden'

/** Bookmark helpers */
export const canCreateBookmark: OperationAccessFn = ({ session }) => {
  return session?.isAdmin || session?.role === USER_ROLES.MANAGER
}

export const canUpdateBookmark: OperationAccessFn = ({ session }) => {
  return session?.isAdmin || session?.role === USER_ROLES.MANAGER
}

export const bookmarkCreateView: CreateViewFn = ({ session }) =>
  canCreateBookmark({ session }) ? 'edit' : 'hidden'

/** Article helpers */
export const canCreateArticle: OperationAccessFn = ({ session }) => {
  return (
    session?.isAdmin ||
    session?.role === USER_ROLES.AUTHOR ||
    session?.role === USER_ROLES.MANAGER
  )
}

export const canUpdateDeleteArticle: OperationFilterFn = ({ session }) => {
  if (session?.isAdmin || session?.role === USER_ROLES.MANAGER) return true

  if (session?.role === USER_ROLES.AUTHOR) {
    return {
      createdBy: { id: { equals: session.itemId } },
    }
  }

  return false
}

export const canPublishArchiveArticle: OperationAccessFn = ({ session }) => {
  if (session?.isAdmin || session?.role === USER_ROLES.MANAGER) return true

  return false
}

export const canPublishArchiveLanding: OperationAccessFn = ({ session }) => {
  if (session?.isAdmin || session?.role === USER_ROLES.MANAGER) return true

  return false
}

export const articleCreateView: CreateViewFn = ({ session }) =>
  canCreateArticle({ session }) ? 'edit' : 'hidden'

export const articleItemView: ItemViewFn = ({ session, item }) => {
  if (session?.isAdmin || session?.role === USER_ROLES.MANAGER) return 'edit'

  if (
    session?.role === USER_ROLES.AUTHOR &&
    item?.createdById === session.itemId
  )
    return 'edit'

  return 'read'
}

export const articleStatusView: ItemViewFn = ({ session }) => {
  if (session?.isAdmin || session?.role === USER_ROLES.MANAGER) return 'edit'

  return 'read'
}

export const landingStatusView: ItemViewFn = ({ session }) => {
  if (session?.isAdmin || session?.role === USER_ROLES.MANAGER) return 'edit'

  return 'read'
}

/* Document helpers */

export const canCreateOrUpdateDocument: OperationAccessFn = ({ session }) => {
  return (
    session?.isAdmin ||
    session?.role === USER_ROLES.AUTHOR ||
    session?.role === USER_ROLES.MANAGER
  )
}

export const canUpdateDocument: OperationFilterFn = ({ session }) => {
  if (session?.isAdmin || session?.role === USER_ROLES.MANAGER) return true

  if (session?.role === USER_ROLES.AUTHOR) {
    return {
      createdBy: { id: { equals: session.itemId } },
    }
  }
  return false
}

export const canDeleteDocument: OperationAccessFn = ({ session }) => {
  return session?.isAdmin || session?.role === USER_ROLES.MANAGER
}

export const canCreateDocumentPage: OperationAccessFn = ({ session }) => {
  return session?.isAdmin || session?.role === USER_ROLES.MANAGER
}

export const documentCreateView: CreateViewFn = ({ session }) =>
  canCreateOrUpdateDocument({ session }) ? 'edit' : 'hidden'

export const documentItemView: ItemViewFn = ({ session, item }) => {
  if (session?.isAdmin || session?.role === USER_ROLES.MANAGER) return 'edit'

  if (
    session?.role === USER_ROLES.AUTHOR &&
    item?.createdById === session.itemId
  )
    return 'edit'

  return 'read'
}

export const documentPageCreateView: CreateViewFn = ({ session }) =>
  canCreateDocumentPage({ session }) ? 'edit' : 'hidden'

export const documentPageItemView: ItemViewFn = ({ session }) => {
  if (session?.isAdmin || session?.role === USER_ROLES.MANAGER) return 'edit'

  return 'read'
}

/* Landing Page helpers */
export const canCreateLandingPage: OperationAccessFn = ({ session }) => {
  if (session?.isAdmin || session?.role === USER_ROLES.MANAGER) return true

  return false
}

export const canUpdateLandingPage: OperationAccessFn = ({ session }) => {
  if (session?.isAdmin || session?.role === USER_ROLES.MANAGER) return true

  return false
}
