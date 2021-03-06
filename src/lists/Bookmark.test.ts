import { KeystoneContext } from '@keystone-6/core/types'

import { configTestEnv, TestEnvWithSessions } from '../testHelpers'

describe('Bookmark schema', () => {
  let testEnv: TestEnvWithSessions

  let adminContext: KeystoneContext
  let userContext: KeystoneContext

  const testBookmark = {
    url: 'http://www.example.com',
    label: 'Updated Example',
    description: 'This is an example link',
    keywords: 'example bookmark testing',
  }

  beforeAll(async () => {
    testEnv = await configTestEnv()
    adminContext = testEnv.adminContext
    userContext = testEnv.userContext
  })

  afterAll(async () => {
    await testEnv.disconnect()
  })

  describe('as an admin user', () => {
    it('can create new bookmarks', async () => {
      const data = await adminContext.query.Bookmark.createOne({
        data: testBookmark,
        query: 'id url label description keywords createdAt updatedAt',
      })

      expect(data).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        ...testBookmark,
      })
    })

    it('can query all bookmarks', async () => {
      const data = await adminContext.query.Bookmark.findMany({
        query: 'id url label description keywords createdAt updatedAt',
      })

      expect(data).toHaveLength(1)
      expect(data[0]).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        ...testBookmark,
      })
    })

    it('can update a bookmark', async () => {
      const existingBookmarks = await adminContext.query.Bookmark.findMany({
        query: 'id',
      })

      const data = await adminContext.query.Bookmark.updateOne({
        where: { id: existingBookmarks[0].id },
        data: {
          label: 'Updated Example',
        },
        query: 'id url label description keywords createdAt updatedAt',
      })

      expect(data).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        ...testBookmark,
        label: 'Updated Example',
      })

      // updatedAt should be different after an update
      expect(data.createdAt).not.toBe(data.updatedAt)
    })

    it('cannot delete bookmarks', async () => {
      const existingBookmarks = await adminContext.query.Bookmark.findMany({
        query: 'id',
      })

      expect(
        adminContext.query.Bookmark.deleteOne({
          where: { id: existingBookmarks[0].id },
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'delete' operation on the list 'Bookmark'./
      )
    })
  })

  describe('as a non admin user', () => {
    it('can query all bookmarks', async () => {
      const data = await userContext.query.Bookmark.findMany({
        query: 'id url label description keywords createdAt updatedAt',
      })

      expect(data).toHaveLength(1)
      expect(data[0]).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        ...testBookmark,
      })
    })

    it('cannot create bookmarks', async () => {
      expect(
        userContext.query.Bookmark.createOne({
          data: testBookmark,
          query: 'id url label description keywords createdAt updatedAt',
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'create' operation on the list 'Bookmark'./
      )
    })

    it('cannot update bookmarks', async () => {
      const existingBookmarks = await userContext.query.Bookmark.findMany({
        query: 'id',
      })

      expect(
        userContext.query.Bookmark.updateOne({
          where: { id: existingBookmarks[0].id },
          data: {
            label: 'Updated by a non admin',
          },
          query: 'id url label description keywords createdAt updatedAt',
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'update' operation on the list 'Bookmark'./
      )
    })

    it('cannot delete bookmarks', async () => {
      const existingBookmarks = await userContext.query.Bookmark.findMany({
        query: 'id',
      })

      expect(
        userContext.query.Bookmark.deleteOne({
          where: { id: existingBookmarks[0].id },
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'delete' operation on the list 'Bookmark'./
      )
    })
  })
})
