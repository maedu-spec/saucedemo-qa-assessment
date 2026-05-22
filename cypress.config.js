const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    video: false,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    retries: {
      runMode: 1,
      openMode: 0,
    },
    env: {
      STANDARD_USER: 'standard_user',
      PROBLEM_USER: 'problem_user',
      PASSWORD: 'secret_sauce',
      LOCKED_USER: 'locked_out_user',
    },
  },
});