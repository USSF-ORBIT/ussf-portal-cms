import { KeystoneContext } from '@keystone-6/core/types'
import { configTestEnv } from '../testHelpers'

describe('Document Section', () => {
  let adminContext: KeystoneContext
  let userContext: KeystoneContext
  let authorContext: KeystoneContext
  let managerContext: KeystoneContext
  let sectionId: string

  // Set up test environment, seed data, and return contexts
  beforeAll(
    async () =>
      ({ adminContext, userContext, authorContext, managerContext } =
        await configTestEnv())
  )

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
      ).rejects.toThrow(/Access denied: You cannot create that DocumentSection/)
    })

    it('can query a Document Section', async () => {
      const documentSection =
        await authorContext.query.DocumentSection.findMany({
          query: 'id title document { title }',
        })

      // No document sections exist at this point,
      // so we should expect 0
      expect(documentSection.length).toBe(0)
    })

    it('cannot update a Document Section', async () => {
      expect(
        authorContext.query.DocumentSection.updateOne({
          where: { id: 'any' },
          data: { title: 'Any' },
          query: 'id title document { title }',
        })
      ).rejects.toThrow(
        /Access denied: You cannot update that DocumentSection - it may not exist/
      )
    })

    it('cannot delete a Document Section', async () => {
      expect(
        authorContext.query.DocumentSection.deleteOne({
          where: { id: 'any' },
          query: 'id title document { title }',
        })
      ).rejects.toThrow(
        /Access denied: You cannot delete that DocumentSection - it may not exist/
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
          /Access denied: You cannot create that DocumentSection/
        )
      })

      it('can query a Document Section', async () => {
        const documentSection =
          await userContext.query.DocumentSection.findMany({
            query: 'id title document { title }',
          })

        // No document sections exist at this point,
        // so we should expect 0
        expect(documentSection.length).toBe(0)
      })

      it('cannot update a Document Section', async () => {
        expect(
          userContext.query.DocumentSection.updateOne({
            where: { id: 'any' },
            data: { title: 'Any' },
            query: 'id title document { title }',
          })
        ).rejects.toThrow(
          /Access denied: You cannot update that DocumentSection - it may not exist/
        )
      })

      it('cannot delete a Document Section', async () => {
        expect(
          userContext.query.DocumentSection.deleteOne({
            where: { id: 'any' },
            query: 'id title document { title }',
          })
        ).rejects.toThrow(
          /Access denied: You cannot delete that DocumentSection - it may not exist/
        )
      })
    })
  })
})
