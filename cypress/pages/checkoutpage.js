class CheckoutPage {
  get firstNameInput()    { return cy.get('[data-test="firstName"]'); }
  get lastNameInput()     { return cy.get('[data-test="lastName"]'); }
  get postalCodeInput()   { return cy.get('[data-test="postalCode"]'); }
  get continueBtn()       { return cy.get('[data-test="continue"]'); }
  get cancelBtn()         { return cy.get('[data-test="cancel"]'); }
  get errorMessage()      { return cy.get('[data-test="error"]'); }

  get summaryItems()      { return cy.get('.cart_item'); }
  get subtotalLabel()     { return cy.get('.summary_subtotal_label'); }
  get taxLabel()          { return cy.get('.summary_tax_label'); }
  get totalLabel()        { return cy.get('.summary_total_label'); }
  get finishBtn()         { return cy.get('[data-test="finish"]'); }

  get completeHeader()    { return cy.get('.complete-header'); }
  get completeText()      { return cy.get('.complete-text'); }
  get backHomeBtn()       { return cy.get('[data-test="back-to-products"]'); }

  visitStepOne() {
    cy.visit('/checkout-step-one.html');
  }


  fillCheckoutInfo(firstName, lastName, postalCode) {
    if (firstName) this.firstNameInput.clear().type(firstName);
    if (lastName)  this.lastNameInput.clear().type(lastName);
    if (postalCode) this.postalCodeInput.clear().type(postalCode);
  }

  clickContinue() {
    this.continueBtn.click();
  }

  clickCancel() {
    this.cancelBtn.click();
  }


  submitCheckoutInfo(firstName, lastName, postalCode) {
    this.fillCheckoutInfo(firstName, lastName, postalCode);
    this.clickContinue();
  }

  clickFinish() {
    this.finishBtn.click();
  }

  clickBackHome() {
    this.backHomeBtn.click();
  }

  assertOnCheckoutStepOne() {
    cy.url().should('include', '/checkout-step-one.html');
  }

  assertErrorMessage(expectedText) {
    this.errorMessage
      .should('be.visible')
      .and('contain.text', expectedText);
  }

  assertOnCheckoutStepTwo() {
    cy.url().should('include', '/checkout-step-two.html');
  }

  assertSummaryHasItems(count) {
    this.summaryItems.should('have.length', count);
  }

  assertSubtotalVisible() {
    this.subtotalLabel.should('be.visible');
  }

  assertTotalVisible() {
    this.totalLabel.should('be.visible');
  }

 
  getTotalAmount() {
    return this.totalLabel.invoke('text').then((text) => {
      return parseFloat(text.replace(/[^0-9.]/g, ''));
    });
  }

  assertOnCheckoutComplete() {
    cy.url().should('include', '/checkout-complete.html');
  }

  assertOrderConfirmed() {
    this.completeHeader
      .should('be.visible')
      .and('have.text', 'Thank you for your order!');
  }

  assertCompleteTextVisible() {
    this.completeText.should('be.visible');
  }
}

export default new CheckoutPage();