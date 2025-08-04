import { test, expect } from '@tests/fixtures/playground-fixtures';
import { SMOKE, UI } from '@tags';
import { TestDataProvider } from '@common/data/providers/test-data-provider';

test.describe('Automation Exercise - Basic User Flow', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.automationexercise.com/');
  });

  test(
    'should navigate to signup/login page and verify elements are visible',
    {
      tag: [SMOKE, UI],
    },
    async ({ homePage, signupLoginPage }) => {
      // Navigate to signup/login page from home
      await homePage.openSignupLogin();
      
      // Verify we're on the signup/login page
      await expect(signupLoginPage.signupName).toBeVisible();
      await expect(signupLoginPage.signupEmail).toBeVisible();
      await expect(signupLoginPage.signupButton).toBeVisible();
      
      await expect(signupLoginPage.loginEmail).toBeVisible();
      await expect(signupLoginPage.loginPassword).toBeVisible();
      await expect(signupLoginPage.loginButton).toBeVisible();
    },
  );

  test(
    'should start signup process with new user',
    {
      tag: [SMOKE, UI],
    },
    async ({ page, homePage, signupLoginPage }) => {    
      await homePage.openSignupLogin();
          
      // Generate realistic test data using Faker
      const testUser = TestDataProvider.generateUserProfile();
            
      await signupLoginPage.signUp(testUser.fullName, testUser.email);
  
      await expect(page).toHaveURL(/.*signup/);
      
      // Wait for page to be ready and verify we're on the next step
      await page.waitForLoadState('domcontentloaded');
    },
  );

  test(
    'should navigate through home -> products -> signup flow',
    {
      tag: [UI],
    },
    async ({ page, homePage, productsPage, signupLoginPage }) => {
      // Start from home page and navigate to products
      await homePage.goToProducts();
      await expect(productsPage.searchInput).toBeVisible();
      
      // Search for a product using dynamic search term
      const searchTerm = TestDataProvider.generateSearchTerm();
      await productsPage.search(searchTerm);
      
      // Navigate back to signup/login from products page using the nav bar
      await page.locator('a').filter({ hasText: 'Signup / Login' }).click();
      
      // Verify we're on signup/login page
      await expect(signupLoginPage.signupName).toBeVisible();
    },
  );
});
