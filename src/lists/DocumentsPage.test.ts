import { KeystoneContext } from '@keystone-6/core/types'
import { configTestEnv, TestEnvWithSessions } from '../testHelpers'

describe('Document Page', () => {
  let testEnv: TestEnvWithSessions

  let adminContext: KeystoneContext
  let userContext: KeystoneContext
  let authorContext: KeystoneContext
  let managerContext: KeystoneContext
  let pageId: string

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
    it('can create a Document Page', async () => {
      const documentPage = await adminContext.query.DocumentsPage.createOne({
        data: {
          pageTitle: 'USSF Documentation',
        },
        query: 'id pageTitle sections { title  document { title } }',
      })

      const obj = {
        id: expect.any(String),
        pageTitle: 'USSF Documentation',
        sections: [],
      }
      expect(documentPage).toMatchObject(obj)
      pageId = documentPage.id
    })

    it('can query a Document Page', async () => {
      const documentPage = await adminContext.query.DocumentsPage.findOne({
        where: { id: pageId.toString() },
        query: 'id pageTitle sections { title  document { title } }',
      })

      const obj = {
        id: pageId,
        pageTitle: 'USSF Documentation',
        sections: [],
      }
      expect(documentPage).toMatchObject(obj)
      pageId = documentPage.id
    })

    it('can update a Document Page', async () => {
      const documentPage = await adminContext.query.DocumentsPage.updateOne({
        where: { id: pageId.toString() },
        data: {
          pageTitle: 'USSF Documents',
        },
        query: 'id pageTitle sections { title  document { title } }',
      })

      const obj = {
        id: expect.any(String),
        pageTitle: 'USSF Documents',
        sections: [],
      }
      expect(documentPage).toMatchObject(obj)
    })

    it('can delete a Document Page', async () => {
      const documentPage = await adminContext.query.DocumentsPage.deleteOne({
        where: { id: pageId.toString() },
        query: 'id pageTitle sections { title  document { title } }',
      })

      const obj = {
        id: pageId,
        pageTitle: 'USSF Documents',
        sections: [],
      }
      expect(documentPage).toMatchObject(obj)
    })
  })
  describe('as a manager user with the Manager role', () => {
    it('can create a Document Page', async () => {
      const documentPage = await managerContext.query.DocumentsPage.createOne({
        data: {
          pageTitle: 'USSF Documentation',
        },
        query: 'id pageTitle sections { title  document { title } }',
      })

      const obj = {
        id: expect.any(String),
        pageTitle: 'USSF Documentation',
        sections: [],
      }
      expect(documentPage).toMatchObject(obj)
      pageId = documentPage.id
    })

    it('can query a Document Page', async () => {
      const documentPage = await managerContext.query.DocumentsPage.findOne({
        where: { id: pageId.toString() },
        query: 'id pageTitle sections { title  document { title } }',
      })

      const obj = {
        id: pageId,
        pageTitle: 'USSF Documentation',
        sections: [],
      }
      expect(documentPage).toMatchObject(obj)
      pageId = documentPage.id
    })

    it('can update a Document Page', async () => {
      const documentPage = await managerContext.query.DocumentsPage.updateOne({
        where: { id: pageId.toString() },
        data: {
          pageTitle: 'USSF Documents',
        },
        query: 'id pageTitle sections { title  document { title } }',
      })

      const obj = {
        id: expect.any(String),
        pageTitle: 'USSF Documents',
        sections: [],
      }
      expect(documentPage).toMatchObject(obj)
    })

    it('can delete a Document Page', async () => {
      const documentPage = await managerContext.query.DocumentsPage.deleteOne({
        where: { id: pageId.toString() },
        query: 'id pageTitle sections { title  document { title } }',
      })

      const obj = {
        id: pageId,
        pageTitle: 'USSF Documents',
        sections: [],
      }
      expect(documentPage).toMatchObject(obj)
    })
  })

  describe('as an author user with the Author role', () => {
    it('cannot create a Document Page', async () => {
      expect(
        authorContext.query.DocumentsPage.createOne({
          data: {
            pageTitle: 'USSF Documentation',
          },
          query: 'id pageTitle sections { title  document { title } }',
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'create' operation on the list 'DocumentsPage'./
      )
    })

    it('can query a Document Page', async () => {
      const documentPage = await authorContext.query.DocumentsPage.findMany({
        query: 'id pageTitle sections { title  document { title } }',
      })

      expect(documentPage).not.toBeNull()
    })

    it('can update a Document Page', async () => {
      // Create a page as an admin
      const documentPage = await adminContext.query.DocumentsPage.createOne({
        data: {
          pageTitle: 'USSF Documentation',
        },
        query: 'id',
      })
      pageId = documentPage.id
      // Update a page as an author
      const updatedPage = await authorContext.query.DocumentsPage.updateOne({
        where: { id: pageId.toString() },
        data: { pageTitle: 'USSF Documents' },
        query: 'id pageTitle sections { title  document { title } }',
      })

      const obj = {
        id: pageId,
        pageTitle: 'USSF Documents',
        sections: [],
      }
      expect(updatedPage).toMatchObject(obj)
    })

    it('cannot delete a Document Page', async () => {
      expect(
        authorContext.query.DocumentsPage.deleteOne({
          where: { id: pageId.toString() },
          query: 'id pageTitle sections { title  document { title } }',
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'delete' operation on the list 'DocumentsPage'./
      )
    })
  })
  describe('as a user with the User role', () => {
    it('cannot create a Document Page', async () => {
      expect(
        userContext.query.DocumentsPage.createOne({
          data: {
            pageTitle: 'USSF Documentation',
          },
          query: 'id pageTitle sections { title  document { title } }',
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'create' operation on the list 'DocumentsPage'./
      )
    })

    it('can query a Document Page', async () => {
      const documentPage = await userContext.query.DocumentsPage.findMany({
        query: 'id pageTitle sections { title  document { title } }',
      })

      expect(documentPage).not.toBeNull()
    })

    it('cannot update a Document Page', async () => {
      // Create a page as an admin
      const documentPage = await adminContext.query.DocumentsPage.createOne({
        data: {
          pageTitle: 'USSF Documentation',
        },
        query: 'id',
      })
      pageId = documentPage.id

      expect(
        userContext.query.DocumentsPage.updateOne({
          where: { id: pageId.toString() },
          data: { pageTitle: 'Any' },
          query: 'id pageTitle sections { title  document { title } }',
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'update' operation on the list 'DocumentsPage'./
      )
    })

    it('cannot delete a Document Page', async () => {
      expect(
        userContext.query.DocumentsPage.deleteOne({
          where: { id: pageId.toString() },
          query: 'id pageTitle sections { title  document { title } }',
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'delete' operation on the list 'DocumentsPage'./
      )
    })
  })
})
