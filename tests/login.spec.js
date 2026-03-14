const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test.describe('OrangeHRM login tests', () => {

  test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await loginPage.assertDashboardVisible();
  });

  test('Login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'wrongpassword');
    await loginPage.assertErrorVisible('Invalid credentials');
  });


});
