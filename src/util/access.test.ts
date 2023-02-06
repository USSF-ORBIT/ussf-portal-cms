import {
  testUserSession,
  testAdminSession,
  testAuthorSession,
  testManagerSession,
} from '../__fixtures__/testUsers'

import {
  isAdmin,
  isAdminOrSelf,
  showHideAdminUI,
  editReadAdminUI,
  userQueryFilter,
  userItemView,
  canCreateArticle,
  canUpdateDeleteArticle,
  canPublishArchiveArticle,
  articleCreateView,
  articleItemView,
  articleStatusView,
  canCreateOrUpdateDocument,
  canUpdateDocument,
  canDeleteDocument,
  canCreateDocumentPage,
  documentCreateView,
  documentItemView,
  documentPageCreateView,
  documentPageItemView,
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
  it('returns false if there is no logged in user', () => {
    expect(isAdmin({})).toBe(false)
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

  it('returns false if there is no logged in user', () => {
    expect(isAdminOrSelf({})).toBe(false)
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
  it('returns hidden if there is no logged in user', () => {
    expect(showHideAdminUI({})).toBe('hidden')
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

  it('returns read if there is no logged in user', () => {
    expect(editReadAdminUI({})).toBe('read')
  })
})

describe('userQueryFilter', () => {
  it('returns true if the logged in user is an admin', () => {
    expect(
      userQueryFilter({
        session: testAdminSession,
      })
    ).toBe(true)
  })

  it('returns true if the logged in user is an author', () => {
    expect(userQueryFilter({ session: testAuthorSession })).toBe(true)
  })
  it('returns true if the logged in user is a manager', () => {
    expect(userQueryFilter({ session: testManagerSession })).toBe(true)
  })

  it('returns a filter on the logged in userId if not an admin, author, or manager', () => {
    expect(
      userQueryFilter({
        session: testUserSession,
      })
    ).toEqual({
      userId: {
        equals: testUserSession.userId,
      },
    })
  })

  it('returns false if there is no logged in user', () => {
    expect(userQueryFilter({})).toBe(false)
  })
})

describe('userItemView', () => {
  it('returns edit if the logged in user is an admin', () => {
    expect(userItemView({ session: testAdminSession })).toBe('edit')
  })

  it('returns edit if the logged in user is the user', () => {
    expect(
      userItemView({
        session: testAuthorSession,
        item: { id: testAuthorSession.id },
      })
    ).toBe('edit')
  })

  it('returns read if the logged in user is NOT the user', () => {
    expect(
      userItemView({
        session: testAuthorSession,
        item: { id: testAdminSession.id },
      })
    ).toBe('read')
  })
})

describe('canCreateArticle', () => {
  it('returns true if the logged in user is an admin', () => {
    expect(canCreateArticle({ session: testAdminSession })).toBe(true)
  })
  it('returns true if the logged in user is an author', () => {
    expect(canCreateArticle({ session: testAuthorSession })).toBe(true)
  })
  it('returns true if the logged in user is a manager', () => {
    expect(canCreateArticle({ session: testManagerSession })).toBe(true)
  })
  it('returns false if the logged in user is a user', () => {
    expect(canCreateArticle({ session: testUserSession })).toBe(false)
  })
  it('returns false if there is no logged in user', () => {
    expect(canCreateArticle({})).toBe(false)
  })
})

describe('canUpdateDeleteArticle', () => {
  it('returns true if the logged in user is an admin', () => {
    expect(canUpdateDeleteArticle({ session: testAdminSession })).toBe(true)
  })
  it('returns a filter on the item id if the logged in user is an author', () => {
    expect(
      canUpdateDeleteArticle({ session: testAuthorSession })
    ).toMatchObject({
      createdBy: { id: { equals: testAuthorSession.itemId } },
    })
  })
  it('returns true if the logged in user is a manager', () => {
    expect(canUpdateDeleteArticle({ session: testManagerSession })).toBe(true)
  })
  it('returns false if the logged in user is a user', () => {
    expect(canUpdateDeleteArticle({ session: testUserSession })).toBe(false)
  })
  it('returns false if there is no logged in user', () => {
    expect(canUpdateDeleteArticle({})).toBe(false)
  })
})

describe('canPublishArchiveArticle', () => {
  it('returns true if the logged in user is an admin', () => {
    expect(canPublishArchiveArticle({ session: testAdminSession })).toBe(true)
  })
  it('returns false if the logged in user is an author', () => {
    expect(canPublishArchiveArticle({ session: testAuthorSession })).toBe(false)
  })
  it('returns true if the logged in user is a manager', () => {
    expect(canPublishArchiveArticle({ session: testManagerSession })).toBe(true)
  })
  it('returns false if the logged in user is a user', () => {
    expect(canPublishArchiveArticle({ session: testUserSession })).toBe(false)
  })
  it('returns false if there is no logged in user', () => {
    expect(canPublishArchiveArticle({})).toBe(false)
  })
})

describe('articleCreateView', () => {
  it('returns edit if the logged in user is an admin', () => {
    expect(articleCreateView({ session: testAdminSession })).toBe('edit')
  })
  it('returns edit if the logged in user is an author', () => {
    expect(articleCreateView({ session: testAuthorSession })).toBe('edit')
  })
  it('returns edit if the logged in user is a manager', () => {
    expect(articleCreateView({ session: testManagerSession })).toBe('edit')
  })
  it('returns hidden if the logged in user is a user', () => {
    expect(articleCreateView({ session: testUserSession })).toBe('hidden')
  })
  it('returns hidden if there is no logged in user', () => {
    expect(articleCreateView({})).toBe('hidden')
  })
})

describe('articleItemView', () => {
  it('returns edit if the logged in user is an admin', () => {
    expect(articleItemView({ session: testAdminSession })).toBe('edit')
  })
  it('returns edit if the logged in user is an author and the creator of the article', () => {
    expect(
      articleItemView({
        session: testAuthorSession,
        item: { id: 'testArticleId', createdById: testAuthorSession.itemId },
      })
    ).toBe('edit')
  })
  it('returns read if the logged in user is an author and NOT the creator of the article', () => {
    expect(
      articleItemView({
        session: testAuthorSession,
        item: { id: 'testArticleId', createdById: 'someOtherAuthorId' },
      })
    ).toBe('read')
  })

  it('returns edit if the logged in user is a manager', () => {
    expect(articleItemView({ session: testManagerSession })).toBe('edit')
  })
  it('returns read if the logged in user is a user', () => {
    expect(articleItemView({ session: testUserSession })).toBe('read')
  })
  it('returns read if there is no logged in user', () => {
    expect(articleItemView({})).toBe('read')
  })
})

describe('articleStatusView', () => {
  it('returns edit if the logged in user is an admin', () => {
    expect(articleStatusView({ session: testAdminSession })).toBe('edit')
  })
  it('returns read if the logged in user is an author', () => {
    expect(articleStatusView({ session: testAuthorSession })).toBe('read')
  })
  it('returns edit if the logged in user is a manager', () => {
    expect(articleStatusView({ session: testManagerSession })).toBe('edit')
  })
  it('returns read if the logged in user is a user', () => {
    expect(articleStatusView({ session: testUserSession })).toBe('read')
  })
  it('returns read if there is no logged in user', () => {
    expect(articleStatusView({})).toBe('read')
  })
})

/* Document Access */
describe('documentItemView', () => {
  it('returns edit if the logged in user is an admin', () => {
    expect(documentItemView({ session: testAdminSession })).toBe('edit')
  })
  it('returns edit if the logged in user is an author and the creator of the article', () => {
    expect(
      documentItemView({
        session: testAuthorSession,
        item: { id: 'testArticleId', createdById: testAuthorSession.itemId },
      })
    ).toBe('edit')
  })
  it('returns read if the logged in user is an author and NOT the creator of the article', () => {
    expect(
      documentItemView({
        session: testAuthorSession,
        item: { id: 'testArticleId', createdById: 'someOtherAuthorId' },
      })
    ).toBe('read')
  })

  it('returns edit if the logged in user is a manager', () => {
    expect(documentItemView({ session: testManagerSession })).toBe('edit')
  })
  it('returns read if the logged in user is a user', () => {
    expect(documentItemView({ session: testUserSession })).toBe('read')
  })
  it('returns read if there is no logged in user', () => {
    expect(documentItemView({})).toBe('read')
  })
})

describe('documentCreateView', () => {
  it('returns edit if the logged in user is an admin', () => {
    expect(documentCreateView({ session: testAdminSession })).toBe('edit')
  })
  it('returns edit if the logged in user is an author', () => {
    expect(documentCreateView({ session: testAuthorSession })).toBe('edit')
  })
  it('returns edit if the logged in user is a manager', () => {
    expect(documentCreateView({ session: testManagerSession })).toBe('edit')
  })
  it('returns hidden if the logged in user is a user', () => {
    expect(documentCreateView({ session: testUserSession })).toBe('hidden')
  })
  it('returns hidden if there is no logged in user', () => {
    expect(documentCreateView({})).toBe('hidden')
  })
})

describe('documentPageCreateView', () => {
  it('returns edit if the logged in user is an admin', () => {
    expect(documentPageCreateView({ session: testAdminSession })).toBe('edit')
  })
  it('returns hidden if the logged in user is an author', () => {
    expect(documentPageCreateView({ session: testAuthorSession })).toBe(
      'hidden'
    )
  })
  it('returns edit if the logged in user is a manager', () => {
    expect(documentPageCreateView({ session: testManagerSession })).toBe('edit')
  })
  it('returns hidden if the logged in user is a user', () => {
    expect(documentPageCreateView({ session: testUserSession })).toBe('hidden')
  })
  it('returns hidden if there is no logged in user', () => {
    expect(documentPageCreateView({})).toBe('hidden')
  })
})

describe('documentPageItemView', () => {
  it('returns edit if the logged in user is an admin', () => {
    expect(documentPageItemView({ session: testAdminSession })).toBe('edit')
  })
  it('returns read if the logged in user is an author', () => {
    expect(documentPageItemView({ session: testAuthorSession })).toBe('read')
  })
  it('returns edit if the logged in user is a manager', () => {
    expect(documentPageItemView({ session: testManagerSession })).toBe('edit')
  })
  it('returns read if the logged in user is a user', () => {
    expect(documentPageItemView({ session: testUserSession })).toBe('read')
  })
  it('returns read if there is no logged in user', () => {
    expect(documentPageItemView({})).toBe('read')
  })
})

describe('canCreateOrUpdateDocument', () => {
  it('returns true if the logged in user is an admin', () => {
    expect(canCreateOrUpdateDocument({ session: testAdminSession })).toBe(true)
  })
  it('returns true if the logged in user is an author', () => {
    expect(canCreateOrUpdateDocument({ session: testAuthorSession })).toBe(true)
  })
  it('returns true if the logged in user is a manager', () => {
    expect(canCreateOrUpdateDocument({ session: testManagerSession })).toBe(
      true
    )
  })
  it('returns false if the logged in user is a user', () => {
    expect(canCreateOrUpdateDocument({ session: testUserSession })).toBe(false)
  })
  it('returns false if there is no logged in user', () => {
    expect(canCreateOrUpdateDocument({})).toBe(false)
  })
})

describe('canUpdateDocument filter', () => {
  it('returns true if the logged in user is an admin', () => {
    expect(canUpdateDocument({ session: testAdminSession })).toBe(true)
  })
  it('returns a filter on the item id if the logged in user is an author', () => {
    expect(canUpdateDocument({ session: testAuthorSession })).toMatchObject({
      createdBy: { id: { equals: testAuthorSession.itemId } },
    })
  })
  it('returns true if the logged in user is a manager', () => {
    expect(canUpdateDeleteArticle({ session: testManagerSession })).toBe(true)
  })
  it('returns false if the logged in user is a user', () => {
    expect(canUpdateDeleteArticle({ session: testUserSession })).toBe(false)
  })
  it('returns false if there is no logged in user', () => {
    expect(canUpdateDeleteArticle({})).toBe(false)
  })
})

describe('canDeleteDocument', () => {
  it('returns true if the logged in user is an admin', () => {
    expect(canDeleteDocument({ session: testAdminSession })).toBe(true)
  })
  it('returns false if the logged in user is an author', () => {
    expect(canDeleteDocument({ session: testAuthorSession })).toBe(false)
  })
  it('returns true if the logged in user is a manager', () => {
    expect(canDeleteDocument({ session: testManagerSession })).toBe(true)
  })
  it('returns false if the logged in user is a user', () => {
    expect(canDeleteDocument({ session: testUserSession })).toBe(false)
  })
  it('returns false if there is no logged in user', () => {
    expect(canDeleteDocument({})).toBe(false)
  })
})

describe('canCreateDocumentPage', () => {
  it('returns true if the logged in user is an admin', () => {
    expect(canCreateDocumentPage({ session: testAdminSession })).toBe(true)
  })
  it('returns false if the logged in user is an author', () => {
    expect(canCreateDocumentPage({ session: testAuthorSession })).toBe(false)
  })
  it('returns true if the logged in user is a manager', () => {
    expect(canCreateDocumentPage({ session: testManagerSession })).toBe(true)
  })
  it('returns false if the logged in user is a user', () => {
    expect(canCreateDocumentPage({ session: testUserSession })).toBe(false)
  })
  it('returns false if there is no logged in user', () => {
    expect(canCreateDocumentPage({})).toBe(false)
  })
})
