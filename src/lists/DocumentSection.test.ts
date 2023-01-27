import { KeystoneContext } from '@keystone-6/core/types'
import { configTestEnv, TestEnvWithSessions } from '../testHelpers'

describe('Document Section', () => {
  let testEnv: TestEnvWithSessions

  let adminContext: KeystoneContext
  let userContext: KeystoneContext
  let authorContext: KeystoneContext
  let managerContext: KeystoneContext
  let sectionId: string

  beforeAll(async () => {
    testEnv = await configTestEnv()
    adminContext = testEnv.adminContext
    userContext = testEnv.userContext
    authorContext = testEnv.authorContext
    managerContext = testEnv.managerContext
  })

  afterAll(async () => {
    await testEnv.disconnect()
  })

  describe('as an admin user with the User role', () => {
    it('can create a Document Section', async () => {
      const documentSection =
        await adminContext.query.DocumentSection.createOne({
          data: {
            title: 'Essential Reading',
          },
          query: 'id title document { title }',
        })

      const obj = {
        id: expect.any(String),
        title: 'Essential Reading',
        document: [],
      }
      expect(documentSection).toMatchObject(obj)
      sectionId = documentSection.id
    })

    it('can query a Document Section', async () => {
      const documentSection = await adminContext.query.DocumentSection.findOne({
        where: { id: sectionId.toString() },
        query: 'id title document { title }',
      })

      const obj = {
        id: sectionId,
        title: 'Essential Reading',
        document: [],
      }
      expect(documentSection).toMatchObject(obj)
      sectionId = documentSection.id
    })

    it('can update a Document Section', async () => {
      const documentSection =
        await adminContext.query.DocumentSection.updateOne({
          where: { id: sectionId.toString() },
          data: {
            title: 'Important Reading',
          },
          query: 'id title document { title }',
        })

      const obj = {
        id: expect.any(String),
        title: 'Important Reading',
        document: [],
      }
      expect(documentSection).toMatchObject(obj)
    })

    it('can delete a Document Section', async () => {
      const documentSection =
        await adminContext.query.DocumentSection.deleteOne({
          where: { id: sectionId.toString() },
          query: 'id title document { title }',
        })

      const obj = {
        id: sectionId,
        title: 'Important Reading',
        document: [],
      }
      expect(documentSection).toMatchObject(obj)
    })
  })
  describe('as a manager user with the Manager role', () => {
    it('can create a Document Section', async () => {
      const documentSection =
        await managerContext.query.DocumentSection.createOne({
          data: {
            title: 'Essential Reading',
          },
          query: 'id title document { title }',
        })

      const obj = {
        id: expect.any(String),
        title: 'Essential Reading',
        document: [],
      }
      expect(documentSection).toMatchObject(obj)
      sectionId = documentSection.id
    })

    it('can query a Document Section', async () => {
      const documentSection =
        await managerContext.query.DocumentSection.findOne({
          where: { id: sectionId.toString() },
          query: 'id title document { title }',
        })

      const obj = {
        id: sectionId,
        title: 'Essential Reading',
        document: [],
      }
      expect(documentSection).toMatchObject(obj)
      sectionId = documentSection.id
    })

    it('can update a Document Section', async () => {
      const documentSection =
        await managerContext.query.DocumentSection.updateOne({
          where: { id: sectionId.toString() },
          data: {
            title: 'Important Reading',
          },
          query: 'id title document { title }',
        })

      const obj = {
        id: expect.any(String),
        title: 'Important Reading',
        document: [],
      }
      expect(documentSection).toMatchObject(obj)
    })

    it('can delete a Document Section', async () => {
      const documentSection =
        await managerContext.query.DocumentSection.deleteOne({
          where: { id: sectionId.toString() },
          query: 'id title document { title }',
        })

      const obj = {
        id: sectionId,
        title: 'Important Reading',
        document: [],
      }
      expect(documentSection).toMatchObject(obj)
    })
  })

  describe('as an author user with the Author role', () => {
    it('cannot create a Document Section', async () => {
      expect(
        authorContext.query.DocumentSection.createOne({
          data: {
            title: 'Essential Reading',
          },
          query: 'id title document { title }',
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'create' operation on the list 'DocumentSection'./
      )
    })

    it('can query a Document Section', async () => {
      const documentSection =
        await authorContext.query.DocumentSection.findMany({
          query: 'id title document { title }',
        })

      expect(documentSection).not.toBeNull()
    })

    it('cannot update a Document Section', async () => {
      expect(
        authorContext.query.DocumentSection.updateOne({
          where: { id: 'any' },
          data: { title: 'Any' },
          query: 'id title document { title }',
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'update' operation on the list 'DocumentSection'./
      )
    })

    it('cannot delete a Document Section', async () => {
      expect(
        authorContext.query.DocumentSection.deleteOne({
          where: { id: 'any' },
          query: 'id title document { title }',
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'delete' operation on the list 'DocumentSection'./
      )
    })
    describe('as a user with the User role', () => {
      it('cannot create a Document Section', async () => {
        expect(
          userContext.query.DocumentSection.createOne({
            data: {
              title: 'Essential Reading',
            },
            query: 'id title document { title }',
          })
        ).rejects.toThrow(
          /Access denied: You cannot perform the 'create' operation on the list 'DocumentSection'./
        )
      })

      it('can query a Document Section', async () => {
        const documentSection =
          await userContext.query.DocumentSection.findMany({
            query: 'id title document { title }',
          })

        expect(documentSection).not.toBeNull()
      })

      it('cannot update a Document Section', async () => {
        expect(
          userContext.query.DocumentSection.updateOne({
            where: { id: 'any' },
            data: { title: 'Any' },
            query: 'id title document { title }',
          })
        ).rejects.toThrow(
          /Access denied: You cannot perform the 'update' operation on the list 'DocumentSection'./
        )
      })

      it('cannot delete a Document Section', async () => {
        expect(
          userContext.query.DocumentSection.deleteOne({
            where: { id: 'any' },
            query: 'id title document { title }',
          })
        ).rejects.toThrow(
          /Access denied: You cannot perform the 'delete' operation on the list 'DocumentSection'./
        )
      })
    })
  })
})
