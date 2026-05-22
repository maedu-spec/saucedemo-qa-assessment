import LoginPage from '../pages/loginpage';
import InventoryPage from '../pages/inventorypage';

describe('Login — Authentication Flows', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  context('Valid Credentials', () => {
    it('[P0] standard_user can log in successfully', () => {
      LoginPage.login(
        Cypress.env('STANDARD_USER'),
        Cypress.env('PASSWORD')
      );
      InventoryPage.assertOnInventoryPage();
    });

    it('[P1] problem_user can log in successfully', () => {
      LoginPage.login(
        Cypress.env('PROBLEM_USER'),
        Cypress.env('PASSWORD')
      );
      InventoryPage.assertOnInventoryPage();
    });

    it('[P1] after login, 6 products are displayed on the inventory page', () => {
      cy.loginAsStandardUser();
      InventoryPage.assertOnInventoryPage();
      InventoryPage.assertProductCountIs(6);
    });
  });

  context('Invalid Credentials', () => {
    it('[P0] shows error for completely wrong username and password', () => {
      LoginPage.login('invalid_user', 'wrong_password');
      LoginPage.assertErrorMessage(
        'Epic sadface: Username and password do not match any user in this service'
      );
    });

    it('[P1] shows error for wrong password with valid username', () => {
      LoginPage.login(Cypress.env('STANDARD_USER'), 'wrong_password');
      LoginPage.assertErrorMessage(
        'Epic sadface: Username and password do not match any user in this service'
      );
    });

    it('[P1] shows error for locked-out user', () => {
      LoginPage.login('locked_out_user', Cypress.env('PASSWORD'));
      LoginPage.assertErrorMessage(
        'Epic sadface: Sorry, this user has been locked out.'
      );
    });

    it('[P1] shows error when username is left empty', () => {
      LoginPage.typePassword(Cypress.env('PASSWORD'));
      LoginPage.clickLogin();
      LoginPage.assertErrorMessage('Epic sadface: Username is required');
    });

    it('[P1] shows error when password is left empty', () => {
      LoginPage.typeUsername(Cypress.env('STANDARD_USER'));
      LoginPage.clickLogin();
      LoginPage.assertErrorMessage('Epic sadface: Password is required');
    });

    it('[P2] shows error when both fields are empty', () => {
      LoginPage.clickLogin();
      LoginPage.assertErrorMessage('Epic sadface: Username is required');
    });

    it('[P2] error message can be dismissed with the X button', () => {
      LoginPage.login('bad_user', 'bad_pass');
      LoginPage.assertErrorMessage(
        'Epic sadface: Username and password do not match any user in this service'
      );
      LoginPage.dismissError();
    });
  });

  context('Logout', () => {
    it('[P1] logged-in user can log out and is returned to login page', () => {
      cy.loginAsStandardUser();
      InventoryPage.assertOnInventoryPage();
      InventoryPage.logout();
      LoginPage.assertOnLoginPage();
    });

    it('[P2] after logout, accessing /inventory.html redirects back to login', () => {
      cy.loginAsStandardUser();
      InventoryPage.logout();
      cy.visit('/inventory.html');
      LoginPage.assertOnLoginPage();
    });
  });
});