const { expect } = require('@playwright/test');

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.dashboardHeader = page.locator('h6'); // заголовок Dashboard
    this.errorMessage = page.locator('.oxd-alert-content-text'); // сообщение об ошибке
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertDashboardVisible() {
    await expect(this.dashboardHeader).toHaveText('Dashboard');
  }

  async assertErrorVisible(message) {
    await expect(this.errorMessage).toHaveText(message);
  }
}

module.exports = { LoginPage };
