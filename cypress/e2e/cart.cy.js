import InventoryPage from '../pages/inventorypage';
import CartPage from '../pages/cartpage';

describe('Cart — Add & Remove Items', () => {
  context('standard_user', () => {
    beforeEach(() => {
      cy.loginAsStandardUser();
      InventoryPage.assertOnInventoryPage();
    });

    it('[P0] can add a single item to cart and badge updates to 1', () => {
      InventoryPage.addItemToCartByName('Sauce Labs Backpack');
      InventoryPage.assertCartBadgeCount(1);
    });

    it('[P0] can add multiple items and badge count reflects total', () => {
      InventoryPage.addItemToCartByName('Sauce Labs Backpack');
      InventoryPage.addItemToCartByName('Sauce Labs Bike Light');
      InventoryPage.assertCartBadgeCount(2);
    });

    it('[P0] cart page displays the correct added items', () => {
      InventoryPage.addItemToCartByName('Sauce Labs Backpack');
      InventoryPage.addItemToCartByName('Sauce Labs Fleece Jacket');
      InventoryPage.clickShoppingCart();

      CartPage.assertOnCartPage();
      CartPage.assertCartHasItems(2);
      CartPage.assertItemInCart('Sauce Labs Backpack');
      CartPage.assertItemInCart('Sauce Labs Fleece Jacket');
    });

    it('[P1] Add to Cart button changes to Remove after adding', () => {
      InventoryPage.addItemToCartByName('Sauce Labs Backpack');
      InventoryPage.assertRemoveButtonVisible('Sauce Labs Backpack');
    });

    it('[P1] can remove an item from the inventory page', () => {
      InventoryPage.addItemToCartByName('Sauce Labs Backpack');
      InventoryPage.assertCartBadgeCount(1);

      InventoryPage.removeItemFromCartByName('Sauce Labs Backpack');
      InventoryPage.assertCartBadgeCount(0);
    });

    it('[P1] can remove an item from the cart page', () => {
      InventoryPage.addItemToCartByName('Sauce Labs Backpack');
      InventoryPage.clickShoppingCart();

      CartPage.assertOnCartPage();
      CartPage.assertCartHasItems(1);
      CartPage.removeItemByName('Sauce Labs Backpack');
      CartPage.assertCartIsEmpty();
    });

    it('[P1] can add all 6 products and badge shows 6', () => {
      InventoryPage.addFirstNItemsToCart(6);
      InventoryPage.assertCartBadgeCount(6);
    });

    it('[P2] cart is empty by default (no badge shown)', () => {
      InventoryPage.assertCartBadgeCount(0);
    });

    it('[P2] Continue Shopping returns user from cart to inventory', () => {
      InventoryPage.addItemToCartByName('Sauce Labs Backpack');
      InventoryPage.clickShoppingCart();
      CartPage.assertOnCartPage();
      CartPage.clickContinueShopping();
      InventoryPage.assertOnInventoryPage();
    });
  });

  context('problem_user — known issues', () => {
    beforeEach(() => {
      cy.loginAsProblemUser();
      InventoryPage.assertOnInventoryPage();
    });

    it('[P1] problem_user: Add to Cart button is present on inventory page', () => {
      cy.get('button[id^="add-to-cart"]').should('have.length.greaterThan', 0);
    });

    it('[P1] problem_user: cart icon is visible after adding an item', () => {
      cy.get('button[id^="add-to-cart"]').first().click();
      InventoryPage.shoppingCartIcon.should('be.visible');
    });
  });
});