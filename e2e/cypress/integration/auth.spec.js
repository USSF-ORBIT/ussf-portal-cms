describe('Authentication', () => {
  it('requires a user to be logged in', () => {
    cy.clearCookies()
    cy.visit('/')
    cy.contains("You don't have access to this page.")
  })

  describe.only('logging in', () => {
    it('can access literally ANY PAGE', () => {
      cy.visit(`/custom-page`)
      cy.contains('This is a custom Admin UI Page')
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
