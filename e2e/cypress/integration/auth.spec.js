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
          cy.findByRole('heading', { level: 3 })
            .contains('Users')
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
          cy.findByRole('heading', { level: 3 })
            .contains('Users')
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
})
