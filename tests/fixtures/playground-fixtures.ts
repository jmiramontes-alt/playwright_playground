import { test as base } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { ProductsPage } from '@pages/ProductsPage';
import { SignupLoginPage } from '@pages/SignupLoginPage';

interface TestFixtures {
  homePage: HomePage;
  productsPage: ProductsPage;
  signupLoginPage: SignupLoginPage;
}

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  signupLoginPage: async ({ page }, use) => {
    await use(new SignupLoginPage(page));
  },
});

export { expect, Locator } from '@playwright/test';
