import { BaseItem } from '@keystone-6/core/types'

import type { ValidSession } from '../../types'

export const USER_ROLES = {
  USER: 'User',
  AUTHOR: 'Author',
  MANAGER: 'Manager',
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

/** Access helpers */
export const isAdmin = ({ session }: { session: ValidSession }) =>
  session?.isAdmin

/** Filter helpers */
export const isAdminOrSelf = ({ session }: { session: ValidSession }) => {
  // if the user is an Admin, they can access all the users
  if (session.isAdmin) return true

  // otherwise, only allow access to themself
  return { userId: { equals: session.userId } }
}

/** UI helpers */
export const showHideAdminUI = ({ session }: { session: ValidSession }) =>
  session?.isAdmin ? 'edit' : 'hidden'

export const editReadAdminUI = ({ session }: { session: ValidSession }) =>
  session?.isAdmin ? 'edit' : 'read'

/** Article helpers */

export const canCreateArticle = ({ session }: { session: ValidSession }) => {
  return (
    session?.isAdmin ||
    session?.role === USER_ROLES.AUTHOR ||
    session?.role === USER_ROLES.MANAGER
  )
}

export const canUpdateDeleteArticle = ({
  session,
}: {
  session: ValidSession
}) => {
  if (session.isAdmin || session.role === USER_ROLES.MANAGER) return true

  if (session.role === USER_ROLES.AUTHOR) {
    return {
      createdBy: { id: { equals: session.itemId } },
    }
  }

  return false
}

export const canPublishArchiveArticle = ({
  session,
}: {
  session: ValidSession
}) => {
  if (session.isAdmin || session.role === USER_ROLES.MANAGER) return true

  return false
}

export const articleItemView = ({
  session,
  item,
}: {
  session: ValidSession
  item: BaseItem
}) => {
  if (session.isAdmin || session.role === USER_ROLES.MANAGER) return 'edit'

  if (session.role === USER_ROLES.AUTHOR && item.createdById === session.itemId)
    return 'edit'

  return 'read'
}

export const articleStatusView = ({ session }: { session: ValidSession }) => {
  if (session.isAdmin || session.role === USER_ROLES.MANAGER) return 'edit'

  return 'read'
}
