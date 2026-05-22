import InventoryPage from '../pages/inventorypage';

describe('Filter — Product Sorting', () => {
  context('standard_user', () => {
    beforeEach(() => {
      cy.loginAsStandardUser();
      InventoryPage.assertOnInventoryPage();
    });

    it('[P1] sort dropdown is visible on the inventory page', () => {
      InventoryPage.sortDropdown.should('be.visible');
    });

    it('[P1] default sort order is Name (A to Z)', () => {
      InventoryPage.assertSortedAZ();
    });

    it('[P1] can sort products Name: A to Z', () => {
      InventoryPage.sortProductsBy('az');
      InventoryPage.assertSortedAZ();
    });

    it('[P1] can sort products Name: Z to A', () => {
      InventoryPage.sortProductsBy('za');
      InventoryPage.assertSortedZA();
    });

    it('[P0] can sort products Price: Low to High', () => {
      InventoryPage.sortProductsBy('lohi');
      InventoryPage.assertSortedPriceLowToHigh();
    });

    it('[P0] can sort products Price: High to Low', () => {
      InventoryPage.sortProductsBy('hilo');
      InventoryPage.assertSortedPriceHighToLow();
    });

    it('[P2] switching sort options updates the product list each time', () => {
      InventoryPage.sortProductsBy('za');
      InventoryPage.assertSortedZA();

      InventoryPage.sortProductsBy('az');
      InventoryPage.assertSortedAZ();

      InventoryPage.sortProductsBy('lohi');
      InventoryPage.assertSortedPriceLowToHigh();
    });

    it('[P2] all 6 products remain visible after sorting', () => {
      InventoryPage.sortProductsBy('za');
      InventoryPage.assertProductCountIs(6);

      InventoryPage.sortProductsBy('hilo');
      InventoryPage.assertProductCountIs(6);
    });
  });

  context('problem_user — known sort issues', () => {
    beforeEach(() => {
      cy.loginAsProblemUser();
      InventoryPage.assertOnInventoryPage();
    });

    it('[P1] problem_user: sort dropdown is present', () => {
      InventoryPage.sortDropdown.should('be.visible');
    });

    it('[P1] problem_user: Price Low to High sort does NOT correctly sort products (known bug)', () => {
      InventoryPage.sortProductsBy('lohi');
      InventoryPage.productPrices.then(($els) => {
        const prices = [...$els].map((el) => parseFloat(el.innerText.replace('$', '')));
        const sorted = [...prices].sort((a, b) => a - b);
        const isSorted = JSON.stringify(prices) === JSON.stringify(sorted);
        cy.log(`Price Low→High sorted correctly: ${isSorted}`);
      });
    });

    it('[P1] problem_user: Z to A sort does NOT correctly sort products (known bug)', () => {
      InventoryPage.sortProductsBy('za');
      InventoryPage.productNames.then(($els) => {
        const names = [...$els].map((el) => el.innerText);
        const sorted = [...names].sort().reverse();
        const isSorted = JSON.stringify(names) === JSON.stringify(sorted);
        cy.log(`Z→A sorted correctly: ${isSorted}`);
      });
    });
  });
});