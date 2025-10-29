import {test, expect} from '@playwright/test';

import {HomePage} from '../../../src/ui/pages/HomePage';
import { LoginPage } from '../../../src/ui/pages/LoginPage';
import { SignupPage } from '@pages/SignupPage';
import { automationExerciseTestData } from '@common/data/test-data/automation-exercise-test-data';

test.describe('Automation Exercise - Basic User Flow', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.automationexercise.com/');
  });

  //fill in New User Signup!
test(
    'Should fill in the data in the New User Signup!',

//Call the pages
    async ({page}) =>{
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const singUpPage = new SignupPage(page);
//Open the page
    await homePage.openSignupLogin();
//Fill up the New User Signup data 
    await loginPage.fillLogin(automationExerciseTestData.validUser);
//Fill out info
    await singUpPage.fillOutForm(automationExerciseTestData.validUser)
//The assertion
    await expect(page.getByRole('heading', { name: 'Account Created!' })).toBeVisible();
//Waiting to see the results
    await page.waitForTimeout(5000);    
      },
  );



})
