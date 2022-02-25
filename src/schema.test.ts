import { setupTestEnv, TestEnv } from '@keystone-6/core/testing'
import { config } from '@keystone-6/core'
import { KeystoneContext } from '@keystone-6/core/types'
import { editReadAdminUI, isAdmin, lists, showHideAdminUI } from './schema'

describe('Keystone schema', () => {
  let testEnv: TestEnv
  let context: KeystoneContext

  const testConfig = config({
    db: { provider: 'sqlite', url: 'file:./test-cms.db' },
    lists,
  })
  beforeAll(async () => {
    testEnv = await setupTestEnv({ config: testConfig })
    context = testEnv.testArgs.context

    await testEnv.connect()

    // Initialize database state
    // Create 1 admin user
    // Create 1 regular user

    await context.sudo().query.User.createMany({
      data: [
        {
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'adminpassword',
          isAdmin: true,
        },
        {
          name: 'User 1',
          email: 'user1@example.com',
          password: 'user1password',
        },
      ],
    })
  })

  afterAll(async () => {
    await testEnv.disconnect()
  })

  describe('Users', () => {
    let adminUser: Record<string, any>
    let user1: Record<string, any>

    it('should allow an admin user view users', async () => {
      adminUser = await context.query.User.findOne({
        where: { email: 'admin@example.com' },
        query: 'id name email isAdmin',
      })

      // With Admin User in session, look up user1

      user1 = await context
        .withSession({
          email: adminUser.email,
          data: { email: adminUser.email, isAdmin: true },
        })
        .query.User.findOne({
          where: { email: 'user1@example.com' },
          query: 'id name email isAdmin',
        })

      expect(user1).toMatchObject({
        id: expect.any(String),
        name: 'User 1',
        email: 'user1@example.com',
      })
    })

    it('should not allow regular user to view users', async () => {
      const data = await context
        .withSession({
          email: user1.email,
          data: { email: user1.email },
          isAdmin: false,
        })
        .query.User.findOne({
          where: { email: 'admin@example.com' },
          query: 'id name email isAdmin',
        })

      expect(data).toBeNull()
    })

    it('should allow a regular user to view themselves', async () => {
      const data = await context
        .withSession({
          email: 'user1@example.com',
          data: { email: 'user1@example.com' },
        })
        .query.User.findOne({
          where: { email: 'user1@example.com' },
          query: 'id email name isAdmin',
        })

      expect(data).toMatchObject(user1)
    })
    it('should not allow regular user to update users', async () => {
      const { data, errors } = await context
        .withSession({
          itemId: user1.id,
          data: { name: 'User 1', email: 'user1@example.com', isAdmin: false },
        })
        .graphql.raw({
          query: `mutation update($id: ID!, $name: String) {
            updateUser(where: { id: $id}, data: { name: $name }){
              id
            }
          }`,
          variables: { id: user1.id, name: 'Updated User 1' },
        })

      expect(data!.updateUser).toBeNull()
      expect(errors).toHaveLength(1)
      expect(errors![0].message).toMatch(
        /Access denied: You cannot perform the 'update' operation on the list 'User'./
      )
    })
    it('should hide sensitive UI fields if not admin', () => {
      const session = {
        listKey: 'User',
        identityField: 'email',
        secretField: 'password',
        data: { email: 'user1@example.com', name: 'User 1', isAdmin: false },
      }
      const status = showHideAdminUI({ session })
      expect(status).toBe('hidden')
    })

    it('should show edit mode for sensitive UI fields if admin', () => {
      const session = {
        listKey: 'User',
        identityField: 'email',
        secretField: 'password',
        data: { email: 'admin@example.com', name: 'Admin', isAdmin: true },
      }
      const status = showHideAdminUI({ session })
      expect(status).toBe('edit')
    })

    it('should make sensitive UI fields read-only if not admin', () => {
      const session = {
        listKey: 'User',
        identityField: 'email',
        secretField: 'password',
        data: { email: 'user1@example.com', name: 'User 1', isAdmin: false },
      }
      const status = editReadAdminUI({ session })
      expect(status).toBe('read')
    })

    it('should show edit mode for sensitive UI fields if admin', () => {
      const session = {
        listKey: 'User',
        identityField: 'email',
        secretField: 'password',
        data: { email: 'admin@example.com', name: 'Admin', isAdmin: true },
      }
      const status = editReadAdminUI({ session })
      expect(status).toBe('edit')
    })

    it('isAdmin should return true if admin', () => {
      const session = {
        listKey: 'User',
        identityField: 'email',
        secretField: 'password',
        data: { email: 'admin@example.com', name: 'Admin', isAdmin: true },
      }
      const status = isAdmin({ session })
      expect(status).toBe(true)
    })
    it('isAdmin should return false if not admin', () => {
      const session = {
        listKey: 'User',
        identityField: 'email',
        secretField: 'password',
        data: { email: 'user1@example.com', name: 'User 1', isAdmin: false },
      }
      const status = isAdmin({ session })
      expect(status).toBe(false)
    })
  }) //end of user block
}) // end of describe
