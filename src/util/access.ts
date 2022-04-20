import type { SessionUser, ValidSession } from '../../types'

/** Session access (used before defining session) */
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

  const groupsList: string[] = Array.isArray(userGroups)
    ? userGroups
    : userGroups.split(',')

  return !!groupsList.find((i) => USER_GROUPS_LIST.includes(i))
}

export const isCMSAdmin = (user: SessionUser) => {
  const {
    attributes: { userGroups },
  } = user

  const groupsList: string[] = Array.isArray(userGroups)
    ? userGroups
    : userGroups.split(',')

  return groupsList.includes(USER_GROUPS.ADMIN)
}

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
