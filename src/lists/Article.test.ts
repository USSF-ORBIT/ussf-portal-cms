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
  let adminArticle: Record<string, any>

  const articleQuery = `id slug title preview status category`

  const testArticleData = {
    slug: 'test-article',
    title: 'Test Article',
    preview: 'This article is a test',
    category: 'InternalNews',
  }

  const resetArticles = async () => {
    // Reset articles
    const allArticles = await sudoContext.query.Article.findMany({
      query: 'id',
    })

    await sudoContext.query.Article.deleteMany({
      where: allArticles.map((a) => ({ id: a.id })),
    })

    testArticle = await sudoContext.query.Article.createOne({
      data: testArticleData,
      query: articleQuery,
    })
  }

  beforeAll(async () => {
    testEnv = await configTestEnv()
    sudoContext = testEnv.sudoContext
    adminContext = testEnv.adminContext
    userContext = testEnv.userContext
    authorContext = testEnv.authorContext
    managerContext = testEnv.managerContext
  })

  afterAll(async () => {
    await testEnv.disconnect()
  })

  describe('access', () => {
    describe('as a non-admin user with the User role', () => {
      beforeAll(async () => {
        await resetArticles()
      })

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
              category: 'InternalNews',
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
      beforeAll(async () => {
        await resetArticles()
      })

      it('can create an article', async () => {
        const testAuthorArticle = {
          slug: 'author-article',
          title: 'Author Article',
          preview: 'This article is written by an author',
          category: 'InternalNews',
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
      beforeAll(async () => {
        await resetArticles()
      })

      it('can create an article', async () => {
        const testManagerArticle = {
          slug: 'manager-article',
          title: 'Manager Article',
          preview: 'This article is written by a manager',
          category: 'InternalNews',
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
        const statusQuery = `${articleQuery} publishedDate archivedDate`

        const originalArticle = await managerContext.query.Article.findOne({
          where: { id: managerArticle.id },
          query: statusQuery,
        })

        expect(originalArticle.status).toEqual('Draft')
        expect(originalArticle.publishedDate).toBe(null)
        expect(originalArticle.archivedDate).toBe(null)

        const publishedArticle = await managerContext.query.Article.updateOne({
          where: { id: managerArticle.id },
          data: {
            status: 'Published',
          },
          query: statusQuery,
        })

        expect(publishedArticle).toMatchObject({
          ...managerArticle,
          title: 'Updated Manager Article',
          status: 'Published',
          publishedDate: expect.any(String),
          archivedDate: null,
        })

        const archivedArticle = await managerContext.query.Article.updateOne({
          where: { id: managerArticle.id },
          data: {
            status: 'Archived',
          },
          query: statusQuery,
        })

        expect(archivedArticle).toMatchObject({
          ...managerArticle,
          title: 'Updated Manager Article',
          status: 'Archived',
          publishedDate: expect.any(String),
          archivedDate: expect.any(String),
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

    describe('as an admin user', () => {
      beforeAll(async () => {
        await resetArticles()
      })

      it('can create an article', async () => {
        const testAdminArticle = {
          slug: 'admin-article',
          title: 'Admin Article',
          preview: 'This article is written by an admin',
          category: 'InternalNews',
        }

        adminArticle = await adminContext.query.Article.createOne({
          data: testAdminArticle,
          query: articleQuery,
        })

        expect(adminArticle).toMatchObject(testAdminArticle)
      })

      it('can query all articles', async () => {
        const data = await adminContext.query.Article.findMany({
          query: articleQuery,
        })

        expect(data.length).toEqual(2)
        expect(data[0]).toMatchObject(testArticle)
        expect(data[1]).toMatchObject(adminArticle)
      })

      it('can update an article it created', async () => {
        const data = await adminContext.query.Article.updateOne({
          where: { id: adminArticle.id },
          data: {
            title: 'Updated Admin Article',
          },
          query: articleQuery,
        })

        expect(data).toMatchObject({
          ...adminArticle,
          title: 'Updated Admin Article',
        })
      })

      it('can update an article’s status', async () => {
        const statusQuery = `${articleQuery} publishedDate archivedDate`

        const originalArticle = await adminContext.query.Article.findOne({
          where: { id: adminArticle.id },
          query: statusQuery,
        })

        expect(originalArticle.status).toEqual('Draft')
        expect(originalArticle.publishedDate).toBe(null)
        expect(originalArticle.archivedDate).toBe(null)

        const publishedArticle = await adminContext.query.Article.updateOne({
          where: { id: adminArticle.id },
          data: {
            status: 'Published',
          },
          query: statusQuery,
        })

        expect(publishedArticle).toMatchObject({
          ...adminArticle,
          title: 'Updated Admin Article',
          status: 'Published',
          publishedDate: expect.any(String),
          archivedDate: null,
        })

        const archivedArticle = await adminContext.query.Article.updateOne({
          where: { id: adminArticle.id },
          data: {
            status: 'Archived',
          },
          query: statusQuery,
        })

        expect(archivedArticle).toMatchObject({
          ...adminArticle,
          title: 'Updated Admin Article',
          status: 'Archived',
          publishedDate: expect.any(String),
          archivedDate: expect.any(String),
        })
      })

      it('can delete an article it created', async () => {
        await adminContext.query.Article.deleteOne({
          where: { id: adminArticle.id },
        })

        const data = await adminContext.query.Article.findOne({
          where: { id: adminArticle.id },
          query: articleQuery,
        })

        expect(data).toEqual(null)
      })

      it('can update an article it did not create', async () => {
        const data = await adminContext.query.Article.updateOne({
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
        await adminContext.query.Article.deleteOne({
          where: { id: testArticle.id },
        })

        const data = await adminContext.query.Article.findOne({
          where: { id: testArticle.id },
          query: articleQuery,
        })

        expect(data).toEqual(null)
      })
    })
  })

  describe('field validations', () => {
    beforeAll(async () => {
      await resetArticles()
    })

    it('category is required', async () => {
      const testAuthorArticle = {
        title: 'Author Article',
      }

      expect(
        authorContext.query.Article.createOne({
          data: testAuthorArticle,
          query: articleQuery,
        })
      ).rejects.toThrow(/You provided invalid data for this operation./)
    })

    it('must enter a valid slug', async () => {
      const testAuthorArticle = {
        slug: 'Invalid slug',
        title: 'Author Article',
        preview: 'This article is written by an author',
        category: 'InternalNews',
      }

      expect(
        authorContext.query.Article.createOne({
          data: testAuthorArticle,
          query: articleQuery,
        })
      ).rejects.toThrow(/You provided invalid data for this operation./)
    })

    it('slugs must be unique', async () => {
      await authorContext.query.Article.createOne({
        data: {
          slug: 'article-1',
          title: 'First article',
          category: 'InternalNews',
        },
      })

      expect(
        authorContext.query.Article.createOne({
          data: {
            slug: 'article-1',
            title: 'Second article',
            category: 'InternalNews',
          },
        })
      ).rejects.toThrow(/Unique constraint failed/)
    })

    it('generates a slug from the title if no value is passed', async () => {
      const data = await authorContext.query.Article.createOne({
        data: {
          title: 'My Article With No Slug',
          category: 'InternalNews',
        },
        query: articleQuery,
      })

      expect(data.slug).toEqual('my-article-with-no-slug')
    })

    it('cannot set the slug to an empty value', async () => {
      const article = await authorContext.query.Article.createOne({
        data: {
          title: 'An article needs a slug',
          category: 'InternalNews',
        },
        query: articleQuery,
      })

      expect(
        authorContext.query.Article.updateOne({
          where: { id: article.id },
          data: {
            slug: '',
          },
        })
      ).rejects.toThrow(/Slug is a required value/)
    })
  })
})
