import { User } from '@common/types/automation-exercise.types';
import { faker } from '@faker-js/faker';



/**
 * Test data for Automation Exercise API tests
 */

export const automationExerciseTestData = {
  // Valid user data for testing
  validUser: {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    title: 'Mr',
    birth_date: '15',
    birth_month: '5',
    birth_year: '1990',
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    company: 'Eurozona.SA',
    address1: 'La Pampa 1385',
    address2: 'Apt 456',
    country: 'New Zealand',
    zipcode: '85641',
    state: 'Arizona',
    city: 'Tucson',
    mobile_number: faker.phone.number({ style: 'international' }),
  } as User,

  // Invalid user data for negative testing
  invalidUser: {
    email: 'invalid@example.com',
    password: 'wrongpassword',
  },

  // Search terms for product search testing
  searchTerms: {
    valid: ['top', 'dress', 'jeans', 'shirt'],
    partialMatch: ['blu', 'cott', 'polo'],
    noResults: ['xyz123', 'nonexistent', 'invalidproduct'],
  },

  // Expected response data
  expectedResponses: {
    successCode: 200,
    badRequestCode: 400,
    notFoundCode: 404,
    methodNotAllowedCode: 405,
    requiredErrorMessage: 'Bad request, email or password parameter is missing in POST request.',
    searchRequiredErrorMessage: 'Bad request, search_product parameter is missing in POST request.',
    methodNotAllowedMessage: 'This request method is not supported.',
  },

  // Brand names that should exist in the system
  expectedBrands: [
    'Polo',
    'H&M',
    'Madame',
    'Mast & Harbour',
    'Babyhug',
    'Allen Solly Junior',
    'Kookie Kids',
    'Biba',
  ],

  // Product categories that should exist
  expectedCategories: {
    userTypes: ['Women', 'Men', 'Kids'],
    categories: ['Tops', 'Tshirts', 'Dress', 'Jeans', 'Saree', 'Tops & Shirts'],
  },

  // Generate unique email for user creation tests
  generateUniqueEmail: (): string => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `testuser${timestamp}${random}@example.com`;
  },

  // Generate test user with unique email
  generateTestUser: (): User => ({
    name: 'Test User',
    email: automationExerciseTestData.generateUniqueEmail(),
    password: 'password123',
    title: 'Mr',
    birth_date: '15',
    birth_month: '5',
    birth_year: '1990',
    firstname: 'Test',
    lastname: 'User',
    company: 'Test Company',
    address1: '123 Test Street',
    address2: 'Apt 456',
    country: 'United States',
    zipcode: '12345',
    state: 'California',
    city: 'Los Angeles',
    mobile_number: '1234567890',
  }),
};
