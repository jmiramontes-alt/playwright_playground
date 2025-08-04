import { test, expect } from '@tests/fixtures/playground-fixtures';
import { TAGS } from '@common/constants/tags';
import { TestDataProvider } from '@common/data/providers/test-data-provider';

test.describe('Simple Signup Flow - Automation Exercise', () => {
  
  test.beforeEach(async ({ page }) => {    
    await page.goto('https://www.automationexercise.com/');
  });

  test(
    'should successfully navigate to signup page and verify form elements',
    {
      tag: [TAGS.SMOKE, TAGS.UI],
    },
    async ({ homePage, signupLoginPage }) => {
      // Navigate to signup/login page from home
      await homePage.openSignupLogin();
      
      // Verify we're on the signup/login page by checking all form elements are visible
      await expect(signupLoginPage.signupName).toBeVisible();
      await expect(signupLoginPage.signupEmail).toBeVisible();
      await expect(signupLoginPage.signupButton).toBeVisible();
      
      // Also verify login form elements
      await expect(signupLoginPage.loginEmail).toBeVisible();
      await expect(signupLoginPage.loginPassword).toBeVisible();
      await expect(signupLoginPage.loginButton).toBeVisible();
    },
  );

  test(
    'should be able to fill out signup form fields',
    {
      tag: [TAGS.UI],
    },
    async ({ homePage, signupLoginPage }) => {
      // Navigate to signup/login page
      await homePage.openSignupLogin();
      
      // Generate realistic test data using Faker
      const testUser = TestDataProvider.generateUserProfile();
      
      // Fill out the signup form fields (but don't submit)
      await signupLoginPage.signupName.fill(testUser.fullName);
      await signupLoginPage.signupEmail.fill(testUser.email);
      
      // Verify the fields have the correct values
      await expect(signupLoginPage.signupName).toHaveValue(testUser.fullName);
      await expect(signupLoginPage.signupEmail).toHaveValue(testUser.email);
      
      // Verify the signup button is enabled and clickable
      await expect(signupLoginPage.signupButton).toBeEnabled();
    },
  );

  test(
    'should be able to fill out login form fields',
    {
      tag: [TAGS.UI],
    },
    async ({ homePage, signupLoginPage }) => {
      // Navigate to signup/login page
      await homePage.openSignupLogin();
      
      // Generate realistic test credentials
      const testUser = TestDataProvider.generateUserProfile();
      
      // Fill out the login form fields (but don't submit)
      await signupLoginPage.loginEmail.fill(testUser.email);
      await signupLoginPage.loginPassword.fill(testUser.password);
      
      // Verify the fields have the correct values
      await expect(signupLoginPage.loginEmail).toHaveValue(testUser.email);
      await expect(signupLoginPage.loginPassword).toHaveValue(testUser.password);
      
      // Verify the login button is enabled and clickable
      await expect(signupLoginPage.loginButton).toBeEnabled();
    },
  );

  test(
    'should demonstrate navigation flow from home to products to signup',
    {
      tag: [TAGS.UI],
    },
    async ({ page, homePage, productsPage, signupLoginPage }) => {
      // Start from home page and navigate to products
      await homePage.goToProducts();
      await expect(productsPage.searchInput).toBeVisible();
      
      // Search for a product to demonstrate products page functionality
      const searchTerm = TestDataProvider.generateSearchTerm();
      await productsPage.search(searchTerm);
      
      // Navigate back to signup/login from products page using the nav bar
      await page.locator('a').filter({ hasText: 'Signup / Login' }).click();
      
      // Verify we're on signup/login page
      await expect(signupLoginPage.signupName).toBeVisible();
      await expect(signupLoginPage.loginEmail).toBeVisible();
    },
  );
});
