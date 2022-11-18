import { KeystoneContext } from '@keystone-6/core/types'

import { configTestEnv } from '../testHelpers'

describe('Tag schema', () => {
  let sudoContext: KeystoneContext
  let userContext: KeystoneContext
  let authorContext: KeystoneContext
  let managerContext: KeystoneContext

  let testTag: Record<string, any>
  let authorTag: Record<string, any>
  let managerTag: Record<string, any>

  const tagQuery = `id name`

  const testTagData = {
    name: 'My Test Tag',
  }

  const resetTags = async () => {
    testTag = await sudoContext.query.Tag.createOne({
      data: testTagData,
      query: tagQuery,
    })
  }

  beforeAll(async () => {
    const context = await configTestEnv()
    sudoContext = context.sudoContext
    userContext = context.userContext
    authorContext = context.authorContext
    managerContext = context.managerContext

    await resetTags()
  })

  describe('as a non-admin user with User role', () => {
    beforeAll(async () => resetTags)

    it('can query all tags', async () => {
      const data = await userContext.query.Tag.findMany({
        query: tagQuery,
      })

      expect(data[0]).toMatchObject(testTag)
    })

    it('cannot create a tag', async () => {
      expect(
        userContext.query.Tag.createOne({
          data: {
            name: 'User Tag',
          },
          query: tagQuery,
        })
      ).rejects.toThrow('Access denied: You cannot create that Tag')
    })

    it('cannot update a tag', async () => {
      expect(
        userContext.query.Tag.updateOne({
          where: {
            id: testTag.id,
          },
          data: {
            name: 'User Update',
          },
          query: tagQuery,
        })
      ).rejects.toThrow(
        'Access denied: You cannot update that Tag - it may not exist'
      )
    })

    it('cannot delete a tag', async () => {
      expect(
        userContext.query.Tag.deleteOne({
          where: {
            id: testTag.id,
          },
        })
      ).rejects.toThrow(
        'Access denied: You cannot delete that Tag - it may not exist'
      )
    })
  })

  describe('as a non-admin user with Author role', () => {
    beforeAll(async () => resetTags)

    it('can create a tag', async () => {
      const testAuthorTag = {
        name: 'Author Tag',
      }

      authorTag = await authorContext.query.Tag.createOne({
        data: testAuthorTag,
        query: tagQuery,
      })

      expect(authorTag).toMatchObject(testAuthorTag)
    })

    it('can query all tags', async () => {
      const data = await authorContext.query.Tag.findMany({
        query: tagQuery,
      })

      expect(data.length).toEqual(2)
      expect(data[0]).toMatchObject(testTag)
      expect(data[1]).toMatchObject(authorTag)
    })

    it('can update a tag it created', async () => {
      const data = await authorContext.query.Tag.updateOne({
        where: { id: authorTag.id },
        data: {
          name: 'Updated Author Tag',
        },
        query: tagQuery,
      })

      expect(data).toMatchObject({
        name: 'Updated Author Tag',
      })
    })

    it('can delete a tag it created', async () => {
      await authorContext.query.Tag.deleteOne({
        where: {
          id: authorTag.id,
        },
      })

      const data = await authorContext.query.Tag.findOne({
        where: { id: authorTag.id },
        query: tagQuery,
      })

      expect(data).toEqual(null)
    })

    it('cannot update a tag that it did not create', async () => {
      expect(
        authorContext.query.Tag.updateOne({
          where: {
            id: testTag.id,
          },
          data: {
            name: 'Not my Tag',
          },
          query: tagQuery,
        })
      ).rejects.toThrow(
        'Access denied: You cannot update that Tag - it may not exist'
      )
    })

    it('cannot delete a tag it did not create', async () => {
      expect(
        authorContext.query.Tag.deleteOne({
          where: {
            id: testTag.id,
          },
        })
      ).rejects.toThrow(
        'Access denied: You cannot delete that Tag - it may not exist'
      )
    })
  })

  describe('as a non-admin user with Manager role', () => {
    beforeAll(async () => resetTags)

    it('can create a tag', async () => {
      const testManagerTag = {
        name: 'Manager Tag',
      }

      managerTag = await managerContext.query.Tag.createOne({
        data: testManagerTag,
        query: tagQuery,
      })

      expect(managerTag).toMatchObject(testManagerTag)
    })

    it('can query all tags', async () => {
      const data = await managerContext.query.Tag.findMany({
        query: tagQuery,
      })

      expect(data.length).toEqual(2)
      expect(data[0]).toMatchObject(testTag)
      expect(data[1]).toMatchObject(managerTag)
    })

    it('can update a tag it created', async () => {
      const data = await managerContext.query.Tag.updateOne({
        where: { id: managerTag.id },
        data: {
          name: 'Updated Manager Tag',
        },
        query: tagQuery,
      })

      expect(data).toMatchObject({
        name: 'Updated Manager Tag',
      })
    })

    it('can delete a tag it created', async () => {
      await managerContext.query.Tag.deleteOne({
        where: { id: managerTag.id },
      })

      const data = await managerContext.query.Tag.findOne({
        where: { id: managerTag.id },
        query: tagQuery,
      })

      expect(data).toEqual(null)
    })

    it('can update a tag it did not create', async () => {
      const data = await managerContext.query.Tag.updateOne({
        where: { id: testTag.id },
        data: {
          name: 'Manager Updated Name',
        },
        query: tagQuery,
      })

      expect(data).toMatchObject({
        name: 'Manager Updated Name',
      })
    })

    it('can delete a tag it did not create', async () => {
      await managerContext.query.Tag.deleteOne({
        where: { id: testTag.id },
      })

      const data = await managerContext.query.Tag.findOne({
        where: { id: testTag.id },
        query: tagQuery,
      })

      expect(data).toEqual(null)
    })
  })
})
