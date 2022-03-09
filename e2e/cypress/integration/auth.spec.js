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

  describe('logging in', () => {
    it('a user can log into the test IDP', () => {
      cy.loginTestIDP()
      cy.getCookie('sid').should('exist')
    })

    it('a user can log into and out of Keystone', () => {
      cy.getCookie('sid').should('exist')

      cy.visit(`/`)
      cy.url().should('eq', Cypress.config().baseUrl + '/')
      cy.reload()
      cy.contains('Signed in as JOHN.HENKE.562270783@testusers.cce.af.mil')

      /*
      cy.contains('Log out').click()
      cy.wait('@logout')

      cy.visit('/')
      cy.url().should('match', /login/)
      */
    })
  })
})
