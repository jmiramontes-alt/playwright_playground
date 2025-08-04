import { faker } from '@faker-js/faker';

/**
 * Test data provider using Faker.js for generating realistic test data
 * This centralizes test data generation and makes tests more maintainable
 */
export class TestDataProvider {
  /**
   * Generate a unique email address for testing
   * @returns A unique email address
   */
  static generateEmail(): string {
    // Using timestamp ensures uniqueness across test runs
    const timestamp = Date.now();
    const username = faker.internet.username().toLowerCase();
    return `${username}.${timestamp}@example.com`;
  }

  /**
   * Generate a realistic user name
   * @returns A fake first and last name
   */
  static generateFullName(): string {
    return faker.person.fullName();
  }

  /**
   * Generate a realistic first name
   * @returns A fake first name
   */
  static generateFirstName(): string {
    return faker.person.firstName();
  }

  /**
   * Generate a realistic last name
   * @returns A fake last name
   */
  static generateLastName(): string {
    return faker.person.lastName();
  }

  /**
   * Generate a realistic password
   * @param length - Optional length (default: 12)
   * @returns A secure password
   */
  static generatePassword(length: number = 12): string {
    return faker.internet.password({ length, memorable: true });
  }

  /**
   * Generate a phone number
   * @returns A fake phone number
   */
  static generatePhoneNumber(): string {
    return faker.phone.number();
  }

  /**
   * Generate an address
   * @returns A fake address object
   */
  static generateAddress() {
    return {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
    };
  }

  /**
   * Generate a company name
   * @returns A fake company name
   */
  static generateCompanyName(): string {
    return faker.company.name();
  }

  /**
   * Generate a complete user profile for signup testing
   * @returns A complete user profile object
   */
  static generateUserProfile() {
    const address = this.generateAddress();
    
    return {
      firstName: this.generateFirstName(),
      lastName: this.generateLastName(),
      fullName: this.generateFullName(),
      email: this.generateEmail(),
      password: this.generatePassword(),
      phoneNumber: this.generatePhoneNumber(),
      company: this.generateCompanyName(),
      address: {
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country,
      },
    };
  }

  /**
   * Generate search terms for product testing
   * Using terms that are likely to exist on automation exercise website
   * @returns Array of realistic search terms
   */
  static generateProductSearchTerms(): string[] {
    return [
      'shirt',
      'dress',
      'jeans',
      'top',
      'tshirt',
      'women',
      'men',
      'blue',
      'cotton',
      'polo',
    ];
  }

  /**
   * Generate a random search term that's likely to have results
   * @returns A single search term from known working terms
   */
  static generateSearchTerm(): string {
    const terms = this.generateProductSearchTerms();
    return faker.helpers.arrayElement(terms);
  }
}
