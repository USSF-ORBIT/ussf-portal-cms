describe('Authentication', () => {
  it('requires a user to be logged in', () => {
    cy.clearCookies()
    cy.visit('/')
    cy.contains('Sign In')
  })

  describe('logging in', () => {
    it('can log in as the autocreated test user', () => {
      cy.findByLabelText('email').type(Cypress.env('TEST_EMAIL'))
      cy.findByLabelText('password').type(Cypress.env('TEST_PASSWORD'))
      cy.findByRole('button', { name: 'Sign In' }).click()

      cy.url().should('eq', Cypress.config().baseUrl + '/')

      cy.findByRole('heading', { level: 1 }).contains('Dashboard')

      cy.findByRole('main').within(() => {
        cy.findByRole('heading', { level: 3 })
          .contains('Users')
          .next()
          .should('contain', '1 item')
      })
    })
  })
})
