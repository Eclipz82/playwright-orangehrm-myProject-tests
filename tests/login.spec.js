const { test,expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test.describe('OrangeHRM login tests', () => {

  test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await expect(loginPage.dashboardHeader).toHaveText('Dashboard');
  });

  test('Login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'wrongpassword');
    await expect(loginPage.errorMessage).toHaveText('Invalid credentials');

    
  });


});
