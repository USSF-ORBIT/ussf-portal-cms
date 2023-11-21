import { KeystoneContext } from '@keystone-6/core/types'
import { configTestEnv } from '../testHelpers'

describe('LandingPage', () => {
  let adminContext: KeystoneContext
  let userContext: KeystoneContext
  let authorContext: KeystoneContext
  let managerContext: KeystoneContext

  const landingPageQuery = `id pageTitle slug`

  // Set up test environment, seed data, and return contexts
  beforeAll(
    async () =>
      ({ adminContext, userContext, authorContext, managerContext } =
        await configTestEnv())
  )

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
    })

    describe('as a non-admin user with the Manager role', () => {
      test('unable to create a landing page', async () => {
        const data = {
          pageTitle: 'Test Landing Page',
          slug: 'test-landing-page',
        }

        await expect(async () => {
          await managerContext.query.LandingPage.createOne({
            data,
          })
        }).rejects.toThrow('Access denied')
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
    })
  })
})
