//import {expect ,page } from '@tests/fixtures/playground-fixtures';
//import { TestDataProvider } from '@common/data/providers/test-data-provider';
//import { SMOKE, UI } from '@tags';
import {test, expect} from '@playwright/test';
import fs from 'fs';

import {HomePage} from '../../../src/ui/pages/HomePage';
import { SignupLoginPage } from '../../../src/ui/pages/SignupLoginPage';

test.describe('Automation Exercise - Basic User Flow', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.automationexercise.com/');
  });

  test(
    'should navigate to signup/login page and verify elements are visible',
    async ({page}) => {
      const homePage = new HomePage(page);
      await homePage.openSignupLogin();
      const signupLoginPage = new SignupLoginPage(page);
      // Verify we're on the signup/login page
      await expect(signupLoginPage.signupName).toBeVisible();
      await expect(signupLoginPage.signupEmail).toBeVisible();
      await expect(signupLoginPage.signupButton).toBeVisible();
      await expect(signupLoginPage.loginEmail).toBeVisible();
      await expect(signupLoginPage.loginPassword).toBeVisible();
      await expect(signupLoginPage.loginButton).toBeVisible();
      //await page.context().storageState({ path: 'authState.json' });
      //fs.writeFileSync('lastUrl.json', JSON.stringify({ url: page.url() }));
    },
  );

  //fill in New User Signup!
//  test.use({storageState: 'authState.json'});

  test(
    'Should fill in the data in the New User Signup!',
    async ({page}) =>{
    //const {url}= JSON.parse(fs.readFileSync('lastUrl.json', 'utf-8'));
    const signupLoginPage = new SignupLoginPage(page);
    const homePage = new HomePage(page);
    await homePage.openSignupLogin();
    //await page.goto(url);
    await signupLoginPage.signUp('KennyZ','kenny@test.com' );
    await page.waitForTimeout(5000);
    },
  );


});
