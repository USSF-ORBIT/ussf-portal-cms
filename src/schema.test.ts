import { setupTestEnv, TestEnv } from '@keystone-6/core/testing'
import { config } from '@keystone-6/core'
import { KeystoneContext } from '@keystone-6/core/types'
import { lists } from './schema'

describe('Keystone schema', () => {
  let testEnv: TestEnv
  let context: KeystoneContext

  const testConfig = config({
    db: { provider: 'sqlite', url: 'file:./test-cms.db' },
    lists,
  })

  const testUsers = [
    {
      name: 'Admin User',
      userId: 'admin@example.com',
      isAdmin: true,
      isEnabled: true,
    },
    {
      name: 'User 1',
      userId: 'user1@example.com',
      isAdmin: false,
      isEnabled: true,
    },
  ]

  beforeAll(async () => {
    testEnv = await setupTestEnv({ config: testConfig })
    context = testEnv.testArgs.context

    await testEnv.connect()

    // Initialize database state
    // Create 1 admin user
    // Create 1 regular user

    await context.sudo().query.User.createMany({
      data: testUsers,
    })
  })

  afterAll(async () => {
    await testEnv.disconnect()
  })

  describe('Users', () => {
    describe('as an admin user', () => {
      const adminSession = {
        name: 'Admin User',
        userId: 'admin@example.com',
        isAdmin: true,
        isEnabled: true,
      }

      it('can view all users', async () => {
        const data = await context
          .withSession(adminSession)
          .query.User.findMany({
            query: 'id name userId isAdmin isEnabled',
          })

        expect(data).toHaveLength(2)
        data.forEach((user, index) => {
          expect(user).toMatchObject({
            id: expect.any(String),
            ...testUsers[index],
          })
        })
      })

      it('can update itself', async () => {
        const data = await context
          .withSession(adminSession)
          .query.User.updateOne({
            where: { userId: 'admin@example.com' },
            data: {
              name: 'Admin New Name',
            },
            query: 'id name userId isAdmin isEnabled',
          })

        expect(data).toMatchObject({
          id: expect.any(String),
          ...testUsers[0],
          name: 'Admin New Name',
        })
      })

      it('can update other users', async () => {
        let data = await context
          .withSession(adminSession)
          .query.User.updateOne({
            where: { userId: 'user1@example.com' },
            data: {
              name: 'Test User 1 New Name',
            },
            query: 'id name userId isAdmin isEnabled',
          })

        expect(data).toMatchObject({
          id: expect.any(String),
          ...testUsers[1],
          name: 'Test User 1 New Name',
        })

        data = await context.withSession(adminSession).query.User.updateOne({
          where: { userId: 'user1@example.com' },
          data: {
            name: 'User 1',
          },
          query: 'id name userId isAdmin isEnabled',
        })

        expect(data).toMatchObject({
          id: expect.any(String),
          ...testUsers[1],
          name: 'User 1',
        })
      })

      it('cannot update the userId field', async () => {
        expect(
          context.withSession(adminSession).query.User.updateOne({
            where: { userId: 'user1@example.com' },
            data: {
              userId: 'testUser1',
            },
            query: 'id name userId isAdmin isEnabled',
          })
        ).rejects.toThrow(
          `Access denied: You cannot perform the 'update' operation on the item '{"userId":"user1@example.com"}'. You cannot update the fields ["userId"].`
        )
      })

      it('cannot update the isAdmin field', async () => {
        expect(
          context.withSession(adminSession).query.User.updateOne({
            where: { userId: 'user1@example.com' },
            data: {
              isAdmin: true,
            },
            query: 'id name userId isAdmin isEnabled',
          })
        ).rejects.toThrow(
          `Access denied: You cannot perform the 'update' operation on the item '{"userId":"user1@example.com"}'. You cannot update the fields ["isAdmin"].`
        )
      })

      it('cannot update the isEnabled field', async () => {
        expect(
          context.withSession(adminSession).query.User.updateOne({
            where: { userId: 'user1@example.com' },
            data: {
              isEnabled: false,
            },
            query: 'id name userId isAdmin isEnabled',
          })
        ).rejects.toThrow(
          `Access denied: You cannot perform the 'update' operation on the item '{"userId":"user1@example.com"}'. You cannot update the fields ["isEnabled"].`
        )
      })

      it('cannot create users', async () => {
        expect(
          context.withSession(adminSession).query.User.createOne({
            data: {
              name: 'Test User 2',
              userId: 'testUser2',
              isAdmin: false,
              isEnabled: true,
            },
          })
        ).rejects.toThrow(
          /Access denied: You cannot perform the 'create' operation on the list 'User'./
        )
      })

      it('cannot delete users', async () => {
        expect(
          context.withSession(adminSession).query.User.deleteOne({
            where: {
              userId: 'user1@example.com',
            },
          })
        ).rejects.toThrow(
          /Access denied: You cannot perform the 'delete' operation on the list 'User'./
        )
      })
    })

    describe('as a non admin user', () => {
      const userSession = {
        name: 'User 1',
        userId: 'user1@example.com',
        isAdmin: false,
        isEnabled: true,
      }

      it('can only view themselves', async () => {
        const data = await context
          .withSession(userSession)
          .query.User.findMany({
            query: 'id name userId isAdmin isEnabled',
          })

        expect(data).toHaveLength(1)
        expect(data[0]).toMatchObject({
          id: expect.any(String),
          ...testUsers[1],
        })
      })

      it('cannot query other users', async () => {
        const data = await context.withSession(userSession).query.User.findOne({
          where: { userId: 'admin@example.com' },
          query: 'id name userId isAdmin',
        })

        expect(data).toBe(null)
      })

      it('can update itself', async () => {
        let data = await context.withSession(userSession).query.User.updateOne({
          where: { userId: 'user1@example.com' },
          data: {
            name: 'User 1 New Name',
          },
          query: 'id name userId isAdmin isEnabled',
        })

        expect(data).toMatchObject({
          id: expect.any(String),
          ...testUsers[1],
          name: 'User 1 New Name',
        })

        data = await context.withSession(userSession).query.User.updateOne({
          where: { userId: 'user1@example.com' },
          data: {
            name: 'User 1',
          },
          query: 'id name userId isAdmin isEnabled',
        })

        expect(data).toMatchObject({
          id: expect.any(String),
          ...testUsers[1],
          name: 'User 1',
        })
      })

      it('cannot update other users', async () => {
        expect(
          context.withSession(userSession).query.User.updateOne({
            where: { userId: 'admin@example.com' },
            data: {
              name: 'Admin User New Name',
            },
            query: 'id name userId isAdmin isEnabled',
          })
        ).rejects.toThrow(
          `Access denied: You cannot perform the 'update' operation on the item '{"userId":"admin@example.com"}'. It may not exist.`
        )
      })

      it('cannot update the userId field', async () => {
        expect(
          context.withSession(userSession).query.User.updateOne({
            where: { userId: 'user1@example.com' },
            data: {
              userId: 'testUser1',
            },
            query: 'id name userId isAdmin isEnabled',
          })
        ).rejects.toThrow(
          `Access denied: You cannot perform the 'update' operation on the item '{"userId":"user1@example.com"}'. You cannot update the fields ["userId"].`
        )
      })

      it('cannot update the isAdmin field', async () => {
        expect(
          context.withSession(userSession).query.User.updateOne({
            where: { userId: 'user1@example.com' },
            data: {
              isAdmin: true,
            },
            query: 'id name userId isAdmin isEnabled',
          })
        ).rejects.toThrow(
          `Access denied: You cannot perform the 'update' operation on the item '{"userId":"user1@example.com"}'. You cannot update the fields ["isAdmin"].`
        )
      })

      it('cannot update the isEnabled field', async () => {
        expect(
          context.withSession(userSession).query.User.updateOne({
            where: { userId: 'user1@example.com' },
            data: {
              isEnabled: true,
            },
            query: 'id name userId isAdmin isEnabled',
          })
        ).rejects.toThrow(
          `Access denied: You cannot perform the 'update' operation on the item '{"userId":"user1@example.com"}'. You cannot update the fields ["isEnabled"].`
        )
      })

      it('cannot create users', async () => {
        expect(
          context.withSession(userSession).query.User.createOne({
            data: {
              name: 'Test User 2',
              userId: 'testUser2',
              isAdmin: false,
              isEnabled: true,
            },
          })
        ).rejects.toThrow(
          /Access denied: You cannot perform the 'create' operation on the list 'User'./
        )
      })

      it('cannot delete users', async () => {
        expect(
          context.withSession(userSession).query.User.deleteOne({
            where: {
              userId: 'user1@example.com',
            },
          })
        ).rejects.toThrow(
          /Access denied: You cannot perform the 'delete' operation on the list 'User'./
        )
      })
    })
  })

  describe('Bookmarks', () => {
    describe('as an admin user', () => {
      const adminSession = {
        name: 'Admin User',
        userId: 'admin@example.com',
        isAdmin: true,
        isEnabled: true,
      }

      const testBookmark = {
        url: 'http://www.example.com',
        label: 'Example Bookmark',
        description: 'This is an example link',
        keywords: 'example bookmark testing',
      }

      it('can create new bookmarks', async () => {
        const data = await context
          .withSession(adminSession)
          .query.Bookmark.createOne({
            data: testBookmark,
            query: 'id url label description keywords createdAt updatedAt',
          })

        expect(data).toMatchObject({
          id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          ...testBookmark,
        })

        // createdAt & updatedAt should be equal at the time of creation
        expect(data.createdAt).toBe(data.updatedAt)
      })

      it('can query all bookmarks', async () => {
        const data = await context
          .withSession(adminSession)
          .query.Bookmark.findMany({
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
        const existingBookmarks = await context
          .withSession(adminSession)
          .query.Bookmark.findMany({
            query: 'id',
          })

        const data = await context
          .withSession(adminSession)
          .query.Bookmark.updateOne({
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
        const existingBookmarks = await context
          .withSession(adminSession)
          .query.Bookmark.findMany({
            query: 'id',
          })

        expect(
          context.withSession(adminSession).query.Bookmark.deleteOne({
            where: { id: existingBookmarks[0].id },
          })
        ).rejects.toThrow(
          /Access denied: You cannot perform the 'delete' operation on the list 'Bookmark'./
        )
      })
    })

    describe('as a non admin user', () => {
      const userSession = {
        name: 'User 1',
        userId: 'user1@example.com',
        isAdmin: false,
        isEnabled: true,
      }

      const testBookmark = {
        url: 'http://www.example.com',
        label: 'Updated Example',
        description: 'This is an example link',
        keywords: 'example bookmark testing',
      }

      it('can query all bookmarks', async () => {
        const data = await context
          .withSession(userSession)
          .query.Bookmark.findMany({
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
          context.withSession(userSession).query.Bookmark.createOne({
            data: testBookmark,
            query: 'id url label description keywords createdAt updatedAt',
          })
        ).rejects.toThrow(
          /Access denied: You cannot perform the 'create' operation on the list 'Bookmark'./
        )
      })

      it('cannot update bookmarks', async () => {
        const existingBookmarks = await context
          .withSession(userSession)
          .query.Bookmark.findMany({
            query: 'id',
          })

        expect(
          context.withSession(userSession).query.Bookmark.updateOne({
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
        const existingBookmarks = await context
          .withSession(userSession)
          .query.Bookmark.findMany({
            query: 'id',
          })

        expect(
          context.withSession(userSession).query.Bookmark.deleteOne({
            where: { id: existingBookmarks[0].id },
          })
        ).rejects.toThrow(
          /Access denied: You cannot perform the 'delete' operation on the list 'Bookmark'./
        )
      })
    })
  })

  describe('Collections', () => {
    describe('as an admin user', () => {
      const adminSession = {
        name: 'Admin User',
        userId: 'admin@example.com',
        isAdmin: true,
        isEnabled: true,
      }

      const testBookmark = {
        url: 'http://www.example.com',
        label: 'First Bookmark',
        description: 'This is an example link',
        keywords: 'example bookmark testing',
      }

      it('can create an empty collection', async () => {
        const data = await context
          .withSession(adminSession)
          .query.Collection.createOne({
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

        expect(data.createdAt).toBe(data.updatedAt)
      })

      it('can add a bookmark to a collection', async () => {
        const bookmark = await context
          .withSession(adminSession)
          .query.Bookmark.createOne({
            data: testBookmark,
            query: 'id',
          })
        const collection = await context
          .withSession(adminSession)
          .query.Collection.createOne({
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
        const existingCollection = await context
          .withSession(adminSession)
          .query.Collection.createOne({
            data: {
              title: 'My Test Collection',
            },
            query: 'id title createdAt updatedAt',
          })

        const data = await context
          .withSession(adminSession)
          .query.Collection.updateOne({
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
        const existingCollections = await context
          .withSession(adminSession)
          .query.Collection.findMany({
            query: 'id',
          })

        expect(
          context.withSession(adminSession).query.Collection.deleteOne({
            where: { id: existingCollections[0].id },
          })
        ).rejects.toThrow(
          /Access denied: You cannot perform the 'delete' operation on the list 'Collection'./
        )
      })
    })

    describe('as a non admin user', () => {
      const userSession = {
        name: 'User 1',
        userId: 'user1@example.com',
        isAdmin: false,
        isEnabled: true,
      }

      it('can query all Collections', async () => {
        const data = await context
          .withSession(userSession)
          .query.Collection.findMany({
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
          context.withSession(userSession).query.Collection.createOne({
            data: {
              title: 'User Collection',
            },
            query: 'id title createdAt updatedAt',
          })
        ).rejects.toThrow(
          /Access denied: You cannot perform the 'create' operation on the list 'Collection'./
        )
      })

      it('cannot update a collection', async () => {
        const existingCollections = await context
          .withSession(userSession)
          .query.Collection.findMany({
            query: 'id',
          })

        expect(
          context.withSession(userSession).query.Collection.updateOne({
            where: { id: existingCollections[0].id },
            data: {
              title: 'Updating title by a non admin',
            },
            query: 'id title createdAt updatedAt',
          })
        ).rejects.toThrow(
          /Access denied: You cannot perform the 'update' operation on the list 'Collection'./
        )
      })

      it('cannot delete collections', async () => {
        const existingCollections = await context
          .withSession(userSession)
          .query.Collection.findMany({
            query: 'id',
          })

        expect(
          context.withSession(userSession).query.Collection.deleteOne({
            where: { id: existingCollections[0].id },
          })
        ).rejects.toThrow(
          /Access denied: You cannot perform the 'delete' operation on the list 'Collection'./
        )
      })
    })
  })
})
