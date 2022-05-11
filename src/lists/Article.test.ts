import { KeystoneContext } from '@keystone-6/core/types'

import { configTestEnv, TestEnvWithSessions } from '../testHelpers'

describe('Article schema', () => {
  let testEnv: TestEnvWithSessions

  let sudoContext: KeystoneContext
  let adminContext: KeystoneContext
  let userContext: KeystoneContext
  let authorContext: KeystoneContext
  let managerContext: KeystoneContext

  let testArticle: Record<string, any>
  let authorArticle: Record<string, any>
  let managerArticle: Record<string, any>

  const articleQuery = `id slug title preview status`

  const testArticleData = {
    slug: 'test-article',
    title: 'Test Article',
    preview: 'This article is a test',
  }

  beforeAll(async () => {
    testEnv = await configTestEnv()
    sudoContext = testEnv.sudoContext
    adminContext = testEnv.adminContext
    userContext = testEnv.userContext
    authorContext = testEnv.authorContext
    managerContext = testEnv.managerContext

    testArticle = await sudoContext.query.Article.createOne({
      data: testArticleData,
      query: articleQuery,
    })
  })

  afterAll(async () => {
    await testEnv.disconnect()
  })

  describe('as a non-admin user with the User role', () => {
    it('can query all Articles', async () => {
      const data = await userContext.query.Article.findMany({
        query: articleQuery,
      })

      expect(data[0]).toMatchObject(testArticle)
    })

    it('cannot create an article', async () => {
      expect(
        userContext.query.Article.createOne({
          data: {
            title: 'User Collection',
          },
          query: articleQuery,
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'create' operation on the list 'Article'./
      )
    })

    it('cannot update an article', async () => {
      expect(
        userContext.query.Article.updateOne({
          where: {
            id: testArticle.id,
          },
          data: {
            title: 'Updated title',
          },
          query: articleQuery,
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'update' operation on the list 'Article'./
      )
    })

    it('cannot delete an article', async () => {
      expect(
        userContext.query.Article.deleteOne({
          where: {
            id: testArticle.id,
          },
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'delete' operation on the list 'Article'./
      )
    })
  })

  describe('as a non-admin user with the Author role', () => {
    it('can create an article', async () => {
      const testAuthorArticle = {
        slug: 'author-article',
        title: 'Author Article',
        preview: 'This article is written by an author',
      }

      authorArticle = await authorContext.query.Article.createOne({
        data: testAuthorArticle,
        query: articleQuery,
      })

      expect(authorArticle).toMatchObject(testAuthorArticle)
    })

    it('can query all articles', async () => {
      const data = await authorContext.query.Article.findMany({
        query: articleQuery,
      })

      expect(data.length).toEqual(2)
      expect(data[0]).toMatchObject(testArticle)
      expect(data[1]).toMatchObject(authorArticle)
    })

    it('can update an article it created', async () => {
      const data = await authorContext.query.Article.updateOne({
        where: { id: authorArticle.id },
        data: {
          title: 'Updated Author Article',
        },
        query: articleQuery,
      })

      expect(data).toMatchObject({
        ...authorArticle,
        title: 'Updated Author Article',
      })
    })

    it('cannot update an article’s status', async () => {
      expect(
        authorContext.query.Article.updateOne({
          where: { id: authorArticle.id },
          data: {
            status: 'Published',
          },
          query: articleQuery,
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'update' operation on the item./
      )
    })

    it('can delete an article it created', async () => {
      await authorContext.query.Article.deleteOne({
        where: { id: authorArticle.id },
      })

      const data = await authorContext.query.Article.findOne({
        where: { id: authorArticle.id },
        query: articleQuery,
      })

      expect(data).toEqual(null)
    })

    it('cannot update an article it did not create', async () => {
      expect(
        authorContext.query.Article.updateOne({
          where: {
            id: testArticle.id,
          },
          data: {
            title: 'Updated title',
          },
          query: articleQuery,
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'update' operation on the item./
      )
    })

    it('cannot delete an article it did not create', async () => {
      expect(
        authorContext.query.Article.deleteOne({
          where: {
            id: testArticle.id,
          },
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'delete' operation on the item./
      )
    })
  })

  describe('as a non-admin user with the Manager role', () => {
    it('can create an article', async () => {
      const testManagerArticle = {
        slug: 'manager-article',
        title: 'Manager Article',
        preview: 'This article is written by a manager',
      }

      managerArticle = await managerContext.query.Article.createOne({
        data: testManagerArticle,
        query: articleQuery,
      })

      expect(managerArticle).toMatchObject(testManagerArticle)
    })

    it('can query all articles', async () => {
      const data = await managerContext.query.Article.findMany({
        query: articleQuery,
      })

      expect(data.length).toEqual(2)
      expect(data[0]).toMatchObject(testArticle)
      expect(data[1]).toMatchObject(managerArticle)
    })

    it('can update an article it created', async () => {
      const data = await managerContext.query.Article.updateOne({
        where: { id: managerArticle.id },
        data: {
          title: 'Updated Manager Article',
        },
        query: articleQuery,
      })

      expect(data).toMatchObject({
        ...managerArticle,
        title: 'Updated Manager Article',
      })
    })

    it('can update an article’s status', async () => {
      const data = await managerContext.query.Article.updateOne({
        where: { id: managerArticle.id },
        data: {
          status: 'Published',
        },
        query: articleQuery,
      })

      expect(data).toMatchObject({
        ...managerArticle,
        title: 'Updated Manager Article',
        status: 'Published',
      })
    })

    it('can delete an article it created', async () => {
      await managerContext.query.Article.deleteOne({
        where: { id: managerArticle.id },
      })

      const data = await managerContext.query.Article.findOne({
        where: { id: managerArticle.id },
        query: articleQuery,
      })

      expect(data).toEqual(null)
    })

    it('can update an article it did not create', async () => {
      const data = await managerContext.query.Article.updateOne({
        where: {
          id: testArticle.id,
        },
        data: {
          title: 'Updated title',
          status: 'Archived',
        },
        query: articleQuery,
      })

      expect(data).toMatchObject({
        ...testArticle,
        title: 'Updated title',
        status: 'Archived',
      })
    })

    it('can delete an article it did not create', async () => {
      await managerContext.query.Article.deleteOne({
        where: { id: testArticle.id },
      })

      const data = await managerContext.query.Article.findOne({
        where: { id: testArticle.id },
        query: articleQuery,
      })

      expect(data).toEqual(null)
    })
  })
})
