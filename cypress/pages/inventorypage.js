/**
 * Page Object Model — Inventory (Products) Page
 * URL: https://www.saucedemo.com/inventory.html
 */
class InventoryPage {
  // ── Selectors ──────────────────────────────────────────────────────────────
  get pageTitle()           { return cy.get('.title'); }
  get productList()         { return cy.get('.inventory_list'); }
  get productItems()        { return cy.get('.inventory_item'); }
  get productNames()        { return cy.get('.inventory_item_name'); }
  get productPrices()       { return cy.get('.inventory_item_price'); }
  get sortDropdown()        { return cy.get('[data-test="product-sort-container"]'); }
  get shoppingCartBadge()   { return cy.get('.shopping_cart_badge'); }
  get shoppingCartIcon()    { return cy.get('.shopping_cart_link'); }
  get hamburgerMenu()       { return cy.get('#react-burger-menu-btn'); }
  get logoutLink()          { return cy.get('#logout_sidebar_link'); }

  visit() {
    cy.visit('/inventory.html');
  }

  addItemToCartByName(productName) {
    cy.get('.inventory_item')
      .contains('.inventory_item_name', productName)
      .parents('.inventory_item')
      .find('button[id^="add-to-cart"]')
      .click();
  }

  removeItemFromCartByName(productName) {
    cy.get('.inventory_item')
      .contains('.inventory_item_name', productName)
      .parents('.inventory_item')
      .find('button[id^="remove"]')
      .click();
  }


  addFirstNItemsToCart(count) {
    cy.get('button[id^="add-to-cart"]').each(($btn, index) => {
      if (index < count) cy.wrap($btn).click();
    });
  }

  clickShoppingCart() {
    this.shoppingCartIcon.click();
  }

 
  sortProductsBy(sortOption) {
    this.sortDropdown.select(sortOption);
  }

  openMenu() {
    this.hamburgerMenu.click();
  }

  logout() {
    this.openMenu();
    this.logoutLink.click();
  }

  assertOnInventoryPage() {
    cy.url().should('include', '/inventory.html');
    this.pageTitle.should('have.text', 'Products');
  }

  assertCartBadgeCount(count) {
    if (count === 0) {
      this.shoppingCartBadge.should('not.exist');
    } else {
      this.shoppingCartBadge.should('have.text', String(count));
    }
  }

  assertProductCountIs(count) {
    this.productItems.should('have.length', count);
  }


  assertSortedAZ() {
    this.productNames.then(($els) => {
      const names = [...$els].map((el) => el.innerText);
      expect(names).to.deep.equal([...names].sort());
    });
  }

  
  assertSortedZA() {
    this.productNames.then(($els) => {
      const names = [...$els].map((el) => el.innerText);
      expect(names).to.deep.equal([...names].sort().reverse());
    });
  }

  assertSortedPriceLowToHigh() {
    this.productPrices.then(($els) => {
      const prices = [...$els].map((el) => parseFloat(el.innerText.replace('$', '')));
      expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
    });
  }


  assertSortedPriceHighToLow() {
    this.productPrices.then(($els) => {
      const prices = [...$els].map((el) => parseFloat(el.innerText.replace('$', '')));
      expect(prices).to.deep.equal([...prices].sort((a, b) => b - a));
    });
  }

  assertAddToCartButtonVisible(productName) {
    cy.get('.inventory_item')
      .contains('.inventory_item_name', productName)
      .parents('.inventory_item')
      .find('button[id^="add-to-cart"]')
      .should('be.visible');
  }

  assertRemoveButtonVisible(productName) {
    cy.get('.inventory_item')
      .contains('.inventory_item_name', productName)
      .parents('.inventory_item')
      .find('button[id^="remove"]')
      .should('be.visible');
  }
}

export default new InventoryPage();