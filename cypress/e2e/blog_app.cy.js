const user = {
  name: 'Cypress',
  username: 'cypress',
  password: 'cypress'
}

const blog = { title: 'Cypress blog', author: 'cypress', url: 'https://www.cypress.io' }

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

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.login({ username: user.username, password: user.password })
    })

    it('A blog can be created', function() {
      // toggle the visibility of the blog from
      cy.get('#add-blog-button').click()

      // fill the form
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)

      // create the blog
      cy.get('#create-blog-button').click()

      // assert that the page contains the notification correctly formatted
      cy.get('.notification').should('contain', `a new blog ${blog.title} by ${blog.author} added`)
      cy.get('.notification').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.notification').should('have.css', 'border-style', 'solid')

      // verify that the blog was added to the list
      cy.get('.blogs').should('have.length', 1)
    })

    it('A blog can be liked', function() {
      // create a dummy blog
      const token = JSON.parse(localStorage.getItem('loggedBlogAppUser')).token
      // structure the request
      const options = {
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        body: blog,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      // create the blog
      cy.request(options)

      // refresh the page
      cy.visit('')

      // expand blog details
      cy.get('#expandBlogBtn').click()

      // like the blog
      cy.get('#likeBlogBtn').click()

      // check the likes of the blog was updated
      cy.get('#likes').should('contain', '1')
    })
  })
})
