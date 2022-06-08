import { KeystoneContext } from '@keystone-6/core/types'

import { configTestEnv, TestEnvWithSessions } from '../testHelpers'

describe('Location schema', () => {
  let testEnv: TestEnvWithSessions

  let adminContext: KeystoneContext
  let userContext: KeystoneContext

  const testLocation = {
    name: 'My Location',
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
    it('can create a new location', async () => {
      const data = await adminContext.query.Location.createOne({
        data: testLocation,
        query: 'id name createdAt updatedAt',
      })

      expect(data).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        ...testLocation,
      })
    })

    it('can update a location', async () => {
      const existingLocations = await adminContext.query.Location.findMany({
        query: 'id',
      })

      const data = await adminContext.query.Location.updateOne({
        where: { id: existingLocations[0].id },
        data: {
          name: 'Updated Location',
        },
        query: 'id name createdAt updatedAt',
      })

      expect(data).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        name: 'Updated Location',
      })

      expect(data.createdAt).not.toBe(data.updatedAt)
    })

    it('can delete a location', async () => {
      const existingLocations = await adminContext.query.Location.findMany({
        query: 'id',
      })

      await adminContext.query.Location.deleteOne({
        where: { id: existingLocations[0].id },
      })

      const data = await adminContext.query.Location.findOne({
        where: { id: existingLocations[0].id },
        query: 'id name',
      })

      expect(data).toEqual(null)

      // Create new Location for non admin tests
      const newLocation = await adminContext.query.Location.createOne({
        data: testLocation,
        query: 'id name createdAt updatedAt',
      })

      expect(newLocation).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        ...testLocation,
      })
    })
  })

  describe('as a non admin user', () => {
    it('can query all locations', async () => {
      const data = await userContext.query.Location.findMany({
        query: 'id createdAt updatedAt name',
      })

      expect(data).toHaveLength(1)
      expect(data[0]).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        ...testLocation,
      })
    })

    it('cannot create locations', async () => {
      expect(
        userContext.query.Location.createOne({
          data: testLocation,
          query: 'id createdAt updatedAt name',
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'create' operation on the list 'Location'./
      )
    })

    it('cannot update locations', async () => {
      const existingLocations = await userContext.query.Location.findMany({
        query: 'id',
      })

      expect(
        userContext.query.Location.updateOne({
          where: { id: existingLocations[0].id },
          data: {
            name: 'Non Admin Update',
          },
          query: 'id createdAt updatedAt name',
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'update' operation on the list 'Location'./
      )
    })

    it('cannot delete a location', async () => {
      const existingLocations = await userContext.query.Location.findMany({
        query: 'id',
      })

      expect(
        userContext.query.Location.deleteOne({
          where: { id: existingLocations[0].id },
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'delete' operation on the list 'Location'./
      )
    })
  })
})
