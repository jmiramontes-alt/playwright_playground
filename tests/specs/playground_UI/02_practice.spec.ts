import {test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker';

import {HomePage} from '../../../src/ui/pages/HomePage';
import { LoginPage } from '../../../src/ui/pages/LoginPage';
import { SignupPage } from '@pages/SignupPage';


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
 //Generate random emails
    const email = faker.internet.email();
//Generate random user name
    const userName = faker.person.middleName();
//Generate random First Name and Last Name
    const fN = faker.person.firstName();
    const lN = faker.person.lastName();
//Generate a random password
    const passWord = faker.internet.password();

//Open the page
    await homePage.openSignupLogin();
//Fill up the New User Signup data 
    await loginPage.signupName.fill(userName);
    await loginPage.signupEmail.fill(email);
    await loginPage.signupButton.click();
    await singUpPage.title2.click();
    await singUpPage.password.fill(passWord);
    await singUpPage.selectDay('29');
    await singUpPage.selectMonth('12');
    await singUpPage.selectYear('1964');
    await page.waitForTimeout(5000);   
//Scroll down a little bit to observe the fill in of the data
    await page.evaluate(() => window.scrollBy(0, 450));
    await singUpPage.newsletter.check();
    await singUpPage.specialOffers.check();
    await singUpPage.firstName.fill(fN);
    await singUpPage.lastName.fill(lN);
    await singUpPage.company.fill('Eurozona.SA');
    await singUpPage.address.fill('La Pampa 1385');
    await singUpPage.address2.fill('Entre migueletes y miñones');
    await singUpPage.selectCountry('New Zealand')
    //await page.selectOption('#country','New Zealand');
    await singUpPage.state.fill('Arizona');
    await singUpPage.city.fill('Tucson');
    await singUpPage.zipCode.fill('85641');
    await singUpPage.mobileNumber.fill('+541160296372');
//Create the Account
    await singUpPage.createAccount.click();
//The assertion
    await expect(page.getByRole('heading', { name: 'Account Created!' })).toBeVisible();
//Waiting to see the results
    await page.waitForTimeout(5000);    
      },
  );



})
