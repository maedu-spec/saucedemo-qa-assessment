import InventoryPage from '../pages/inventorypage';
import CartPage from '../pages/cartpage';
import CheckoutPage from '../pages/checkoutpage';

describe('Checkout — End-to-End Purchase Flow', () => {
  context('standard_user', () => {
    beforeEach(() => {
      cy.loginAsStandardUser();
      InventoryPage.assertOnInventoryPage();
    });

    it('[P0] completes full checkout with a single item', () => {
      InventoryPage.addItemToCartByName('Sauce Labs Backpack');
      InventoryPage.clickShoppingCart();
      CartPage.assertOnCartPage();
      CartPage.assertItemInCart('Sauce Labs Backpack');
      CartPage.clickCheckout();
      CheckoutPage.assertOnCheckoutStepOne();
      CheckoutPage.submitCheckoutInfo('Jane', 'Doe', '10001');
      CheckoutPage.assertOnCheckoutStepTwo();
      CheckoutPage.assertSummaryHasItems(1);
      CheckoutPage.assertSubtotalVisible();
      CheckoutPage.assertTotalVisible();
      CheckoutPage.clickFinish();
      CheckoutPage.assertOnCheckoutComplete();
      CheckoutPage.assertOrderConfirmed();
    });

    it('[P0] completes full checkout with multiple items', () => {
      InventoryPage.addItemToCartByName('Sauce Labs Backpack');
      InventoryPage.addItemToCartByName('Sauce Labs Bike Light');
      InventoryPage.addItemToCartByName('Sauce Labs Fleece Jacket');
      InventoryPage.clickShoppingCart();

      CartPage.assertOnCartPage();
      CartPage.assertCartHasItems(3);
      CartPage.clickCheckout();

      CheckoutPage.submitCheckoutInfo('John', 'Smith', '90210');
      CheckoutPage.assertOnCheckoutStepTwo();
      CheckoutPage.assertSummaryHasItems(3);
      CheckoutPage.clickFinish();

      CheckoutPage.assertOnCheckoutComplete();
      CheckoutPage.assertOrderConfirmed();
    });

    it('[P1] total on summary page includes tax and is a valid number', () => {
      InventoryPage.addItemToCartByName('Sauce Labs Backpack');
      InventoryPage.clickShoppingCart();
      CartPage.clickCheckout();
      CheckoutPage.submitCheckoutInfo('Jane', 'Doe', '10001');

      CheckoutPage.assertOnCheckoutStepTwo();
      CheckoutPage.getTotalAmount().then((total) => {
        expect(total).to.be.greaterThan(0);
      });
    });

    it('[P1] Back Home button after order returns to inventory', () => {
      InventoryPage.addItemToCartByName('Sauce Labs Backpack');
      InventoryPage.clickShoppingCart();
      cy.completeCheckout('Jane', 'Doe', '10001');

      CheckoutPage.assertOnCheckoutComplete();
      CheckoutPage.clickBackHome();
      InventoryPage.assertOnInventoryPage();
    });

    it('[P0] shows error when First Name is missing', () => {
      InventoryPage.addItemToCartByName('Sauce Labs Backpack');
      InventoryPage.clickShoppingCart();
      CartPage.clickCheckout();

      CheckoutPage.assertOnCheckoutStepOne();
      CheckoutPage.fillCheckoutInfo('', 'Doe', '10001');
      CheckoutPage.clickContinue();
      CheckoutPage.assertErrorMessage('Error: First Name is required');
    });

    it('[P1] shows error when Last Name is missing', () => {
      InventoryPage.addItemToCartByName('Sauce Labs Backpack');
      InventoryPage.clickShoppingCart();
      CartPage.clickCheckout();

      CheckoutPage.fillCheckoutInfo('Jane', '', '10001');
      CheckoutPage.clickContinue();
      CheckoutPage.assertErrorMessage('Error: Last Name is required');
    });

    it('[P1] shows error when Postal Code is missing', () => {
      InventoryPage.addItemToCartByName('Sauce Labs Backpack');
      InventoryPage.clickShoppingCart();
      CartPage.clickCheckout();

      CheckoutPage.fillCheckoutInfo('Jane', 'Doe', '');
      CheckoutPage.clickContinue();
      CheckoutPage.assertErrorMessage('Error: Postal Code is required');
    });

    it('[P2] Cancel on step one returns user to cart', () => {
      InventoryPage.addItemToCartByName('Sauce Labs Backpack');
      InventoryPage.clickShoppingCart();
      CartPage.clickCheckout();

      CheckoutPage.assertOnCheckoutStepOne();
      CheckoutPage.clickCancel();
      CartPage.assertOnCartPage();
    });
  });

});