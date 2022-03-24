import {
  canAccessCMS,
  isCMSAdmin,
  isAdmin,
  isAdminOrSelf,
  showHideAdminUI,
  editReadAdminUI,
} from './access'

const testUser = {
  userId: 'BERNADETTE.CAMPBELL.5244446289@testusers.cce.af.mil',
  issuer: 'http://localhost:8080/simplesaml/saml2/idp/metadata.php',
  nameID: '_9c9d48b40112e0d39413d937f9d3a940420d719fbb',
  nameIDFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
  inResponseTo: '_82bc4c3df3d7396a9f22',
  sessionIndex: '_b0674f313b122aad2ce1faccac204e732e57b2740b',
  attributes: {
    edipi: '5244446289',
    common_name: 'CAMPBELL.BERNADETTE.5244446289',
    fascn: '5244446289197004',
    givenname: 'BERNADETTE',
    surname: 'CAMPBELL',
    userprincipalname: 'BERNADETTE.CAMPBELL.5244446289@testusers.cce.af.mil',
    userGroups: ['AF_USERS'],
    subject:
      '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=CAMPBELL.BERNADETTE.5244446289',
  },
  accessAllowed: true as const,
}

const testSession = {
  ...testUser,
  isAdmin: false,
  isEnabled: true,
  name: 'BERNADETTE CAMPBELL',
}

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

describe('isAdmin', () => {
  it('returns true if the logged in user is an admin', () => {
    expect(
      isAdmin({
        session: {
          ...testSession,
          isAdmin: true,
        },
      })
    ).toBe(true)
  })
  it('returns false if the logged in user is not an admin', () => {
    expect(isAdmin({ session: testSession })).toBe(false)
  })
})

describe('isAdminOrSelf', () => {
  it('returns true if the logged in user is an admin', () => {
    expect(
      isAdminOrSelf({
        session: {
          ...testSession,
          isAdmin: true,
        },
      })
    ).toBe(true)
  })

  it('returns a filter on the logged in userId if not an admin', () => {
    expect(
      isAdminOrSelf({
        session: testSession,
      })
    ).toEqual({
      userId: {
        equals: testSession.userId,
      },
    })
  })
})

describe('showHideAdminUI', () => {
  it('returns edit if the logged in user is an admin', () => {
    expect(
      showHideAdminUI({
        session: {
          ...testSession,
          isAdmin: true,
        },
      })
    ).toBe('edit')
  })
  it('returns hidden if the logged in user is not an admin', () => {
    expect(showHideAdminUI({ session: testSession })).toBe('hidden')
  })
})

describe('editReadAdminUI', () => {
  it('returns edit if the logged in user is an admin', () => {
    expect(
      editReadAdminUI({
        session: {
          ...testSession,
          isAdmin: true,
        },
      })
    ).toBe('edit')
  })
  it('returns read if the logged in user is not an admin', () => {
    expect(editReadAdminUI({ session: testSession })).toBe('read')
  })
})
