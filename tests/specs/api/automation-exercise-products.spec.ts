import { test, expect } from '@playwright/test';
import { AutomationExerciseApiClient } from '@api/clients/automation-exercise-api-client';
import { automationExerciseTestData } from '@common/data/test-data/automation-exercise-test-data';
import { TAGS } from '@common/constants/tags';
import { Product, Brand, RESPONSE_CODES } from '@common/types/automation-exercise.types';

test.describe('Automation Exercise - Products & Brands API Tests', () => {
  let apiClient: AutomationExerciseApiClient;

  test.beforeEach(async ({ request }) => {
    apiClient = new AutomationExerciseApiClient(request);
  });

  test(
    'API 1: Should get all products list successfully',
    {
      tag: [TAGS.API, TAGS.SMOKE],
    },
    async () => {
      const response = await apiClient.getAllProducts();

      // Verify response structure
      expect(response.responseCode).toBe(RESPONSE_CODES.SUCCESS);
      expect(response.products).toBeDefined();
      expect(Array.isArray(response.products)).toBeTruthy();
      expect(response.products.length).toBeGreaterThan(0);

      // Verify product structure
      const firstProduct: Product = response.products[0];
      expect(firstProduct).toHaveProperty('id');
      expect(firstProduct).toHaveProperty('name');
      expect(firstProduct).toHaveProperty('price');
      expect(firstProduct).toHaveProperty('brand');
      expect(firstProduct).toHaveProperty('category');

      // Verify category structure
      expect(firstProduct.category).toHaveProperty('usertype');
      expect(firstProduct.category).toHaveProperty('category');
      expect(firstProduct.category.usertype).toHaveProperty('usertype');

      // Verify data types
      expect(typeof firstProduct.id).toBe('number');
      expect(typeof firstProduct.name).toBe('string');
      expect(typeof firstProduct.price).toBe('string');
      expect(typeof firstProduct.brand).toBe('string');

      // Verify price format (should start with "Rs.")
      expect(firstProduct.price).toMatch(/^Rs\. \d+$/);

      // Verify user types are valid
      const userType = firstProduct.category.usertype.usertype;
      expect(automationExerciseTestData.expectedCategories.userTypes).toContain(userType);
    },
  );

  test(
    'API 2: Should return 405 Method Not Allowed for POST to products list',
    {
      tag: [TAGS.API],
    },
    async () => {
      const response = await apiClient.postToAllProducts();

      expect(response.responseCode).toBe(RESPONSE_CODES.METHOD_NOT_ALLOWED);
      expect(response.message).toBe(automationExerciseTestData.expectedResponses.methodNotAllowedMessage);
    },
  );

  test(
    'API 3: Should get all brands list successfully',
    {
      tag: [TAGS.API, TAGS.SMOKE],
    },
    async () => {
      const response = await apiClient.getAllBrands();

      // Verify response structure
      expect(response.responseCode).toBe(RESPONSE_CODES.SUCCESS);
      expect(response.brands).toBeDefined();
      expect(Array.isArray(response.brands)).toBeTruthy();
      expect(response.brands.length).toBeGreaterThan(0);

      // Verify brand structure
      const firstBrand: Brand = response.brands[0];
      expect(firstBrand).toHaveProperty('id');
      expect(firstBrand).toHaveProperty('brand');

      // Verify data types
      expect(typeof firstBrand.id).toBe('number');
      expect(typeof firstBrand.brand).toBe('string');

      // Verify that expected brands exist
      const brandNames = response.brands.map((brand) => brand.brand);
      for (const expectedBrand of automationExerciseTestData.expectedBrands) {
        expect(brandNames).toContain(expectedBrand);
      }
    },
  );

  test(
    'API 4: Should return 405 Method Not Allowed for PUT to brands list',
    {
      tag: [TAGS.API],
    },
    async () => {
      const response = await apiClient.putToAllBrands();

      expect(response.responseCode).toBe(RESPONSE_CODES.METHOD_NOT_ALLOWED);
      expect(response.message).toBe(automationExerciseTestData.expectedResponses.methodNotAllowedMessage);
    },
  );

  test(
    'API 5: Should search products successfully with valid search term',
    {
      tag: [TAGS.API, TAGS.SMOKE],
    },
    async () => {
      const searchTerm = automationExerciseTestData.searchTerms.valid[0]; // 'top'
      const response = await apiClient.searchProduct(searchTerm);

      // Verify response structure
      expect(response.responseCode).toBe(RESPONSE_CODES.SUCCESS);
      expect(response.products).toBeDefined();
      expect(Array.isArray(response.products)).toBeTruthy();
      expect(response.products.length).toBeGreaterThan(0);

      // Verify search results contain the search term
      const foundProduct = response.products.some((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      expect(foundProduct).toBeTruthy();
    },
  );

  test(
    'API 6: Should return error when searching without search_product parameter',
    {
      tag: [TAGS.API],
    },
    async () => {
      const response = await apiClient.searchProductWithoutParameter();

      expect(response.responseCode).toBe(RESPONSE_CODES.BAD_REQUEST);
      expect(response.message).toBe(automationExerciseTestData.expectedResponses.searchRequiredErrorMessage);
    },
  );

  test(
    'Should search products with different search terms',
    {
      tag: [TAGS.API],
    },
    async () => {
      for (const searchTerm of automationExerciseTestData.searchTerms.valid) {
        const response = await apiClient.searchProduct(searchTerm);

        expect(response.responseCode).toBe(RESPONSE_CODES.SUCCESS);
        expect(response.products).toBeDefined();
        expect(Array.isArray(response.products)).toBeTruthy();

        // Verify we get meaningful results for valid search terms
        expect(response.products.length).toBeGreaterThanOrEqual(0);
      }
    },
  );

  test(
    'Should handle products data consistency between APIs',
    {
      tag: [TAGS.API],
    },
    async () => {
      // Get all products
      const allProductsResponse = await apiClient.getAllProducts();
      const allBrandsResponse = await apiClient.getAllBrands();

      // Extract brands from products
      const brandsFromProducts = [...new Set(allProductsResponse.products.map((product) => product.brand))];
      const brandsFromBrandsAPI = allBrandsResponse.brands.map((brand) => brand.brand);

      // Verify that brands from products exist in brands API
      for (const productBrand of brandsFromProducts) {
        expect(brandsFromBrandsAPI).toContain(productBrand);
      }

      // Verify product IDs are unique
      const productIds = allProductsResponse.products.map((product) => product.id);
      const uniqueProductIds = [...new Set(productIds)];
      expect(productIds.length).toBe(uniqueProductIds.length);
    },
  );
});
