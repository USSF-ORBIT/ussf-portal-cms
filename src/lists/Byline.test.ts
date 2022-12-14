import { KeystoneContext } from '@keystone-6/core/types'

import { configTestEnv, TestEnvWithSessions } from '../testHelpers'

describe('Byline schema', () => {
  let testEnv: TestEnvWithSessions

  let adminContext: KeystoneContext
  let userContext: KeystoneContext

  const testByline = {
    name: 'My Byline',
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
    it('can create a new byline', async () => {
      const data = await adminContext.query.Byline.createOne({
        data: testByline,
        query: 'id name createdAt updatedAt',
      })

      expect(data).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        ...testByline,
      })
    })

    it('cannot create a byline with more than 50 characters', () => {
      // Try to create a byline with 51 characters
      expect(
        adminContext.query.Byline.createOne({
          data: { name: 'Lorem ipsum dolor sit amet, consectetuer adipiscing' },
          query: 'id name createdAt updatedAt',
        })
      ).rejects.toThrow(/You provided invalid data for this operation./)
    })

    it('can update a byline', async () => {
      const existingByline = await adminContext.query.Byline.findMany({
        query: 'id',
      })

      const data = await adminContext.query.Byline.updateOne({
        where: { id: existingByline[0].id },
        data: {
          name: 'Updated Byline',
        },
        query: 'id name createdAt updatedAt',
      })

      expect(data).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        name: 'Updated Byline',
      })

      expect(data.createdAt).not.toBe(data.updatedAt)
    })

    it('can delete a byline', async () => {
      const existingBylines = await adminContext.query.Byline.findMany({
        query: 'id',
      })

      await adminContext.query.Byline.deleteOne({
        where: { id: existingBylines[0].id },
      })

      const data = await adminContext.query.Byline.findOne({
        where: { id: existingBylines[0].id },
        query: 'id name',
      })

      expect(data).toEqual(null)

      // Create new Byline for non admin tests
      const newByline = await adminContext.query.Byline.createOne({
        data: testByline,
        query: 'id name createdAt updatedAt',
      })

      expect(newByline).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        ...testByline,
      })
    })
  })

  describe('as a non admin user', () => {
    it('can query all bylines', async () => {
      const data = await userContext.query.Byline.findMany({
        query: 'id createdAt updatedAt name',
      })

      expect(data).toHaveLength(1)
      expect(data[0]).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        ...testByline,
      })
    })

    it('cannot create bylines', async () => {
      expect(
        userContext.query.Byline.createOne({
          data: testByline,
          query: 'id createdAt updatedAt name',
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'create' operation on the list 'Byline'./
      )
    })

    it('cannot update bylines', async () => {
      const existingBylines = await userContext.query.Byline.findMany({
        query: 'id',
      })

      expect(
        userContext.query.Byline.updateOne({
          where: { id: existingBylines[0].id },
          data: {
            name: 'Non Admin Update',
          },
          query: 'id createdAt updatedAt name',
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'update' operation on the list 'Byline'./
      )
    })

    it('cannot delete a byline', async () => {
      const existingBylines = await userContext.query.Byline.findMany({
        query: 'id',
      })

      expect(
        userContext.query.Byline.deleteOne({
          where: { id: existingBylines[0].id },
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'delete' operation on the list 'Byline'./
      )
    })
  })
})
