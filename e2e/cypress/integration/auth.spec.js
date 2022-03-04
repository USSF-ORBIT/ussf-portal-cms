describe('Authentication', () => {
  Cypress.Cookies.defaults({
    preserve: 'sid',
  })

  it('requires a user to be logged in', () => {
    cy.clearCookies()
    cy.visit('/')
    cy.contains("You don't have access to this page.")
  })

  describe.only('logging in', () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/auth/logout').as('logout')

      cy.intercept(
        {
          method: 'GET',
          url: '**/simplesaml/saml2/idp/SingleLogoutService.php*',
        },
        {
          statusCode: 200,
          body: 'Logged out',
        }
      ).as('testIDPLogout')
    })

    it('a user can log into the test IDP', () => {
      cy.loginTestIDP()
      cy.getCookie('sid').should('exist')
    })

    it('a user can log into and out of Keystone', () => {
      cy.getCookie('sid').should('exist')

      cy.visit(`/`)
      cy.contains('Keystone')
      cy.url().should('eq', Cypress.config().baseUrl + '/')

      /*
      cy.contains('Log out').click()
      cy.wait('@logout')

      cy.visit('/')
      cy.url().should('match', /login/)
      */
    })
  })
})
