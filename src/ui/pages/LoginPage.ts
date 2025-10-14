import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // “New User Signup!”
  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly signupButton: Locator;

  // “Login to your account”
  readonly loginEmail: Locator;
  readonly loginPassword: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);

    this.signupName = page.locator('[data-qa="signup-name"]');
    this.signupEmail = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');

    this.loginEmail = page.locator('[data-qa="login-email"]');
    this.loginPassword = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
  }

  async signUp(name: string, email: string): Promise<void> {
    await this.type(this.signupName, name, { clear: true });
    await this.type(this.signupEmail, email, { clear: true });
    await this.click(this.signupButton);
  }

  async logIn(email: string, password: string): Promise<void> {
    await this.type(this.loginEmail, email, { clear: true });
    await this.type(this.loginPassword, password, { clear: true });
    await this.click(this.loginButton);
  }
}
