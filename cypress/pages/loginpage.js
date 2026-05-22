class LoginPage {
  get usernameInput()   { return cy.get('[data-test="username"]'); }
  get passwordInput()   { return cy.get('[data-test="password"]'); }
  get loginButton()     { return cy.get('[data-test="login-button"]'); }
  get errorMessage()    { return cy.get('[data-test="error"]'); }
  get errorCloseBtn()   { return cy.get('.error-button'); }

  visit() {
    cy.visit('/');
  }

  typeUsername(username) {
    this.usernameInput.clear().type(username);
  }

  typePassword(password) {
    this.passwordInput.clear().type(password);
  }

  clickLogin() {
    this.loginButton.click();
  }

 
  login(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
  }

  assertOnLoginPage() {
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    this.loginButton.should('be.visible');
  }

  assertErrorMessage(expectedText) {
    this.errorMessage
      .should('be.visible')
      .and('contain.text', expectedText);
  }

  assertNoErrorDisplayed() {
    this.errorMessage.should('not.exist');
  }

  assertErrorCloseButtonVisible() {
    this.errorCloseBtn.should('be.visible');
  }

  dismissError() {
    this.errorCloseBtn.click();
    this.errorMessage.should('not.exist');
  }
}

export default new LoginPage();