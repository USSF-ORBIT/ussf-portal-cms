import { KeystoneContext } from '@keystone-6/core/types'
import { DateTime } from 'luxon'
import { configTestEnv } from '../testHelpers'

describe('LandingPage', () => {
  let adminContext: KeystoneContext
  let userContext: KeystoneContext
  let authorContext: KeystoneContext
  let managerContext: KeystoneContext

  const landingPageQuery = `id pageTitle slug`

  // mock out the PORTAL_URL for unit tests
  process.env.PORTAL_URL = 'http://example.com'

  // Set up test environment, seed data, and return contexts
  beforeAll(
    async () =>
      ({ adminContext, userContext, authorContext, managerContext } =
        await configTestEnv())
  )

  describe('preview feature', () => {
    test('cannot set publishedDate in the past', async () => {
      const data = {
        pageTitle: 'Test Landing Page Preview',
        slug: 'test-landing-page-preview',
      }

      const statusQuery = `${landingPageQuery} viewPageUrl status publishedDate archivedDate`

      const landingPage = await adminContext.query.LandingPage.createOne({
        data,
        query: statusQuery,
      })

      expect(landingPage.status).toEqual('Draft')
      const invalidPastDate = DateTime.now().minus({ days: 1 })

      await expect(
        adminContext.query.LandingPage.updateOne({
          where: { id: landingPage.id },
          data: {
            status: 'Published',
            publishedDate: invalidPastDate.toISO(),
          },
          query: statusQuery,
        })
      ).rejects.toThrow(/Published date cannot be in the past/)
    })

    test('generates publishedDate if setting status Published but not publishDate', async () => {
      const data = {
        pageTitle: 'Test Landing Page Preview 2',
        slug: 'test-landing-page-preview-2',
      }

      const statusQuery = `${landingPageQuery} viewPageUrl status publishedDate archivedDate`

      const landingPage = await adminContext.query.LandingPage.createOne({
        data,
        query: statusQuery,
      })

      expect(landingPage.status).toEqual('Draft')

      const publishedLanding = await adminContext.query.LandingPage.updateOne({
        where: { id: landingPage.id },
        data: {
          status: 'Published',
        },
        query: statusQuery,
      })

      expect(publishedLanding.status).toEqual('Published')

      const actualPublishedDate = DateTime.fromISO(
        publishedLanding.publishedDate
      )
      const now = DateTime.now()
      expect(actualPublishedDate.isValid).toBe(true)
      // check that the date is recent, currently not more than one minute old
      expect(actualPublishedDate > now.minus({ minute: 1 })).toBe(true)
      // check that date is before right now
      expect(actualPublishedDate < now).toBe(true)
    })

    test('preview url updates as expected', async () => {
      const data = {
        pageTitle: 'Test Landing Page Preview 3',
        slug: 'test-landing-page-preview-3',
      }

      const statusQuery = `${landingPageQuery} viewPageUrl status`

      const landingPage = await adminContext.query.LandingPage.createOne({
        data,
        query: statusQuery,
      })

      expect(landingPage.status).toEqual('Draft')
      expect(JSON.parse(landingPage.viewPageUrl)).toMatchObject({
        url: `http://example.com/landing/${landingPage.slug}`,
        label: 'Preview Landing Page',
        isPublished: false,
      })

      const publishedLanding = await adminContext.query.LandingPage.updateOne({
        where: { id: landingPage.id },
        data: {
          status: 'Published',
        },
        query: statusQuery,
      })

      expect(publishedLanding.status).toEqual('Published')
      expect(JSON.parse(publishedLanding.viewPageUrl)).toMatchObject({
        url: `http://example.com/landing/${publishedLanding.slug}`,
        label: 'View Landing Page',
        isPublished: true,
      })

      const archivedLanding = await adminContext.query.LandingPage.updateOne({
        where: { id: landingPage.id },
        data: {
          status: 'Archived',
        },
        query: statusQuery,
      })

      expect(archivedLanding.status).toEqual('Archived')
      expect(JSON.parse(archivedLanding.viewPageUrl)).toMatchObject({
        url: `http://example.com/landing/${archivedLanding.slug}`,
        label: 'Preview Landing Page',
        isPublished: false,
      })
    })
  })

  describe('access control', () => {
    describe('as an admin user', () => {
      test('can create a landing page', async () => {
        const data = {
          pageTitle: 'Test Landing Page',
          slug: 'test-landing-page',
        }

        const landingPage = await adminContext.query.LandingPage.createOne({
          data,
          query: landingPageQuery,
        })

        expect(landingPage.id).toBeTruthy()
        expect(landingPage.pageTitle).toEqual('Test Landing Page')
      })

      test('can update a landing page', async () => {
        const data = {
          pageTitle: 'Update Landing Page',
          slug: 'update-landing-page',
        }

        const landingPage = await adminContext.query.LandingPage.createOne({
          data,
        })

        const updatedLandingPage =
          await adminContext.query.LandingPage.updateOne({
            where: { id: landingPage.id },
            data: {
              pageTitle: 'Updated Test Landing Page',
            },
            query: landingPageQuery,
          })

        expect(updatedLandingPage.pageTitle).toEqual(
          'Updated Test Landing Page'
        )
      })

      test('can delete a landing page', async () => {
        const data = {
          pageTitle: 'Delete Landing Page',
          slug: 'delete-landing-page',
        }

        const landingPage = await adminContext.query.LandingPage.createOne({
          data,
        })

        const deletedLandingPage =
          await adminContext.query.LandingPage.deleteOne({
            where: { id: landingPage.id },
            query: landingPageQuery,
          })

        expect(deletedLandingPage?.id).toEqual(landingPage.id)
      })

      test('can update status', async () => {
        const data = {
          pageTitle: 'Test Landing Page Status',
          slug: 'test-landing-page-status',
        }

        const landingPage = await adminContext.query.LandingPage.createOne({
          data,
          query: landingPageQuery,
        })

        const statusQuery = `${landingPageQuery} status publishedDate archivedDate`

        const origninalLandingPage =
          await adminContext.query.LandingPage.findOne({
            where: { id: landingPage.id },
            query: statusQuery,
          })

        expect(origninalLandingPage.status).toEqual('Draft')
        expect(origninalLandingPage.publishedDate).toBe(null)
        expect(origninalLandingPage.archivedDate).toBe(null)

        const earlyDate = DateTime.now()

        const publishedLanding = await adminContext.query.LandingPage.updateOne(
          {
            where: { id: landingPage.id },
            data: {
              pageTitle: 'Updated Amdin Landing Page',
              status: 'Published',
            },
            query: statusQuery,
          }
        )

        expect(publishedLanding).toMatchObject({
          ...landingPage,
          pageTitle: 'Updated Amdin Landing Page',
          status: 'Published',
          publishedDate: expect.any(String),
          archivedDate: null,
        })

        // ensure publishedDate is a date in range of test start and now
        expect(
          DateTime.fromISO(publishedLanding.publishedDate).toMillis()
        ).toBeLessThanOrEqual(DateTime.now().toMillis())
        expect(
          DateTime.fromISO(publishedLanding.publishedDate).toMillis()
        ).toBeGreaterThan(earlyDate.toMillis())

        const archivedLanding = await adminContext.query.LandingPage.updateOne({
          where: { id: landingPage.id },
          data: {
            pageTitle: 'Updated Again Amdin Landing Page',
            status: 'Archived',
          },
          query: statusQuery,
        })

        expect(archivedLanding).toMatchObject({
          ...landingPage,
          pageTitle: 'Updated Again Amdin Landing Page',
          status: 'Archived',
          publishedDate: expect.any(String),
          archivedDate: expect.any(String),
        })

        // ensure archivedDate is a date in range of test start and now
        expect(
          DateTime.fromISO(archivedLanding.archivedDate).toMillis()
        ).toBeLessThanOrEqual(DateTime.now().toMillis())
        expect(
          DateTime.fromISO(archivedLanding.archivedDate).toMillis()
        ).toBeGreaterThan(earlyDate.toMillis())
      })
    })

    describe('as a non-admin user with the Manager role', () => {
      test('can create a landing page', async () => {
        const data = {
          pageTitle: 'Manager Landing Page',
          slug: 'manager-landing-page',
        }

        const landingPage = await managerContext.query.LandingPage.createOne({
          data,
          query: landingPageQuery,
        })

        expect(landingPage.id).toBeTruthy()
        expect(landingPage.pageTitle).toEqual('Manager Landing Page')
      })

      test('unable to delete a landing page', async () => {
        const data = {
          pageTitle: 'Manager Delete Landing Page',
          slug: 'manager-delete-landing-page',
        }

        const landingPage = await adminContext.query.LandingPage.createOne({
          data,
        })

        await expect(async () => {
          await managerContext.query.LandingPage.deleteOne({
            where: { id: landingPage.id },
            query: landingPageQuery,
          })
        }).rejects.toThrow('Access denied')
      })

      test('can update a landing page', async () => {
        const data = {
          pageTitle: 'Manager Update Landing Page',
          slug: 'manager-update-landing-page',
        }

        const landingPage = await adminContext.query.LandingPage.createOne({
          data,
        })

        const updatedLandingPage =
          await managerContext.query.LandingPage.updateOne({
            where: { id: landingPage.id },
            data: {
              pageTitle: 'Manager Updated Test Landing Page',
            },
            query: landingPageQuery,
          })

        expect(updatedLandingPage.pageTitle).toEqual(
          'Manager Updated Test Landing Page'
        )
      })

      test('can update status', async () => {
        const data = {
          pageTitle: 'Test Landing Page Status Manager',
          slug: 'test-landing-page-status-manager',
        }

        const landingPage = await adminContext.query.LandingPage.createOne({
          data,
          query: landingPageQuery,
        })

        const statusQuery = `${landingPageQuery} status publishedDate archivedDate`

        const origninalLandingPage =
          await managerContext.query.LandingPage.findOne({
            where: { id: landingPage.id },
            query: statusQuery,
          })

        expect(origninalLandingPage.status).toEqual('Draft')
        expect(origninalLandingPage.publishedDate).toBe(null)
        expect(origninalLandingPage.archivedDate).toBe(null)

        const earlyDate = DateTime.now()

        const publishedLanding =
          await managerContext.query.LandingPage.updateOne({
            where: { id: landingPage.id },
            data: {
              pageTitle: 'Updated Amdin Landing Page',
              status: 'Published',
            },
            query: statusQuery,
          })

        expect(publishedLanding).toMatchObject({
          ...landingPage,
          pageTitle: 'Updated Amdin Landing Page',
          status: 'Published',
          publishedDate: expect.any(String),
          archivedDate: null,
        })

        // ensure publishedDate is a date in range of test start and now
        expect(
          DateTime.fromISO(publishedLanding.publishedDate).toMillis()
        ).toBeLessThanOrEqual(DateTime.now().toMillis())
        expect(
          DateTime.fromISO(publishedLanding.publishedDate).toMillis()
        ).toBeGreaterThan(earlyDate.toMillis())

        const archivedLanding =
          await managerContext.query.LandingPage.updateOne({
            where: { id: landingPage.id },
            data: {
              pageTitle: 'Updated Again Amdin Landing Page',
              status: 'Archived',
            },
            query: statusQuery,
          })

        expect(archivedLanding).toMatchObject({
          ...landingPage,
          pageTitle: 'Updated Again Amdin Landing Page',
          status: 'Archived',
          publishedDate: expect.any(String),
          archivedDate: expect.any(String),
        })

        // ensure archivedDate is a date in range of test start and now
        expect(
          DateTime.fromISO(archivedLanding.archivedDate).toMillis()
        ).toBeLessThanOrEqual(DateTime.now().toMillis())
        expect(
          DateTime.fromISO(archivedLanding.archivedDate).toMillis()
        ).toBeGreaterThan(earlyDate.toMillis())
      })
    })

    describe('as a non-admin user with the Author role', () => {
      test('unable to create a landing page', async () => {
        const data = {
          pageTitle: 'Test Landing Page',
          slug: 'test-landing-page',
        }

        await expect(async () => {
          await authorContext.query.LandingPage.createOne({
            data,
          })
        }).rejects.toThrow('Access denied')
      })

      test('unable to delete a landing page', async () => {
        const data = {
          pageTitle: 'Author Delete Landing Page',
          slug: 'author-delete-landing-page',
        }

        const landingPage = await adminContext.query.LandingPage.createOne({
          data,
        })

        await expect(async () => {
          await authorContext.query.LandingPage.deleteOne({
            where: { id: landingPage.id },
            query: landingPageQuery,
          })
        }).rejects.toThrow('Access denied')
      })

      test('unable to update a landing page', async () => {
        const data = {
          pageTitle: 'Author Update Landing Page',
          slug: 'author-update-landing-page',
        }

        const landingPage = await adminContext.query.LandingPage.createOne({
          data,
        })

        await expect(async () => {
          await authorContext.query.LandingPage.updateOne({
            where: { id: landingPage.id },
            data: {
              pageTitle: 'Author Updated Test Landing Page',
            },
            query: landingPageQuery,
          })
        }).rejects.toThrow('Access denied')
      })

      test('unable to update status', async () => {
        const data = {
          pageTitle: 'Test Landing Page Status Author',
          slug: 'test-landing-page-status-author',
        }

        const landingPage = await adminContext.query.LandingPage.createOne({
          data,
          query: landingPageQuery,
        })

        const statusQuery = `${landingPageQuery} status publishedDate archivedDate`

        await expect(async () => {
          await authorContext.query.LandingPage.updateOne({
            where: { id: landingPage.id },
            data: {
              status: 'Published',
            },
            query: statusQuery,
          })
        }).rejects.toThrow('Access denied')
      })
    })

    describe('as a non-admin user with the User role', () => {
      test('unable to create a landing page', async () => {
        const data = {
          pageTitle: 'Test Landing Page',
          slug: 'test-landing-page',
        }

        await expect(async () => {
          await userContext.query.LandingPage.createOne({
            data,
          })
        }).rejects.toThrow('Access denied')
      })

      test('unable to delete a landing page', async () => {
        const data = {
          pageTitle: 'User Delete Landing Page',
          slug: 'user-delete-landing-page',
        }

        const landingPage = await adminContext.query.LandingPage.createOne({
          data,
        })

        await expect(async () => {
          await userContext.query.LandingPage.deleteOne({
            where: { id: landingPage.id },
            query: landingPageQuery,
          })
        }).rejects.toThrow('Access denied')
      })

      test('unable to update a landing page', async () => {
        const data = {
          pageTitle: 'User Update Landing Page',
          slug: 'user-update-landing-page',
        }

        const landingPage = await adminContext.query.LandingPage.createOne({
          data,
        })

        await expect(async () => {
          await userContext.query.LandingPage.updateOne({
            where: { id: landingPage.id },
            data: {
              pageTitle: 'User Updated Test Landing Page',
            },
            query: landingPageQuery,
          })
        }).rejects.toThrow('Access denied')
      })

      test('unable to update status', async () => {
        const data = {
          pageTitle: 'Test Landing Page Status User',
          slug: 'test-landing-page-status-user',
        }

        const landingPage = await adminContext.query.LandingPage.createOne({
          data,
          query: landingPageQuery,
        })

        const statusQuery = `${landingPageQuery} status publishedDate archivedDate`

        await expect(async () => {
          await userContext.query.LandingPage.updateOne({
            where: { id: landingPage.id },
            data: {
              status: 'Published',
            },
            query: statusQuery,
          })
        }).rejects.toThrow('Access denied')
      })
    })
  })
})
