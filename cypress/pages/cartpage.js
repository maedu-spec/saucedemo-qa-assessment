class CartPage {
  get pageTitle()         { return cy.get('.title'); }
  get cartItems()         { return cy.get('.cart_item'); }
  get cartItemNames()     { return cy.get('.inventory_item_name'); }
  get continueShoppingBtn() { return cy.get('[data-test="continue-shopping"]'); }
  get checkoutBtn()       { return cy.get('[data-test="checkout"]'); }

  visit() {
    cy.visit('/cart.html');
  }

  clickCheckout() {
    this.checkoutBtn.click();
  }

  clickContinueShopping() {
    this.continueShoppingBtn.click();
  }

  removeItemByName(productName) {
    cy.get('.cart_item')
      .contains('.inventory_item_name', productName)
      .parents('.cart_item')
      .find('button[id^="remove"]')
      .click();
  }

  assertOnCartPage() {
    cy.url().should('include', '/cart.html');
    this.pageTitle.should('have.text', 'Your Cart');
  }

  assertCartHasItems(count) {
    this.cartItems.should('have.length', count);
  }

  assertCartIsEmpty() {
    this.cartItems.should('not.exist');
  }

  assertItemInCart(productName) {
    this.cartItemNames.should('contain.text', productName);
  }

  assertItemNotInCart(productName) {
    this.cartItemNames.should('not.contain.text', productName);
  }
}

export default new CartPage();