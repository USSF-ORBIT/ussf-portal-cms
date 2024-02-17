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
  canCreateCollection,
  canUpdateCollection,
  collectionCreateView,
  canCreateBookmark,
  canUpdateBookmark,
  canDeleteBookmark,
  bookmarkCreateView,
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
  test('returns true if the logged in user is an admin', () => {
    expect(
      isAdmin({
        session: testAdminSession,
      })
    ).toBe(true)
  })
  test('returns false if the logged in user is not an admin', () => {
    expect(isAdmin({ session: testUserSession })).toBe(false)
  })
  test('returns false if there is no logged in user', () => {
    expect(isAdmin({})).toBe(false)
  })
})

describe('isAdminOrSelf', () => {
  test('returns true if the logged in user is an admin', () => {
    expect(
      isAdminOrSelf({
        session: testAdminSession,
      })
    ).toBe(true)
  })

  test('returns a filter on the logged in userId if not an admin', () => {
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

  test('returns false if there is no logged in user', () => {
    expect(isAdminOrSelf({})).toBe(false)
  })
})

describe('showHideAdminUI', () => {
  test('returns edit if the logged in user is an admin', () => {
    expect(
      showHideAdminUI({
        session: testAdminSession,
      })
    ).toBe('edit')
  })
  test('returns hidden if the logged in user is not an admin', () => {
    expect(showHideAdminUI({ session: testUserSession })).toBe('hidden')
  })
  test('returns hidden if there is no logged in user', () => {
    expect(showHideAdminUI({})).toBe('hidden')
  })
})

describe('editReadAdminUI', () => {
  test('returns edit if the logged in user is an admin', () => {
    expect(
      editReadAdminUI({
        session: testAdminSession,
      })
    ).toBe('edit')
  })
  test('returns read if the logged in user is not an admin', () => {
    expect(editReadAdminUI({ session: testUserSession })).toBe('read')
  })

  test('returns read if there is no logged in user', () => {
    expect(editReadAdminUI({})).toBe('read')
  })
})

describe('userQueryFilter', () => {
  test('returns true if the logged in user is an admin', () => {
    expect(
      userQueryFilter({
        session: testAdminSession,
      })
    ).toBe(true)
  })

  test('returns true if the logged in user is an author', () => {
    expect(userQueryFilter({ session: testAuthorSession })).toBe(true)
  })
  test('returns true if the logged in user is a manager', () => {
    expect(userQueryFilter({ session: testManagerSession })).toBe(true)
  })

  test('returns a filter on the logged in userId if not an admin, author, or manager', () => {
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

  test('returns false if there is no logged in user', () => {
    expect(userQueryFilter({})).toBe(false)
  })
})

describe('userItemView', () => {
  test('returns edit if the logged in user is an admin', () => {
    expect(userItemView({ session: testAdminSession })).toBe('edit')
  })

  test('returns edit if the logged in user is the user', () => {
    expect(
      userItemView({
        session: testAuthorSession,
        item: { id: testAuthorSession.id },
      })
    ).toBe('edit')
  })

  test('returns read if the logged in user is NOT the user', () => {
    expect(
      userItemView({
        session: testAuthorSession,
        item: { id: testAdminSession.id },
      })
    ).toBe('read')
  })
})

/* Collection Access */
describe('canCreateCollection', () => {
  test('returns true if the logged in user is an admin', () => {
    expect(canCreateCollection({ session: testAdminSession })).toBe(true)
  })
  test('returns true if the logged in user is a manager', () => {
    expect(canCreateCollection({ session: testManagerSession })).toBe(true)
  })
  test('returns false if the logged in user is an author', () => {
    expect(canCreateCollection({ session: testAuthorSession })).toBe(false)
  })
  test('returns false if the logged in user is a user', () => {
    expect(canCreateCollection({ session: testUserSession })).toBe(false)
  })
  test('returns false if there is no logged in user', () => {
    expect(canCreateCollection({})).toBe(false)
  })
})

describe('canUpdateCollection', () => {
  test('returns true if the logged in user is an admin', () => {
    expect(canUpdateCollection({ session: testAdminSession })).toBe(true)
  })
  test('returns true if the logged in user is a manager', () => {
    expect(canUpdateCollection({ session: testManagerSession })).toBe(true)
  })
  test('returns false if the logged in user is an author', () => {
    expect(canUpdateCollection({ session: testAuthorSession })).toBe(false)
  })
  test('returns false if the logged in user is a user', () => {
    expect(canUpdateCollection({ session: testUserSession })).toBe(false)
  })
  test('returns false if there is no logged in user', () => {
    expect(canUpdateCollection({})).toBe(false)
  })
})

describe('collectionCreateView', () => {
  test('returns edit if the logged in user is an admin', () => {
    expect(collectionCreateView({ session: testAdminSession })).toBe('edit')
  })
  test('returns edit if the logged in user is a manager', () => {
    expect(collectionCreateView({ session: testManagerSession })).toBe('edit')
  })
  test('returns hidden if the logged in user is an author', () => {
    expect(collectionCreateView({ session: testAuthorSession })).toBe('hidden')
  })
  test('returns hidden if the logged in user is a user', () => {
    expect(collectionCreateView({ session: testUserSession })).toBe('hidden')
  })
  test('returns hidden if there is no logged in user', () => {
    expect(collectionCreateView({})).toBe('hidden')
  })
})

/* Bookmark Access */
describe('canCreateBookmark', () => {
  test('returns true if the logged in user is an admin', () => {
    expect(canCreateBookmark({ session: testAdminSession })).toBe(true)
  })
  test('returns true if the logged in user is a manager', () => {
    expect(canCreateBookmark({ session: testManagerSession })).toBe(true)
  })
  test('returns false if the logged in user is an author', () => {
    expect(canCreateBookmark({ session: testAuthorSession })).toBe(false)
  })
  test('returns false if the logged in user is a user', () => {
    expect(canCreateBookmark({ session: testUserSession })).toBe(false)
  })
  test('returns false if there is no logged in user', () => {
    expect(canCreateBookmark({})).toBe(false)
  })
})

describe('canUpdateBookmark', () => {
  test('returns true if the logged in user is an admin', () => {
    expect(canUpdateBookmark({ session: testAdminSession })).toBe(true)
  })
  test('returns true if the logged in user is a manager', () => {
    expect(canUpdateBookmark({ session: testManagerSession })).toBe(true)
  })
  test('returns false if the logged in user is an author', () => {
    expect(canUpdateBookmark({ session: testAuthorSession })).toBe(false)
  })
  test('returns false if the logged in user is a user', () => {
    expect(canUpdateBookmark({ session: testUserSession })).toBe(false)
  })
  test('returns false if there is no logged in user', () => {
    expect(canUpdateBookmark({})).toBe(false)
  })
})

describe('canDeleteBookmark', () => {
  test('returns true if the logged in user is an admin', () => {
    expect(canDeleteBookmark({ session: testAdminSession })).toBe(true)
  })
  test('returns true if the logged in user is a manager', () => {
    expect(canDeleteBookmark({ session: testManagerSession })).toBe(true)
  })
  test('returns false if the logged in user is an author', () => {
    expect(canDeleteBookmark({ session: testAuthorSession })).toBe(false)
  })
  test('returns false if the logged in user is a user', () => {
    expect(canDeleteBookmark({ session: testUserSession })).toBe(false)
  })
  test('returns false if there is no logged in user', () => {
    expect(canDeleteBookmark({})).toBe(false)
  })
})

describe('bookmarkCreateView', () => {
  test('returns edit if the logged in user is an admin', () => {
    expect(bookmarkCreateView({ session: testAdminSession })).toBe('edit')
  })
  test('returns edit if the logged in user is a manager', () => {
    expect(bookmarkCreateView({ session: testManagerSession })).toBe('edit')
  })
  test('returns hidden if the logged in user is an author', () => {
    expect(bookmarkCreateView({ session: testAuthorSession })).toBe('hidden')
  })
  test('returns hidden if the logged in user is a user', () => {
    expect(bookmarkCreateView({ session: testUserSession })).toBe('hidden')
  })
  test('returns hidden if there is no logged in user', () => {
    expect(bookmarkCreateView({})).toBe('hidden')
  })
})

/* Article Access */
describe('canCreateArticle', () => {
  test('returns true if the logged in user is an admin', () => {
    expect(canCreateArticle({ session: testAdminSession })).toBe(true)
  })
  test('returns true if the logged in user is an author', () => {
    expect(canCreateArticle({ session: testAuthorSession })).toBe(true)
  })
  test('returns true if the logged in user is a manager', () => {
    expect(canCreateArticle({ session: testManagerSession })).toBe(true)
  })
  test('returns false if the logged in user is a user', () => {
    expect(canCreateArticle({ session: testUserSession })).toBe(false)
  })
  test('returns false if there is no logged in user', () => {
    expect(canCreateArticle({})).toBe(false)
  })
})

describe('canUpdateDeleteArticle', () => {
  test('returns true if the logged in user is an admin', () => {
    expect(canUpdateDeleteArticle({ session: testAdminSession })).toBe(true)
  })
  test('returns a filter on the item id if the logged in user is an author', () => {
    expect(
      canUpdateDeleteArticle({ session: testAuthorSession })
    ).toMatchObject({
      createdBy: { id: { equals: testAuthorSession.itemId } },
    })
  })
  test('returns true if the logged in user is a manager', () => {
    expect(canUpdateDeleteArticle({ session: testManagerSession })).toBe(true)
  })
  test('returns false if the logged in user is a user', () => {
    expect(canUpdateDeleteArticle({ session: testUserSession })).toBe(false)
  })
  test('returns false if there is no logged in user', () => {
    expect(canUpdateDeleteArticle({})).toBe(false)
  })
})

describe('canPublishArchiveArticle', () => {
  test('returns true if the logged in user is an admin', () => {
    expect(canPublishArchiveArticle({ session: testAdminSession })).toBe(true)
  })
  test('returns false if the logged in user is an author', () => {
    expect(canPublishArchiveArticle({ session: testAuthorSession })).toBe(false)
  })
  test('returns true if the logged in user is a manager', () => {
    expect(canPublishArchiveArticle({ session: testManagerSession })).toBe(true)
  })
  test('returns false if the logged in user is a user', () => {
    expect(canPublishArchiveArticle({ session: testUserSession })).toBe(false)
  })
  test('returns false if there is no logged in user', () => {
    expect(canPublishArchiveArticle({})).toBe(false)
  })
})

describe('articleCreateView', () => {
  test('returns edit if the logged in user is an admin', () => {
    expect(articleCreateView({ session: testAdminSession })).toBe('edit')
  })
  test('returns edit if the logged in user is an author', () => {
    expect(articleCreateView({ session: testAuthorSession })).toBe('edit')
  })
  test('returns edit if the logged in user is a manager', () => {
    expect(articleCreateView({ session: testManagerSession })).toBe('edit')
  })
  test('returns hidden if the logged in user is a user', () => {
    expect(articleCreateView({ session: testUserSession })).toBe('hidden')
  })
  test('returns hidden if there is no logged in user', () => {
    expect(articleCreateView({})).toBe('hidden')
  })
})

describe('articleItemView', () => {
  test('returns edit if the logged in user is an admin', () => {
    expect(articleItemView({ session: testAdminSession })).toBe('edit')
  })
  test('returns edit if the logged in user is an author and the creator of the article', () => {
    expect(
      articleItemView({
        session: testAuthorSession,
        item: { id: 'testArticleId', createdById: testAuthorSession.itemId },
      })
    ).toBe('edit')
  })
  test('returns read if the logged in user is an author and NOT the creator of the article', () => {
    expect(
      articleItemView({
        session: testAuthorSession,
        item: { id: 'testArticleId', createdById: 'someOtherAuthorId' },
      })
    ).toBe('read')
  })

  test('returns edit if the logged in user is a manager', () => {
    expect(articleItemView({ session: testManagerSession })).toBe('edit')
  })
  test('returns read if the logged in user is a user', () => {
    expect(articleItemView({ session: testUserSession })).toBe('read')
  })
  test('returns read if there is no logged in user', () => {
    expect(articleItemView({})).toBe('read')
  })
})

describe('articleStatusView', () => {
  test('returns edit if the logged in user is an admin', () => {
    expect(articleStatusView({ session: testAdminSession })).toBe('edit')
  })
  test('returns read if the logged in user is an author', () => {
    expect(articleStatusView({ session: testAuthorSession })).toBe('read')
  })
  test('returns edit if the logged in user is a manager', () => {
    expect(articleStatusView({ session: testManagerSession })).toBe('edit')
  })
  test('returns read if the logged in user is a user', () => {
    expect(articleStatusView({ session: testUserSession })).toBe('read')
  })
  test('returns read if there is no logged in user', () => {
    expect(articleStatusView({})).toBe('read')
  })
})

/* Document Access */
describe('documentItemView', () => {
  test('returns edit if the logged in user is an admin', () => {
    expect(documentItemView({ session: testAdminSession })).toBe('edit')
  })
  test('returns edit if the logged in user is an author and the creator of the article', () => {
    expect(
      documentItemView({
        session: testAuthorSession,
        item: { id: 'testArticleId', createdById: testAuthorSession.itemId },
      })
    ).toBe('edit')
  })
  test('returns read if the logged in user is an author and NOT the creator of the article', () => {
    expect(
      documentItemView({
        session: testAuthorSession,
        item: { id: 'testArticleId', createdById: 'someOtherAuthorId' },
      })
    ).toBe('read')
  })

  test('returns edit if the logged in user is a manager', () => {
    expect(documentItemView({ session: testManagerSession })).toBe('edit')
  })
  test('returns read if the logged in user is a user', () => {
    expect(documentItemView({ session: testUserSession })).toBe('read')
  })
  test('returns read if there is no logged in user', () => {
    expect(documentItemView({})).toBe('read')
  })
})

describe('documentCreateView', () => {
  test('returns edit if the logged in user is an admin', () => {
    expect(documentCreateView({ session: testAdminSession })).toBe('edit')
  })
  test('returns edit if the logged in user is an author', () => {
    expect(documentCreateView({ session: testAuthorSession })).toBe('edit')
  })
  test('returns edit if the logged in user is a manager', () => {
    expect(documentCreateView({ session: testManagerSession })).toBe('edit')
  })
  test('returns hidden if the logged in user is a user', () => {
    expect(documentCreateView({ session: testUserSession })).toBe('hidden')
  })
  test('returns hidden if there is no logged in user', () => {
    expect(documentCreateView({})).toBe('hidden')
  })
})

describe('documentPageCreateView', () => {
  test('returns edit if the logged in user is an admin', () => {
    expect(documentPageCreateView({ session: testAdminSession })).toBe('edit')
  })
  test('returns hidden if the logged in user is an author', () => {
    expect(documentPageCreateView({ session: testAuthorSession })).toBe(
      'hidden'
    )
  })
  test('returns edit if the logged in user is a manager', () => {
    expect(documentPageCreateView({ session: testManagerSession })).toBe('edit')
  })
  test('returns hidden if the logged in user is a user', () => {
    expect(documentPageCreateView({ session: testUserSession })).toBe('hidden')
  })
  test('returns hidden if there is no logged in user', () => {
    expect(documentPageCreateView({})).toBe('hidden')
  })
})

describe('documentPageItemView', () => {
  test('returns edit if the logged in user is an admin', () => {
    expect(documentPageItemView({ session: testAdminSession })).toBe('edit')
  })
  test('returns read if the logged in user is an author', () => {
    expect(documentPageItemView({ session: testAuthorSession })).toBe('read')
  })
  test('returns edit if the logged in user is a manager', () => {
    expect(documentPageItemView({ session: testManagerSession })).toBe('edit')
  })
  test('returns read if the logged in user is a user', () => {
    expect(documentPageItemView({ session: testUserSession })).toBe('read')
  })
  test('returns read if there is no logged in user', () => {
    expect(documentPageItemView({})).toBe('read')
  })
})

describe('canCreateOrUpdateDocument', () => {
  test('returns true if the logged in user is an admin', () => {
    expect(canCreateOrUpdateDocument({ session: testAdminSession })).toBe(true)
  })
  test('returns true if the logged in user is an author', () => {
    expect(canCreateOrUpdateDocument({ session: testAuthorSession })).toBe(true)
  })
  test('returns true if the logged in user is a manager', () => {
    expect(canCreateOrUpdateDocument({ session: testManagerSession })).toBe(
      true
    )
  })
  test('returns false if the logged in user is a user', () => {
    expect(canCreateOrUpdateDocument({ session: testUserSession })).toBe(false)
  })
  test('returns false if there is no logged in user', () => {
    expect(canCreateOrUpdateDocument({})).toBe(false)
  })
})

describe('canUpdateDocument filter', () => {
  test('returns true if the logged in user is an admin', () => {
    expect(canUpdateDocument({ session: testAdminSession })).toBe(true)
  })
  test('returns a filter on the item id if the logged in user is an author', () => {
    expect(canUpdateDocument({ session: testAuthorSession })).toMatchObject({
      createdBy: { id: { equals: testAuthorSession.itemId } },
    })
  })
  test('returns true if the logged in user is a manager', () => {
    expect(canUpdateDeleteArticle({ session: testManagerSession })).toBe(true)
  })
  test('returns false if the logged in user is a user', () => {
    expect(canUpdateDeleteArticle({ session: testUserSession })).toBe(false)
  })
  test('returns false if there is no logged in user', () => {
    expect(canUpdateDeleteArticle({})).toBe(false)
  })
})

describe('canDeleteDocument', () => {
  test('returns true if the logged in user is an admin', () => {
    expect(canDeleteDocument({ session: testAdminSession })).toBe(true)
  })
  test('returns false if the logged in user is an author', () => {
    expect(canDeleteDocument({ session: testAuthorSession })).toBe(false)
  })
  test('returns true if the logged in user is a manager', () => {
    expect(canDeleteDocument({ session: testManagerSession })).toBe(true)
  })
  test('returns false if the logged in user is a user', () => {
    expect(canDeleteDocument({ session: testUserSession })).toBe(false)
  })
  test('returns false if there is no logged in user', () => {
    expect(canDeleteDocument({})).toBe(false)
  })
})

describe('canCreateDocumentPage', () => {
  test('returns true if the logged in user is an admin', () => {
    expect(canCreateDocumentPage({ session: testAdminSession })).toBe(true)
  })
  test('returns false if the logged in user is an author', () => {
    expect(canCreateDocumentPage({ session: testAuthorSession })).toBe(false)
  })
  test('returns true if the logged in user is a manager', () => {
    expect(canCreateDocumentPage({ session: testManagerSession })).toBe(true)
  })
  test('returns false if the logged in user is a user', () => {
    expect(canCreateDocumentPage({ session: testUserSession })).toBe(false)
  })
  test('returns false if there is no logged in user', () => {
    expect(canCreateDocumentPage({})).toBe(false)
  })
})
