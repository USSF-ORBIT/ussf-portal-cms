import type { SessionUser } from '../../types'

/** Session access (used before defining session) */
/** This file contains constants & functions used by the auth strategy */
/** user group membership from SLAM is verified before granting CMS access */
/** used when logging in and validating existing sessions */

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
