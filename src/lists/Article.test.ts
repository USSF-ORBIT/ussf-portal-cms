import { KeystoneContext } from '@keystone-6/core/types'
import { DateTime } from 'luxon'

import { configTestEnv } from '../testHelpers'

describe('Article schema', () => {
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
  const articleQueryWithDates = `${articleQuery} publishedDate archivedDate`

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

  // mock out the PORTAL_URL for unit tests
  process.env.PORTAL_URL = 'http://example.com'

  // Set up test environment, seed data, and return contexts
  beforeAll(
    async () =>
      ({
        adminContext,
        userContext,
        authorContext,
        managerContext,
        sudoContext,
      } = await configTestEnv())
  )

  describe('access', () => {
    describe('as a non-admin user with the User role', () => {
      beforeAll(async () => {
        await resetArticles()
      })

      test('can query all Articles', async () => {
        const data = await userContext.query.Article.findMany({
          query: articleQuery,
        })

        expect(data[0]).toMatchObject(testArticle)
      })

      test('cannot create an article', async () => {
        await expect(
          userContext.query.Article.createOne({
            data: {
              title: 'User Collection',
              category: 'InternalNews',
            },
            query: articleQuery,
          })
        ).rejects.toThrow('Access denied: You cannot create that Article')
      })

      test('cannot update an article', async () => {
        await expect(
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
          'Access denied: You cannot update that Article - it may not exist'
        )
      })

      test('cannot delete an article', async () => {
        await expect(
          userContext.query.Article.deleteOne({
            where: {
              id: testArticle.id,
            },
          })
        ).rejects.toThrow(
          'Access denied: You cannot delete that Article - it may not exist'
        )
      })
    })

    describe('as a non-admin user with the Author role', () => {
      beforeAll(async () => {
        await resetArticles()
      })

      test('can create an article', async () => {
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

      test('can query all articles', async () => {
        const data = await authorContext.query.Article.findMany({
          query: articleQuery,
        })

        expect(data.length).toEqual(2)
        expect(data[0]).toMatchObject(testArticle)
        expect(data[1]).toMatchObject(authorArticle)
      })

      test('can update an article it created', async () => {
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

      test('cannot update an article’s status', async () => {
        await expect(
          authorContext.query.Article.updateOne({
            where: { id: authorArticle.id },
            data: {
              status: 'Published',
            },
            query: articleQuery,
          })
        ).rejects.toThrow(
          'Access denied: You cannot update that Article - you cannot update the fields ["status"]'
        )
      })

      test('can delete an article it created', async () => {
        await authorContext.query.Article.deleteOne({
          where: { id: authorArticle.id },
        })

        const data = await authorContext.query.Article.findOne({
          where: { id: authorArticle.id },
          query: articleQuery,
        })

        expect(data).toEqual(null)
      })

      test('cannot update an article it did not create', async () => {
        await expect(
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
          'Access denied: You cannot update that Article - it may not exist'
        )
      })

      test('cannot delete an article it did not create', async () => {
        await expect(
          authorContext.query.Article.deleteOne({
            where: {
              id: testArticle.id,
            },
          })
        ).rejects.toThrow(
          'Access denied: You cannot delete that Article - it may not exist'
        )
      })
    })

    describe('as a non-admin user with the Manager role', () => {
      beforeAll(async () => {
        await resetArticles()
      })

      test('can create an article', async () => {
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

      test('can query all articles', async () => {
        const data = await managerContext.query.Article.findMany({
          query: articleQuery,
        })

        expect(data.length).toEqual(2)
        expect(data[0]).toMatchObject(testArticle)
        expect(data[1]).toMatchObject(managerArticle)
      })

      test('can update an article it created', async () => {
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

      test('can update an article’s status', async () => {
        const statusQuery = `${articleQueryWithDates} articlePreviewUrl`

        const originalArticle = await managerContext.query.Article.findOne({
          where: { id: managerArticle.id },
          query: statusQuery,
        })

        expect(originalArticle.status).toEqual('Draft')
        expect(originalArticle.publishedDate).toBe(null)
        expect(originalArticle.archivedDate).toBe(null)
        expect(JSON.parse(originalArticle.articlePreviewUrl)).toMatchObject({
          articlePreviewUrl: `http://example.com/articles/${originalArticle.slug}`,
          label: 'Preview Article',
          isPublished: false,
        })

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

        expect(JSON.parse(publishedArticle.articlePreviewUrl)).toMatchObject({
          articlePreviewUrl: `http://example.com/articles/${publishedArticle.slug}`,
          label: 'View Article',
          isPublished: true,
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

        expect(JSON.parse(archivedArticle.articlePreviewUrl)).toMatchObject({
          articlePreviewUrl: `http://example.com/articles/${archivedArticle.slug}`,
          label: 'Preview Article',
          isPublished: false,
        })
      })

      test('can delete an article it created', async () => {
        await managerContext.query.Article.deleteOne({
          where: { id: managerArticle.id },
        })

        const data = await managerContext.query.Article.findOne({
          where: { id: managerArticle.id },
          query: articleQuery,
        })

        expect(data).toEqual(null)
      })

      test('can update an article it did not create', async () => {
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

      test('can delete an article it did not create', async () => {
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

      test('can create an article', async () => {
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

      test('can query all articles', async () => {
        const data = await adminContext.query.Article.findMany({
          query: articleQuery,
        })

        expect(data.length).toEqual(2)
        expect(data[0]).toMatchObject(testArticle)
        expect(data[1]).toMatchObject(adminArticle)
      })

      test('can update an article it created', async () => {
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

      test('can update an article’s status', async () => {
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

      test('can delete an article it created', async () => {
        await adminContext.query.Article.deleteOne({
          where: { id: adminArticle.id },
        })

        const data = await adminContext.query.Article.findOne({
          where: { id: adminArticle.id },
          query: articleQuery,
        })

        expect(data).toEqual(null)
      })

      test('can update an article it did not create', async () => {
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

      test('can delete an article it did not create', async () => {
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

    test('category is required', async () => {
      const testAuthorArticle = {
        title: 'Author Article',
      }

      await expect(
        authorContext.query.Article.createOne({
          data: testAuthorArticle,
          query: articleQuery,
        })
      ).rejects.toThrow(/You provided invalid data for this operation./)
    })

    test('must enter a valid slug', async () => {
      const testAuthorArticle = {
        slug: 'Invalid slug',
        title: 'Author Article',
        preview: 'This article is written by an author',
        category: 'InternalNews',
      }

      await expect(
        authorContext.query.Article.createOne({
          data: testAuthorArticle,
          query: articleQuery,
        })
      ).rejects.toThrow(
        /Slug must be a valid slug \(only alphanumeric characters and dashes allowed\)/
      )
    })

    test('must enter a slug less than 1000 characters', async () => {
      const testAuthorArticle = {
        slug: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-2-aaaaa',
        title: 'Author Article',
        preview: 'This article is written by an author',
        category: 'InternalNews',
      }

      await expect(
        authorContext.query.Article.createOne({
          data: testAuthorArticle,
          query: articleQuery,
        })
      ).rejects.toThrow(/Slug is too long \(maximum of 1000 characters\)/)
    })

    test('slugs must be unique', async () => {
      await authorContext.query.Article.createOne({
        data: {
          slug: 'article-1',
          title: 'First article',
          category: 'InternalNews',
        },
      })

      await expect(
        authorContext.query.Article.createOne({
          data: {
            slug: 'article-1',
            title: 'Second article',
            category: 'InternalNews',
          },
        })
      ).rejects.toThrow(/Unique constraint failed/)
    })

    test('generates a slug from the title if no value is passed', async () => {
      const data = await authorContext.query.Article.createOne({
        data: {
          title: 'My Article With No Slug',
          category: 'InternalNews',
        },
        query: articleQuery,
      })

      expect(data.slug).toEqual('my-article-with-no-slug')
    })

    test('cannot set the slug to an empty value', async () => {
      const article = await authorContext.query.Article.createOne({
        data: {
          title: 'An article needs a slug',
          category: 'InternalNews',
        },
        query: articleQuery,
      })

      await expect(
        authorContext.query.Article.updateOne({
          where: { id: article.id },
          data: {
            slug: '',
          },
        })
      ).rejects.toThrow(/Slug is a required value/)
    })

    test('cannot set publishedDate in the past', async () => {
      const testManagerArticle = {
        slug: 'manager-article',
        title: 'Manager Article',
        preview: 'This article is written by a manager',
        category: 'ORBITBlog',
      }

      // Create an article
      const managerArticle = await managerContext.query.Article.createOne({
        data: testManagerArticle,
        query: articleQuery,
      })

      const invalidPastDate = DateTime.now().minus({ days: 1 })
      await expect(
        managerContext.query.Article.updateOne({
          where: { id: managerArticle.id },
          data: {
            status: 'Published',
            publishedDate: invalidPastDate.toISO(),
          },
          query: articleQueryWithDates,
        })
      ).rejects.toThrow(/Published date cannot be in the past/)
    })

    test('generates publishedDate if setting status Published but not publishDate', async () => {
      const testManagerArticle = {
        slug: 'manager-article-auto-date',
        title: 'Manager Article',
        preview: 'This article is written by a manager',
        category: 'ORBITBlog',
      }

      // Create an article
      const managerArticle = await managerContext.query.Article.createOne({
        data: testManagerArticle,
        query: articleQuery,
      })

      const publishedArticle = await managerContext.query.Article.updateOne({
        where: { id: managerArticle.id },
        data: {
          status: 'Published',
        },
        query: articleQueryWithDates,
      })

      const actualPublishedDate = DateTime.fromISO(
        publishedArticle.publishedDate
      )
      const now = DateTime.now()
      expect(actualPublishedDate.isValid).toBe(true)
      // check that the date is recent, currently not more than one minute old
      expect(actualPublishedDate > now.minus({ minute: 1 })).toBe(true)
      // check that date is before right now
      expect(actualPublishedDate < now).toBe(true)
    })
  })

  describe('setting publishedDate', () => {
    beforeEach(async () => {
      await resetArticles()
    })

    describe('as a non-admin user with the Manager role', () => {
      test('can set publishedDate in the future without setting status, status is changed for you', async () => {
        const testManagerArticle = {
          slug: 'manager-article',
          title: 'Manager Article',
          preview: 'This article is written by a manager',
          category: 'ORBITBlog',
        }

        const query = `${articleQueryWithDates} articlePreviewUrl`

        // Create an article
        const managerArticle = await managerContext.query.Article.createOne({
          data: testManagerArticle,
          query,
        })

        const expectedFutureDate = DateTime.now().plus({ weeks: 3 })
        const publishedArticle = await managerContext.query.Article.updateOne({
          where: { id: managerArticle.id },
          data: {
            publishedDate: expectedFutureDate.toISO(),
          },
          query,
        })

        expect(publishedArticle.status).toEqual('Published')
        expect(publishedArticle.publishedDate).toBe(
          expectedFutureDate.toJSDate().toISOString()
        )
        expect(publishedArticle.archivedDate).toBe(null)

        expect(JSON.parse(publishedArticle.articlePreviewUrl)).toMatchObject({
          articlePreviewUrl: `http://example.com/articles/${testManagerArticle.slug}`,
          label: 'Preview Article',
          isPublished: false,
        })
      })

      test('can set publishedDate in the future', async () => {
        const testManagerArticle = {
          slug: 'manager-article',
          title: 'Manager Article',
          preview: 'This article is written by a manager',
          category: 'ORBITBlog',
        }

        // Create an article
        const managerArticle = await managerContext.query.Article.createOne({
          data: testManagerArticle,
          query: articleQuery,
        })

        const expectedFutureDate = DateTime.now().plus({ weeks: 3 })
        const publishedArticle = await managerContext.query.Article.updateOne({
          where: { id: managerArticle.id },
          data: {
            status: 'Published',
            publishedDate: expectedFutureDate.toISO(),
          },
          query: articleQueryWithDates,
        })

        expect(publishedArticle.status).toEqual('Published')
        expect(publishedArticle.publishedDate).toBe(
          expectedFutureDate.toJSDate().toISOString()
        )
        expect(publishedArticle.archivedDate).toBe(null)
      })
    })

    describe('as an admin user', () => {
      test('can set publishedDate in the future without status, status is set for you', async () => {
        const testAdminArticle = {
          slug: 'admin-article',
          title: 'Admin Article',
          preview: 'This article is written by an admin',
          category: 'InternalNews',
        }

        // Create an article
        const adminArticle = await adminContext.query.Article.createOne({
          data: testAdminArticle,
          query: articleQuery,
        })

        const expectedFutureDate = DateTime.now().plus({ weeks: 3 })
        const publishedArticle = await adminContext.query.Article.updateOne({
          where: { id: adminArticle.id },
          data: {
            publishedDate: expectedFutureDate.toISO(),
          },
          query: articleQueryWithDates,
        })

        expect(publishedArticle.status).toEqual('Published')
        expect(publishedArticle.publishedDate).toBe(
          expectedFutureDate.toJSDate().toISOString()
        )
        expect(publishedArticle.archivedDate).toBe(null)
      })

      test('can set publishedDate in the future', async () => {
        const testAdminArticle = {
          slug: 'admin-article',
          title: 'Admin Article',
          preview: 'This article is written by an admin',
          category: 'InternalNews',
        }

        // Create an article
        const adminArticle = await adminContext.query.Article.createOne({
          data: testAdminArticle,
          query: articleQuery,
        })

        const expectedFutureDate = DateTime.now().plus({ weeks: 3 })
        const publishedArticle = await adminContext.query.Article.updateOne({
          where: { id: adminArticle.id },
          data: {
            status: 'Published',
            publishedDate: expectedFutureDate.toISO(),
          },
          query: articleQueryWithDates,
        })

        expect(publishedArticle.status).toEqual('Published')
        expect(publishedArticle.publishedDate).toBe(
          expectedFutureDate.toJSDate().toISOString()
        )
        expect(publishedArticle.archivedDate).toBe(null)
      })
    })
  })
})
