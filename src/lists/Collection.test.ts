import { KeystoneContext } from '@keystone-6/core/types'

import { configTestEnv } from '../testHelpers'

describe('Collection schema', () => {
  let adminContext: KeystoneContext
  let userContext: KeystoneContext

  const testBookmark = {
    url: 'http://www.example.com',
    label: 'First Bookmark',
    description: 'This is an example link',
    keywords: 'example bookmark testing',
  }

  // Set up test environment, seed data, and return contexts
  beforeAll(async () => ({ adminContext, userContext } = await configTestEnv()))

  describe('as an admin user', () => {
    it('can create an empty collection', async () => {
      const data = await adminContext.query.Collection.createOne({
        data: {
          title: 'My Test Collection',
        },
        query: 'id title createdAt updatedAt',
      })

      expect(data).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        title: 'My Test Collection',
      })
    })

    it('can add a bookmark to a collection', async () => {
      const bookmark = await adminContext.query.Bookmark.createOne({
        data: testBookmark,
        query: 'id',
      })

      const collection = await adminContext.query.Collection.createOne({
        data: {
          title: 'Test Collection',
          bookmarks: { connect: { id: bookmark.id } },
        },
        query: 'id title bookmarks { id }',
      })

      expect(collection.id).toBeTruthy()
      expect(collection.bookmarks).toHaveLength(1)
      expect(collection.bookmarks[0].id).toEqual(bookmark.id)
    })

    it('can update a collection', async () => {
      const existingCollection = await adminContext.query.Collection.createOne({
        data: {
          title: 'My Test Collection',
        },
        query: 'id title createdAt updatedAt',
      })

      const data = await adminContext.query.Collection.updateOne({
        where: { id: existingCollection.id },
        data: {
          title: 'Updated Title',
        },
        query: 'id title createdAt updatedAt',
      })

      expect(data).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        title: 'Updated Title',
      })
    })

    it('cannot delete a collection', async () => {
      const existingCollections = await adminContext.query.Collection.findMany({
        query: 'id',
      })

      expect(
        adminContext.query.Collection.deleteOne({
          where: { id: existingCollections[0].id },
        })
      ).rejects.toThrow(
        'Access denied: You cannot delete that Collection - it may not exist'
      )
    })
  })

  describe('as a non admin user', () => {
    it('can query all Collections', async () => {
      const data = await userContext.query.Collection.findMany({
        query: 'id title createdAt updatedAt',
      })

      expect(data[0]).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        title: 'My Test Collection',
      })
    })

    it('cannot create collections', async () => {
      expect(
        userContext.query.Collection.createOne({
          data: {
            title: 'User Collection',
          },
          query: 'id title createdAt updatedAt',
        })
      ).rejects.toThrow('Access denied: You cannot create that Collection')
    })

    it('cannot update a collection', async () => {
      const existingCollections = await userContext.query.Collection.findMany({
        query: 'id',
      })

      expect(
        userContext.query.Collection.updateOne({
          where: { id: existingCollections[0].id },
          data: {
            title: 'Updating title by a non admin',
          },
          query: 'id title createdAt updatedAt',
        })
      ).rejects.toThrow(
        'Access denied: You cannot update that Collection - it may not exist'
      )
    })

    it('cannot delete collections', async () => {
      const existingCollections = await userContext.query.Collection.findMany({
        query: 'id',
      })

      expect(
        userContext.query.Collection.deleteOne({
          where: { id: existingCollections[0].id },
        })
      ).rejects.toThrow(
        'Access denied: You cannot delete that Collection - it may not exist'
      )
    })
  })
})
