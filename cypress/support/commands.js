Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.get('[data-test="username"]').clear().type(username);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-button"]').click();
});


Cypress.Commands.add('loginAsStandardUser', () => {
  cy.login(Cypress.env('STANDARD_USER'), Cypress.env('PASSWORD'));
});


Cypress.Commands.add('loginAsProblemUser', () => {
  cy.login(Cypress.env('PROBLEM_USER'), Cypress.env('PASSWORD'));
});


Cypress.Commands.add('addToCartByName', (productName) => {
  cy.get('.inventory_item')
    .contains('.inventory_item_name', productName)
    .parents('.inventory_item')
    .find('button[id^="add-to-cart"]')
    .click();
});

Cypress.Commands.add('completeCheckout', (firstName, lastName, postalCode) => {
  cy.get('[data-test="checkout"]').click();
  cy.get('[data-test="firstName"]').type(firstName);
  cy.get('[data-test="lastName"]').type(lastName);
  cy.get('[data-test="postalCode"]').type(postalCode);
  cy.get('[data-test="continue"]').click();
  cy.get('[data-test="finish"]').click();
});