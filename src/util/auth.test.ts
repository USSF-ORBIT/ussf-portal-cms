import { canAccessCMS, isCMSAdmin } from './auth'
import { testUser } from '__fixtures__/testUsers'

describe('canAccessCMS', () => {
  describe('if the user groups is an array', () => {
    it('returns true if user groups includes at least one group with access', () => {
      expect(
        canAccessCMS({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: ['AFUSERS', 'PORTAL_CMS_Users'],
          },
        })
      ).toEqual(true)
      expect(
        canAccessCMS({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: ['AFUSERS', 'PORTAL_CMS_Admins'],
          },
        })
      ).toEqual(true)
      expect(
        canAccessCMS({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: ['PORTAL_CMS_Users', 'PORTAL_CMS_Admins'],
          },
        })
      ).toEqual(true)
    })

    it('returns false if user groups does not include any group with access', () => {
      expect(
        canAccessCMS({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: ['AFUSERS'],
          },
        })
      ).toEqual(false)
      expect(
        canAccessCMS({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: [],
          },
        })
      ).toEqual(false)
    })
  })

  describe('if the user groups is a string', () => {
    it('returns true if user groups includes at least one group with access', () => {
      expect(
        canAccessCMS({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: 'AF_USERS,PORTAL_CMS_Users',
          },
        })
      ).toEqual(true)
      expect(
        canAccessCMS({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: 'AF_USERS,PORTAL_CMS_Admins',
          },
        })
      ).toEqual(true)
      expect(
        canAccessCMS({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: 'PORTAL_CMS_Users,PORTAL_CMS_Admins',
          },
        })
      ).toEqual(true)
    })

    it('returns false if user groups does not include any group with access', () => {
      expect(
        canAccessCMS({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: 'AFUSERS',
          },
        })
      ).toEqual(false)
      expect(
        canAccessCMS({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: '',
          },
        })
      ).toEqual(false)
    })
  })
})

describe('isCMSAdmin', () => {
  describe('if the user groups is an array', () => {
    it('returns true if user groups includes the admin group', () => {
      expect(
        isCMSAdmin({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: ['AFUSERS', 'PORTAL_CMS_Admins'],
          },
        })
      ).toEqual(true)
      expect(
        isCMSAdmin({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: ['PORTAL_CMS_Users', 'PORTAL_CMS_Admins'],
          },
        })
      ).toEqual(true)
    })

    it('returns false if user groups does not include the admin group', () => {
      expect(
        isCMSAdmin({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: ['AFUSERS', 'PORTAL_CMS_Users'],
          },
        })
      ).toEqual(false)
      expect(
        isCMSAdmin({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: ['AFUSERS'],
          },
        })
      ).toEqual(false)
      expect(
        isCMSAdmin({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: [],
          },
        })
      ).toEqual(false)
    })
  })

  describe('if the user groups is a string', () => {
    it('returns true if user groups includes the admin group', () => {
      expect(
        isCMSAdmin({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: 'AFUSERS,PORTAL_CMS_Admins',
          },
        })
      ).toEqual(true)
      expect(
        isCMSAdmin({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: 'PORTAL_CMS_Users,PORTAL_CMS_Admins',
          },
        })
      ).toEqual(true)
    })

    it('returns false if user groups does not include the admin group', () => {
      expect(
        isCMSAdmin({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: 'AFUSERS,PORTAL_CMS_Users',
          },
        })
      ).toEqual(false)
      expect(
        isCMSAdmin({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: 'AFUSERS',
          },
        })
      ).toEqual(false)
      expect(
        isCMSAdmin({
          ...testUser,
          attributes: {
            ...testUser.attributes,
            userGroups: '',
          },
        })
      ).toEqual(false)
    })
  })
})
