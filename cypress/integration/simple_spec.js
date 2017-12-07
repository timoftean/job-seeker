

describe('My First Test', function() {
  it('Does not do much!', function() {
    expect(true).to.equal(true)
  })
})

describe('My First Test', function() {
  it('Does not do much!', function() {
    expect(true).to.equal(false)
  })
})

describe('My First Test', function() {
  it('Visits the Kitchen Sink', function() {
    cy.visit('https://example.cypress.io')
  })
})


describe('My First Test', function() {
  it('finds the content Sort', function() {
    cy.visit('http://127.0.0.1:3000')
    cy.contains('Sort').click()
  })
  
  it('clicks the link posts', function() {
    cy.visit('http://127.0.0.1:3000')
    cy.contains('Posts').click()
  })
  
  it('clicking "login" navigates to a new url', function() {
    cy.visit('http://127.0.0.1:3000')
    cy.contains('Login').click()
    cy.url().should('include', '/login')
  })

})