import { testUserSession, testAdminSession } from '../__fixtures__/testUsers'

import {
  isAdmin,
  isAdminOrSelf,
  showHideAdminUI,
  editReadAdminUI,
} from './access'

describe('isAdmin', () => {
  it('returns true if the logged in user is an admin', () => {
    expect(
      isAdmin({
        session: testAdminSession,
      })
    ).toBe(true)
  })
  it('returns false if the logged in user is not an admin', () => {
    expect(isAdmin({ session: testUserSession })).toBe(false)
  })
})

describe('isAdminOrSelf', () => {
  it('returns true if the logged in user is an admin', () => {
    expect(
      isAdminOrSelf({
        session: testAdminSession,
      })
    ).toBe(true)
  })

  it('returns a filter on the logged in userId if not an admin', () => {
    expect(
      isAdminOrSelf({
        session: testUserSession,
      })
    ).toEqual({
      userId: {
        equals: testUserSession.userId,
      },
    })
  })
})

describe('showHideAdminUI', () => {
  it('returns edit if the logged in user is an admin', () => {
    expect(
      showHideAdminUI({
        session: testAdminSession,
      })
    ).toBe('edit')
  })
  it('returns hidden if the logged in user is not an admin', () => {
    expect(showHideAdminUI({ session: testUserSession })).toBe('hidden')
  })
})

describe('editReadAdminUI', () => {
  it('returns edit if the logged in user is an admin', () => {
    expect(
      editReadAdminUI({
        session: testAdminSession,
      })
    ).toBe('edit')
  })
  it('returns read if the logged in user is not an admin', () => {
    expect(editReadAdminUI({ session: testUserSession })).toBe('read')
  })
})
