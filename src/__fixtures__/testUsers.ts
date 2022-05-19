import type {
  SessionUser,
  KeystoneUser,
  ValidSession,
  InvalidSession,
} from '../../types'

/** Session users (from Redis) */
export const testUserNoAccess: SessionUser = {
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
}

export const testUser: SessionUser = {
  userId: 'JOHN.HENKE.562270783@testusers.cce.af.mil',
  issuer: 'http://localhost:8080/simplesaml/saml2/idp/metadata.php',
  nameID: '_9c9d48b40112e0d39413d937f9d3a940420d719fbb',
  nameIDFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
  inResponseTo: '_82bc4c3df3d7396a9f22',
  sessionIndex: '_b0674f313b122aad2ce1faccac204e732e57b2740b',
  attributes: {
    edipi: '562270783',
    common_name: 'HENKE.JOHN.562270783',
    fascn: '562270783197002',
    givenname: 'JOHN',
    surname: 'HENKE',
    userprincipalname: 'JOHN.HENKE.562270783@testusers.cce.af.mil',
    userGroups: ['PORTAL_CMS_Users', 'AF_USERS'],
    subject:
      '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=HENKE.JOHN.562270783',
  },
}

export const testAdmin: SessionUser = {
  userId: 'FLOYD.KING.376144527@testusers.cce.af.mil',
  issuer: 'http://localhost:8080/simplesaml/saml2/idp/metadata.php',
  nameID: '_9c9d48b40112e0d39413d937f9d3a940420d719fbb',
  nameIDFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
  inResponseTo: '_82bc4c3df3d7396a9f22',
  sessionIndex: '_b0674f313b122aad2ce1faccac204e732e57b2740b',
  attributes: {
    edipi: '376144527',
    common_name: 'KING.FLOYD.376144527',
    fascn: '376144527197005',
    givenname: 'FLOYD',
    surname: 'KING',
    userprincipalname: 'FLOYD.KING.376144527@testusers.cce.af.mil',
    userGroups: ['PORTAL_CMS_Admins', 'AF_USERS'],
    subject:
      '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=KING.FLOYD.376144527',
  },
}

export const testAuthor: SessionUser = {
  userId: 'ETHEL.NEAL.643097412@testusers.cce.af.mil',
  issuer: 'http://localhost:8080/simplesaml/saml2/idp/metadata.php',
  nameID: '_9c9d48b40112e0d39413d937f9d3a940420d719fbb',
  nameIDFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
  inResponseTo: '_82bc4c3df3d7396a9f22',
  sessionIndex: '_b0674f313b122aad2ce1faccac204e732e57b2740b',
  attributes: {
    edipi: '643097412',
    common_name: 'NEAL.ETHEL.643097412',
    fascn: '643097412197002',
    givenname: 'ETHEL',
    surname: 'NEAL',
    userprincipalname: 'ETHEL.NEAL.643097412@testusers.cce.af.mil',
    userGroups: ['PORTAL_CMS_Users', 'AF_USERS'],
    subject:
      '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=NEAL.ETHEL.643097412',
  },
}

export const testManager: SessionUser = {
  userId: 'CHRISTINA.HAVEN.561698119@testusers.cce.af.mil',
  issuer: 'http://localhost:8080/simplesaml/saml2/idp/metadata.php',
  nameID: '_9c9d48b40112e0d39413d937f9d3a940420d719fbb',
  nameIDFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
  inResponseTo: '_82bc4c3df3d7396a9f22',
  sessionIndex: '_b0674f313b122aad2ce1faccac204e732e57b2740b',
  attributes: {
    edipi: '561698119',
    common_name: 'HAVEN.CHRISTINA.561698119',
    fascn: '561698119197002',
    givenname: 'CHRISTINA',
    surname: 'HAVEN',
    userprincipalname: 'CHRISTINA.HAVEN.561698119@testusers.cce.af.mil',
    userGroups: ['PORTAL_CMS_Users', 'AF_USERS'],
    subject:
      '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=HAVEN.CHRISTINA.561698119',
  },
}

/** Keystone users */
export const testUserNoAccessKeystone: KeystoneUser = {
  userId: testUserNoAccess.userId,
  id: 'keystoneDbId123',
  isAdmin: false,
  isEnabled: false,
  name: `${testUserNoAccess.attributes.givenname} ${testUserNoAccess.attributes.surname}`,
  role: 'User' as const,
}

export const testUserKeystone: KeystoneUser = {
  userId: testUser.userId,
  id: 'keystoneDbId234',
  isAdmin: false,
  isEnabled: true,
  name: `${testUser.attributes.givenname} ${testUser.attributes.surname}`,
  role: 'User' as const,
}

export const testAdminKeystone: KeystoneUser = {
  userId: testAdmin.userId,
  id: 'keystoneDbId345',
  isAdmin: true,
  isEnabled: true,
  name: `${testAdmin.attributes.givenname} ${testAdmin.attributes.surname}`,
  role: 'User' as const,
}

export const testAuthorKeystone: KeystoneUser = {
  userId: testAuthor.userId,
  id: 'keystoneDbId456',
  isAdmin: false,
  isEnabled: true,
  name: `${testAuthor.attributes.givenname} ${testAuthor.attributes.surname}`,
  role: 'Author' as const,
}

export const testManagerKeystone: KeystoneUser = {
  userId: testManager.userId,
  id: 'keystoneDbId567',
  isAdmin: true,
  isEnabled: true,
  name: `${testManager.attributes.givenname} ${testManager.attributes.surname}`,
  role: 'Manager' as const,
}

/** Session objects */
export const testUserNoAccessSession: InvalidSession = { accessAllowed: false }

export const testUserSession: ValidSession = {
  ...testUser,
  ...testUserKeystone,
  itemId: testUserKeystone.id,
  listKey: 'User' as const,
  accessAllowed: true as const,
}

export const testAdminSession: ValidSession = {
  ...testAdmin,
  ...testAdminKeystone,
  itemId: testAdminKeystone.id,
  listKey: 'User' as const,
  accessAllowed: true as const,
}

export const testAuthorSession: ValidSession = {
  ...testAuthor,
  ...testAuthorKeystone,
  itemId: testAuthorKeystone.id,
  listKey: 'User' as const,
  accessAllowed: true as const,
}

export const testManagerSession: ValidSession = {
  ...testManager,
  ...testManagerKeystone,
  itemId: testManagerKeystone.id,
  listKey: 'User' as const,
  accessAllowed: true as const,
}
