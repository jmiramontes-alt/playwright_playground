import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { IndexInfo } from 'typescript';
import { User } from '@common/types/automation-exercise.types';

export class SignupPage extends BasePage {
  // “Enter Account Information”
  readonly title2: Locator;
  readonly password: Locator;
  readonly newsletter: Locator;
  readonly specialOffers: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly company: Locator;
  readonly address: Locator;
  readonly address2: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipCode: Locator;
  readonly mobileNumber: Locator;
  readonly createAccount: Locator;
  readonly days: Locator;
  readonly dayOption: (index: number) => Locator;
  readonly month: Locator;
  readonly monthOption: (index: number) => Locator;
  readonly year: Locator;
  readonly yearOption: (value: string) => Locator;
  readonly country: Locator;
  readonly countryOption: (value: string) => Locator;

  constructor(page: Page) {
    super(page);
    this.title2= page.locator('[id="id_gender1"]');
    this.password= page.locator('[data-qa="password"]');
    this.newsletter= page.locator('[id="newsletter"]');
    this.specialOffers= page.locator('[id="optin"]');
    this.firstName= page.locator('[data-qa="first_name"]');
    this.lastName= page.locator('[data-qa="last_name"]');
    this.company= page.locator('[data-qa="company"]');
    this.address= page.locator('[data-qa="address"]');
    this.address2= page.locator('[data-qa="address2"]');
    this.state= page.locator('[data-qa="state"]');
    this.city= page.locator('[data-qa="city"]');
    this.zipCode= page.locator('[data-qa="zipcode"]');
    this.mobileNumber= page.locator('[data-qa="mobile_number"]');
    this.createAccount= page.locator('[data-qa="create-account"]');
    this.days= page.locator('[data-qa="days"]');
    this.month= page.locator('[data-qa="months"]');
    this.year= page.locator('[data-qa="years"]');
    this.country = page.locator('[data-qa="country"]')

  }

    async selectDay(dayNumber: string) {
    await this.days.selectOption(dayNumber);
    
  }

  async selectMonth(monthNumber: string){
    await this.month.selectOption(monthNumber);    
  }

    async selectYear(year: string) {
    await this.year.selectOption(year);
  }

  async selectCountry (country:string){
    await this.country.selectOption(country);
  }

  async  fillOutForm(user:User) {

    await this.zipCode.fill('85641');
    await this.title2.click();
    await this.password.fill(user.password);
    await this.selectDay('29');
    await this.selectMonth('12');
    await this.selectYear('1964');
//Scroll down a little bit to observe the fill in of the data
    await this.page.evaluate(() => window.scrollBy(0, 450));
    await this.newsletter.check();
    await this.specialOffers.check();
    await this.firstName.fill(user.firstname);
    await this.lastName.fill(user.lastname);
    await this.company.fill(user.company);
    await this.address.fill(user.address1);
    await this.address2.fill(user.address2);
    await this.selectCountry(user.country)
    await this.state.fill(user.state);
    await this.city.fill(user.city);
    await this.zipCode.fill(user.zipcode);
    await this.mobileNumber.fill(user.mobile_number);
//Create the Account
    await this.createAccount.click();
//The assertion
    await expect(this.page.getByRole('heading', { name: 'Account Created!' })).toBeVisible();
//Waiting to see the results
    await this.page.waitForTimeout(5000); 

}


}
