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
})
