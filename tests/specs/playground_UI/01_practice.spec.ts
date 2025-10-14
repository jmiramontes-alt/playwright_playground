import {test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker';

import {HomePage} from '../../../src/ui/pages/HomePage';
import { LoginPage } from '../../../src/ui/pages/LoginPage';


test.describe('Automation Exercise - Basic User Flow', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.automationexercise.com/');
  });

  test(
    'should navigate to signup/login page and verify elements are visible',
    async ({page}) => {
      const homePage = new HomePage(page);
      await homePage.openSignupLogin();
      const loginPage = new LoginPage(page);
      // Verify we're on the signup/login page
      await expect(loginPage.signupName).toBeVisible();
      await expect(loginPage.signupEmail).toBeVisible();
      await expect(loginPage.signupButton).toBeVisible();
      await expect(loginPage.loginEmail).toBeVisible();
      await expect(loginPage.loginPassword).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
    },
  );

  //fill in New User Signup!
  test(
    'Should fill in the data in the New User Signup!',
    async ({page}) =>{
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const email = faker.internet.email();
    const singUpName= page.locator('[data-qa="signup-name"]');
    const singUpMail = page.locator('[data-qa="signup-email"]');
    const singUp = page.locator('[data-qa="signup-button"]');
    const title2 = page.locator('[id="id_gender1"]');
    const password = page.locator('[data-qa="password"]');
    const newsletter = page.locator('[id="newsletter"]');
    const specialOffers = page.locator('[id="optin"]');
    const firstName = page.locator('[data-qa="first_name"]');
    const lastName = page.locator('[data-qa="last_name"]');
    const company = page.locator('[data-qa="company"]');
    const address = page.locator('[data-qa="address"]');
    const address2 = page.locator('[data-qa="address2"]');
    const state = page.locator('[data-qa="state"]');
    const city = page.locator('[data-qa="city"]');
    const zipCode = page.locator('[data-qa="zipcode"]');
    const mobileNumber = page.locator('[data-qa="mobile_number"]');
    const createAccount = page.locator('[data-qa="create-account"]');
    await homePage.openSignupLogin();
    await singUpName.fill('Kenny');
    await singUpMail.fill(email);
    await singUp.click();
    await title2.click();
    await password.fill('test123');
    await page.selectOption('#days','29');
    await page.selectOption('#months','8');
    await page.selectOption('#years','1989');
    await page.evaluate(() => window.scrollBy(0, 450));
    await newsletter.check();
    await specialOffers.check();
    await firstName.fill('Kenny');
    await lastName.fill('Ruiz');
    await company.fill('Eurozona.SA');
    await address.fill('La Pampa 1385');
    await address2.fill('Entre migueletes y miñones');
    await page.selectOption('#country','New Zealand');
    await state.fill('Arizona');
    await city.fill('Tucson');
    await zipCode.fill('85641');
    await mobileNumber.fill('+541160296372');
    await createAccount.click();
    await expect(page.getByRole('heading', { name: 'Account Created!' })).toBeVisible();
    //await expect(page.locator('[data-qa="account-created"]')).toHaveText('Account Created!');
    await page.waitForTimeout(5000);    
      },
  );



})
