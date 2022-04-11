// The structure of these tests is verbose because Cypress doesn't allow visiting multiple top-level domains in a single test
// Therefore in order to test logging in, the loginTestIDP command has to be run in a separate test from visiting Keystone URLs
describe('Authentication', () => {
  describe('without being logged in', () => {
    it('requires a user to be logged in', () => {
      cy.clearCookies()
      cy.clearCookie('sid')
      cy.getCookie('sid').should('not.exist')
      cy.visit('/')
      cy.contains("You don't have access to this page.")
    })
  })

  describe('logging in and out', () => {
    describe('as a CMS user', () => {
      it('can log into the test IDP', () => {
        cy.loginTestIDP({ username: 'cmsuser', password: 'cmsuserpass' })
      })

      it('can log into and out of Keystone', () => {
        cy.getCookie('sid').should('exist')

        cy.visit(`/`)
        cy.url().should('eq', Cypress.config().baseUrl + '/')
        cy.reload()
        cy.contains('Signed in as JOHN.HENKE.562270783@testusers.cce.af.mil')

        cy.findByRole('main').within(() => {
          cy.findByRole('heading', { level: 3, name: `Users` })
            .next()
            .should('contain', '1 item')
        })

        cy.findByRole('button', { name: 'Links and signout' }).click()
        cy.findByRole('button', { name: 'Sign out' }).click()

        cy.contains("You don't have access to this page.")
      })
    })

    describe('as a CMS admin', () => {
      it('can log into the test IDP', () => {
        cy.loginTestIDP({ username: 'cmsadmin', password: 'cmsadminpass' })
      })

      it('can log into and out of Keystone', () => {
        cy.getCookie('sid').should('exist')

        cy.visit(`/`)
        cy.url().should('eq', Cypress.config().baseUrl + '/')
        cy.reload()
        cy.contains('Signed in as FLOYD.KING.376144527@testusers.cce.af.mil')

        cy.findByRole('main').within(() => {
          cy.findByRole('heading', { level: 3, name: `Users` })
            .next()
            .should('contain', '2 items')
        })

        cy.findByRole('button', { name: 'Links and signout' }).click()
        cy.findByRole('button', { name: 'Sign out' }).click()

        cy.contains("You don't have access to this page.")
      })
    })

    describe('as a user with no CMS access', () => {
      it('can log into the test IDP', () => {
        cy.loginTestIDP({ username: 'user1', password: 'user1pass' })
      })

      it('cannot log into Keystone', () => {
        cy.getCookie('sid').should('exist')

        cy.visit(`/`)
        cy.url().should('eq', Cypress.config().baseUrl + '/')
        cy.reload()
        cy.contains("You don't have access to this page.")
      })
    })
  })

  describe('syncing user state with SLAM groups', () => {
    describe('revoking access', () => {
      it('can log into the test IDP as a CMS admin', () => {
        // Reset the database
        /* normally this would happen in a before hook, but it was reseeding before
        EVERY test instead of just once (possibly because of visiting multiple
          super-domains) - https://github.com/cypress-io/cypress/issues/1987 */
        cy.task('db:seed:revokeusers')

        cy.loginTestIDP({ username: 'cmsadmin', password: 'cmsadminpass' })
      })

      it('can view existing user state', () => {
        cy.visit(`/users`)
        cy.reload()
        cy.contains('Signed in as FLOYD.KING.376144527@testusers.cce.af.mil')

        cy.findByRole('main').within(() => {
          cy.contains('3 Users')
          cy.contains('User Id')
            .parents('tr')
            .within((tr) => {
              cy.get(tr).children().eq(3).should('contain.text', 'Is Admin')
              cy.get(tr).children().eq(4).should('contain.text', 'Is Enabled')
            })

          cy.contains('RONALD.BOYD.312969168@testusers.cce.af.mil')
            .parents('tr')
            .within((tr) => {
              cy.get(tr).children().eq(3).should('contain.text', 'False')
              cy.get(tr).children().eq(4).should('contain.text', 'True')
            })

          cy.contains('JOHN.HENKE.562270783@testusers.cce.af.mil')
            .parents('tr')
            .within((tr) => {
              cy.get(tr).children().eq(3).should('contain.text', 'True')
              cy.get(tr).children().eq(4).should('contain.text', 'True')
            })
        })
      })

      it('can log into the test IDP as a user with no CMS access', () => {
        cy.loginTestIDP({ username: 'user2', password: 'user2pass' })
      })

      it('disables an existing user who does not have access when they log in', () => {
        cy.getCookie('sid').should('exist')

        cy.visit(`/`)
        cy.url().should('eq', Cypress.config().baseUrl + '/')
        cy.reload()
        cy.contains("You don't have access to this page.")
      })

      it('can log into the test IDP as a user with no CMS admin access', () => {
        cy.loginTestIDP({ username: 'cmsuser', password: 'cmsuserpass' })
      })

      it('removes admin privileges from a user who used to be an admin when they log in', () => {
        cy.getCookie('sid').should('exist')

        cy.visit(`/`)
        cy.url().should('eq', Cypress.config().baseUrl + '/')
        cy.reload()
        cy.contains('Signed in as JOHN.HENKE.562270783@testusers.cce.af.mil')

        cy.findByRole('main').within(() => {
          cy.findByRole('heading', { level: 3, name: `Users` })
            .next()
            .should('contain', '1 item')
        })
      })

      it('can log into the test IDP as a CMS admin', () => {
        cy.loginTestIDP({ username: 'cmsadmin', password: 'cmsadminpass' })
      })

      it('can view the new user state', () => {
        cy.visit(`/users`)
        cy.reload(true)
        cy.contains('Signed in as FLOYD.KING.376144527@testusers.cce.af.mil')

        cy.findByRole('main').within(() => {
          cy.contains('3 Users')
          cy.contains('User Id')
            .parents('tr')
            .within((tr) => {
              cy.get(tr).children().eq(3).should('contain.text', 'Is Admin')
              cy.get(tr).children().eq(4).should('contain.text', 'Is Enabled')
            })

          cy.contains('RONALD.BOYD.312969168@testusers.cce.af.mil')
            .parents('tr')
            .within((tr) => {
              cy.get(tr).children().eq(3).should('contain.text', 'False')
              cy.get(tr).children().eq(4).should('contain.text', 'False')
            })

          cy.contains('JOHN.HENKE.562270783@testusers.cce.af.mil')
            .parents('tr')
            .within((tr) => {
              cy.get(tr).children().eq(3).should('contain.text', 'False')
              cy.get(tr).children().eq(4).should('contain.text', 'True')
            })
        })
      })
    })

    describe('granting access', () => {
      it('can log into the test IDP as a CMS admin', () => {
        // Reset the database
        /* normally this would happen in a before hook, but it was reseeding before
        EVERY test instead of just once (possibly because of visiting multiple
          super-domains) - https://github.com/cypress-io/cypress/issues/1987 */
        cy.task('db:seed:grantusers')

        cy.loginTestIDP({ username: 'cmsadmin', password: 'cmsadminpass' })
      })

      it('is granted admin access', () => {
        cy.visit(`/users`)
        cy.reload()
        cy.contains('Signed in as FLOYD.KING.376144527@testusers.cce.af.mil')

        cy.findByRole('main').within(() => {
          cy.contains('2 Users')
        })
      })

      it('can log into the test IDP as a CMS user', () => {
        cy.loginTestIDP({ username: 'cmsuser', password: 'cmsuserpass' })
      })

      it('is enabled', () => {
        cy.getCookie('sid').should('exist')

        cy.visit(`/`)
        cy.url().should('eq', Cypress.config().baseUrl + '/')
        cy.reload()
        cy.contains('Signed in as JOHN.HENKE.562270783@testusers.cce.af.mil')

        cy.findByRole('main').within(() => {
          cy.findByRole('heading', { level: 3, name: `Users` })
            .next()
            .should('contain', '1 item')
        })
      })
    })
  })
})
