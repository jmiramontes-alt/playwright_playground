import { APIRequestContext } from '@playwright/test';
import {
  ProductsResponse,
  BrandsResponse,
  SearchProductResponse,
  CreateUserResponse,
  LoginResponse,
  UserDetailsResponse,
  ErrorResponse,
  User,
  API_ENDPOINTS,
} from '@api/types/automation-exercise.types';

/**
 * API Client for Automation Exercise website
 * Handles all HTTP requests to the automation exercise APIs
 */
export class AutomationExerciseApiClient {
  private readonly baseURL = 'https://automationexercise.com';

  constructor(private request: APIRequestContext) {}

  /**
   * API 1: GET All Products List
   * @returns Promise<ProductsResponse>
   */
  async getAllProducts(): Promise<ProductsResponse> {
    const response = await this.request.get(`${this.baseURL}${API_ENDPOINTS.PRODUCTS_LIST}`);
    return await response.json();
  }

  /**
   * API 2: POST To All Products List (should return 405 Method Not Allowed)
   * @returns Promise<ErrorResponse>
   */
  async postToAllProducts(): Promise<ErrorResponse> {
    const response = await this.request.post(`${this.baseURL}${API_ENDPOINTS.PRODUCTS_LIST}`);
    return await response.json();
  }

  /**
   * API 3: GET All Brands List
   * @returns Promise<BrandsResponse>
   */
  async getAllBrands(): Promise<BrandsResponse> {
    const response = await this.request.get(`${this.baseURL}${API_ENDPOINTS.BRANDS_LIST}`);
    return await response.json();
  }

  /**
   * API 4: PUT To All Brands List (should return 405 Method Not Allowed)
   * @returns Promise<ErrorResponse>
   */
  async putToAllBrands(): Promise<ErrorResponse> {
    const response = await this.request.put(`${this.baseURL}${API_ENDPOINTS.BRANDS_LIST}`);
    return await response.json();
  }

  /**
   * API 5: POST To Search Product
   * @param searchTerm - The product name to search for
   * @returns Promise<SearchProductResponse>
   */
  async searchProduct(searchTerm: string): Promise<SearchProductResponse> {
    const response = await this.request.post(`${this.baseURL}${API_ENDPOINTS.SEARCH_PRODUCT}`, {
      form: { search_product: searchTerm },
    });
    return await response.json();
  }

  /**
   * API 6: POST To Search Product without search_product parameter
   * @returns Promise<ErrorResponse>
   */
  async searchProductWithoutParameter(): Promise<ErrorResponse> {
    const response = await this.request.post(`${this.baseURL}${API_ENDPOINTS.SEARCH_PRODUCT}`, {
      form: {},
    });
    return await response.json();
  }

  /**
   * API 7: POST To Verify Login with valid details
   * @param email - User email
   * @param password - User password
   * @returns Promise<LoginResponse>
   */
  async verifyLogin(email: string, password: string): Promise<LoginResponse> {
    const response = await this.request.post(`${this.baseURL}${API_ENDPOINTS.VERIFY_LOGIN}`, {
      form: { email, password },
    });
    return await response.json();
  }

  /**
   * API 8: POST To Verify Login without email parameter
   * @param password - User password
   * @returns Promise<ErrorResponse>
   */
  async verifyLoginWithoutEmail(password: string): Promise<ErrorResponse> {
    const response = await this.request.post(`${this.baseURL}${API_ENDPOINTS.VERIFY_LOGIN}`, {
      form: { password },
    });
    return await response.json();
  }

  /**
   * API 9: DELETE To Verify Login (should return 405 Method Not Allowed)
   * @returns Promise<ErrorResponse>
   */
  async deleteVerifyLogin(): Promise<ErrorResponse> {
    const response = await this.request.delete(`${this.baseURL}${API_ENDPOINTS.VERIFY_LOGIN}`);
    return await response.json();
  }

  /**
   * API 10: POST To Verify Login with invalid details
   * @param email - Invalid email
   * @param password - Invalid password
   * @returns Promise<ErrorResponse>
   */
  async verifyLoginWithInvalidDetails(email: string, password: string): Promise<ErrorResponse> {
    const response = await this.request.post(`${this.baseURL}${API_ENDPOINTS.VERIFY_LOGIN}`, {
      form: { email, password },
    });
    return await response.json();
  }

  /**
   * API 11: POST To Create/Register User Account
   * @param user - User data
   * @returns Promise<CreateUserResponse>
   */
  async createUserAccount(user: User): Promise<CreateUserResponse> {
    const response = await this.request.post(`${this.baseURL}${API_ENDPOINTS.CREATE_ACCOUNT}`, {
      form: { ...user },
    });
    return await response.json();
  }

  /**
   * API 12: DELETE METHOD To Delete User Account
   * @param email - User email
   * @param password - User password
   * @returns Promise<CreateUserResponse>
   */
  async deleteUserAccount(email: string, password: string): Promise<CreateUserResponse> {
    const response = await this.request.delete(`${this.baseURL}${API_ENDPOINTS.DELETE_ACCOUNT}`, {
      form: { email, password },
    });
    return await response.json();
  }

  /**
   * API 13: PUT METHOD To Update User Account
   * @param user - Updated user data
   * @returns Promise<CreateUserResponse>
   */
  async updateUserAccount(user: User): Promise<CreateUserResponse> {
    const response = await this.request.put(`${this.baseURL}${API_ENDPOINTS.UPDATE_ACCOUNT}`, {
      form: { ...user },
    });
    return await response.json();
  }

  /**
   * API 14: GET user account detail by email
   * @param email - User email
   * @returns Promise<UserDetailsResponse>
   */
  async getUserDetailByEmail(email: string): Promise<UserDetailsResponse> {
    const response = await this.request.get(`${this.baseURL}${API_ENDPOINTS.GET_USER_BY_EMAIL}`, {
      params: { email },
    });
    return await response.json();
  }
}
