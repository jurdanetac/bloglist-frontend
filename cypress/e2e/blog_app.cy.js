const user = {
  name: 'Cypress',
  username: 'cypress',
  password: 'cypress'
}

describe('Blog app', function() {
  // initialize settings
  beforeEach(function() {
    // reset the database
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    // create here a user to backend
    cy.request('POST', 'http://localhost:3003/api/users', user)

    // visit the page
    cy.visit('')
  })

  it('Login form is shown', function() {
    // check that the login page contains the heading
    cy.contains('log in to application')

    // check that the login form contains the correct elements
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  // test login processes
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      // login with the created user
      cy.login({ username: user.username, password: user.password })

      // assert that the page contains the correct name
      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function() {
      // fill the form with wrong credentials
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      // assert that the page contains the error message correctly formatted
      cy.get('.error').should('contain', 'Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })
})
