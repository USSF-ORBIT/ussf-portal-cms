import { KeystoneContext } from '@keystone-6/core/types'

import { configTestEnv } from '../testHelpers'

describe('Location schema', () => {
  let adminContext: KeystoneContext
  let userContext: KeystoneContext

  const testLocation = {
    name: 'My Location',
  }

  // Set up test environment, seed data, and return contexts
  beforeAll(async () => ({ adminContext, userContext } = await configTestEnv()))

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

    it('cannot create a location more than 50 characters', () => {
      // Try to create a location with 51 characters
      expect(
        adminContext.query.Location.createOne({
          data: { name: 'Lorem ipsum dolor sit amet, consectetuer adipiscing' },
          query: 'id name createdAt updatedAt',
        })
      ).rejects.toThrow(/You provided invalid data for this operation./)
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
      ).rejects.toThrow('Access denied: You cannot create that Location')
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
        'Access denied: You cannot update that Location - it may not exist'
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
        'Access denied: You cannot delete that Location - it may not exist'
      )
    })
  })
})
