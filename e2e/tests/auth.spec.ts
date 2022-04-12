import { test as baseTest } from '@playwright/test'
import {
  fixtures,
  TestingLibraryFixtures,
} from '@playwright-testing-library/test/fixture'
import { LoginPage } from '../models/Login'

type CustomFixtures = {
  loginPage: LoginPage
}

const test = baseTest.extend<TestingLibraryFixtures & CustomFixtures>({
  ...fixtures,
  loginPage: async ({ page, context }, use) => {
    await use(new LoginPage(page, context))
  },
})

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

  describe('logging in and out', () => {
    describe('as a CMS user', () => {
      test('can log into and out of Keystone', async ({ page, loginPage }) => {
        await loginPage.login('cmsuser', 'cmsuserpass')

        await expect(page.locator('text=WELCOME, JOHN HENKE')).toBeVisible()

        await page.goto('http://localhost:3001')
        await expect(
          page.locator(
            'text=Signed in as JOHN.HENKE.562270783@testusers.cce.af.mil'
          )
        ).toBeVisible()

        await expect(
          page.locator('main div:has(h3:has-text("Users"))')
        ).toHaveText('Users 1 item')

        await loginPage.logout()
      })
    })
  })
})
