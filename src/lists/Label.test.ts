import { KeystoneContext } from '@keystone-6/core/types'

import { configTestEnv, TestEnvWithSessions } from '../testHelpers'

describe('Label schema', () => {
  let testEnv: TestEnvWithSessions

  let adminContext: KeystoneContext
  let userContext: KeystoneContext

  const testLabel = {
    name: 'My Label',
    type: 'Source',
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
    it('can create a new label', async () => {
      const data = await adminContext.query.Label.createOne({
        data: testLabel,
        query: 'id name createdAt updatedAt type',
      })

      expect(data).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        ...testLabel,
      })
    })

    it('can update a label', async () => {
      const existingLabels = await adminContext.query.Label.findMany({
        query: 'id',
      })

      const data = await adminContext.query.Label.updateOne({
        where: { id: existingLabels[0].id },
        data: {
          name: 'Updated Label',
        },
        query: 'id name createdAt updatedAt',
      })

      expect(data).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        name: 'Updated Label',
      })

      expect(data.createdAt).not.toBe(data.updatedAt)
    })

    it('can delete a label', async () => {
      const existingLabels = await adminContext.query.Label.findMany({
        query: 'id',
      })

      await adminContext.query.Label.deleteOne({
        where: { id: existingLabels[0].id },
      })

      const data = await adminContext.query.Label.findOne({
        where: { id: existingLabels[0].id },
        query: 'id name',
      })

      expect(data).toEqual(null)

      // Create new Label for non admin tests
      const newLabel = await adminContext.query.Label.createOne({
        data: testLabel,
        query: 'id name createdAt updatedAt type',
      })

      expect(newLabel).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        ...testLabel,
      })
    })
  })

  describe('as a non admin user', () => {
    it('can query all labels', async () => {
      const data = await userContext.query.Label.findMany({
        query: 'id createdAt updatedAt name type',
      })

      expect(data).toHaveLength(1)
      expect(data[0]).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        ...testLabel,
      })
    })

    it('cannot create labels', async () => {
      expect(
        userContext.query.Label.createOne({
          data: testLabel,
          query: 'id createdAt updatedAt name',
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'create' operation on the list 'Label'./
      )
    })

    it('cannot update labels', async () => {
      const existingLabels = await userContext.query.Label.findMany({
        query: 'id',
      })

      expect(
        userContext.query.Label.updateOne({
          where: { id: existingLabels[0].id },
          data: {
            name: 'Non Admin Update',
          },
          query: 'id createdAt updatedAt name',
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'update' operation on the list 'Label'./
      )
    })

    it('cannot delete a label', async () => {
      const existingLabels = await userContext.query.Label.findMany({
        query: 'id',
      })

      expect(
        userContext.query.Label.deleteOne({
          where: { id: existingLabels[0].id },
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'delete' operation on the list 'Label'./
      )
    })
  })
})
