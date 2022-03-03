import type { SessionUser, AuthenticatedUser } from '../../types'

// The user group values defined by SLAM
const USER_GROUPS = {
  ADMIN: 'PORTAL_CMS_Admins',
  USER: 'PORTAL_CMS_Users',
}

const USER_GROUPS_LIST = Object.values(USER_GROUPS)

export const canAccessCMS = (user: SessionUser) => {
  const {
    attributes: { userGroups },
  } = user

  if (Array.isArray(userGroups)) {
    return userGroups.find((i) => USER_GROUPS_LIST.includes(i))
  }

  return USER_GROUPS_LIST.includes(userGroups)
}

export const isCMSAdmin = (user: SessionUser) => {
  const {
    attributes: { userGroups },
  } = user

  if (Array.isArray(userGroups)) {
    return userGroups.includes(USER_GROUPS.ADMIN)
  }

  return userGroups === USER_GROUPS.ADMIN
}

export const isAdmin = ({ session }: { session: AuthenticatedUser }) =>
  session?.isAdmin

const filterUser = ({ session }: { session: AuthenticatedUser }) => {
  // if the user is an Admin, they can access all the users
  if (session.isAdmin) return true

  // otherwise, filter for single user
  return { userId: { equals: session?.userId } }
}

export const showHideAdminUI = ({ session }: { session: AuthenticatedUser }) =>
  session?.isAdmin ? 'edit' : 'hidden'

export const editReadAdminUI = ({ session }: { session: AuthenticatedUser }) =>
  session?.isAdmin ? 'edit' : 'read'
