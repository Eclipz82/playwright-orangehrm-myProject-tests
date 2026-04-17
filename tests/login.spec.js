const { test,expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test.describe('OrangeHRM login tests', () => {

  test('Login page UI elements visible', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
});

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

    test('Login with empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');
    await expect(loginPage.requiredFieldErrors).toHaveCount(2);

    
  });
test('Forgot password link works', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.forgotPasswordLink.click();

  await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode");
});

});
