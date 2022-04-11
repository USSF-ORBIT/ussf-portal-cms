import { test as baseTest } from '@playwright/test'
import {
  fixtures,
  TestingLibraryFixtures,
} from '@playwright-testing-library/test/fixture'
import { waitFor } from '@playwright-testing-library/test'

const test = baseTest.extend<TestingLibraryFixtures>(fixtures)
const { describe, expect } = test

describe('Authentication', () => {
  describe('without being logged in', () => {
    test('redirects a user to the portal log in page', async ({
      page,
      context,
    }) => {
      await context.clearCookies()

      await page.goto('/')

      await expect(page.url()).toBe(
        'http://localhost:3000/login?redirectTo=http%3A%2F%2Flocalhost%3A3001%2F'
      )
      await expect(page.locator('h1')).toHaveText('Space Force Portal Login')
    })
  })

  describe.only('logging in and out', () => {
    describe('as a CMS user', () => {
      test('can log into and out of Keystone', async ({
        page,
        context,
        queries: { getByLabelText, getByRole },
      }) => {
        // LOGIN START
        await context.clearCookies()

        await page.goto('http://localhost:3000/login')
        await page.locator('text=Log In').click()
        await expect(page.url()).toContain('http://localhost:8080/simplesaml/')

        await expect(
          page.locator('h2:has-text("Enter your username and password")')
        ).toBeVisible()

        const $username = await getByLabelText('Username')
        await $username.fill('cmsuser')
        const $password = await getByLabelText('Password')
        await $password.fill('cmsuserpass')

        await (await getByRole('button', { name: 'Login' })).click()

        await waitFor(() => {
          expect(page.url()).toBe('http://localhost:3000/')
        })
        // LOGIN END

        await page.goto('/')
        await expect(
          page.locator(
            'text=Signed in as JOHN.HENKE.562270783@testusers.cce.af.mil'
          )
        ).toBeVisible()

        await expect(
          page.locator('main div:has(h3:has-text("Users"))')
        ).toHaveText('Users 1 item')

        // Log out
        await (await getByRole('button', { name: 'Links and signout' })).click()
        await (await getByRole('button', { name: 'Sign out' })).click()
        await waitFor(() => {
          expect(page.locator('h1')).toHaveText('Space Force Portal Login')
        })
      })
    })
  })
})
