/**
 * Automation Exercise API Types
 * 
 * These types are based on the actual API responses from 
 * https://automationexercise.com/api_list
 */

// Base response interface
export interface ApiResponse<T> {
  responseCode: number;
  data?: T;
  message?: string;
}

// Product related types
export interface ProductCategory {
  usertype: {
    usertype: string; // "Women", "Men", "Kids"
  };
  category: string; // "Tops", "Tshirts", "Dress", "Jeans", "Saree", etc.
}

export interface Product {
  id: number;
  name: string;
  price: string; // Format: "Rs. 500"
  brand: string;
  category: ProductCategory;
}

export interface ProductsResponse {
  responseCode: number;
  products: Product[];
}

// Brand related types
export interface Brand {
  id: number;
  brand: string;
}

export interface BrandsResponse {
  responseCode: number;
  brands: Brand[];
}

// User related types
export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  title?: string; // "Mr", "Mrs"
  birth_date?: string;
  birth_month?: string;
  birth_year?: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  address1?: string;
  address2?: string;
  country?: string;
  zipcode?: string;
  state?: string;
  city?: string;
  mobile_number?: string;
}

export interface CreateUserResponse {
  responseCode: number;
  message: string;
}

export interface LoginResponse {
  responseCode: number;
  message: string;
}

export interface UserDetailsResponse {
  responseCode: number;
  user: User;
}

// Search related types
export interface SearchProductRequest {
  search_product: string;
}

export interface SearchProductResponse {
  responseCode: number;
  products: Product[];
}

// Error response types
export interface ErrorResponse {
  responseCode: number;
  message: string;
}

// API endpoints enumeration
export const API_ENDPOINTS = {
  PRODUCTS_LIST: '/api/productsList',
  BRANDS_LIST: '/api/brandsList',
  SEARCH_PRODUCT: '/api/searchProduct',
  VERIFY_LOGIN: '/api/verifyLogin',
  CREATE_ACCOUNT: '/api/createAccount',
  DELETE_ACCOUNT: '/api/deleteAccount',
  UPDATE_ACCOUNT: '/api/updateAccount',
  GET_USER_BY_EMAIL: '/api/getUserDetailByEmail',
} as const;

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Response codes
export const RESPONSE_CODES = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
} as const;
