describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    // check that the login page contains the heading
    cy.contains('log in to application')

    // check that the login form contains the correct elements
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })
})
