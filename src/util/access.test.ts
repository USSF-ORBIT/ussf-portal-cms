import {
  isAdmin,
  isAdminOrSelf,
  showHideAdminUI,
  editReadAdminUI,
  USER_ROLES,
} from './access'
import { testUser } from '__fixtures__/testUsers'

const testSession = {
  ...testUser,
  isAdmin: false,
  isEnabled: true,
  name: 'BERNADETTE CAMPBELL',
  id: 'keystoneDbId123',
  role: USER_ROLES.USER,
  itemId: 'keystoneDbId123',
  listKey: 'User' as const,
  accessAllowed: true as const,
}

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
