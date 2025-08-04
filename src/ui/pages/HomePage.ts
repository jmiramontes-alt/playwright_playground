// src/pages/homePage.ts
import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly navHome: Locator;
  readonly navProducts: Locator;
  readonly navSignupLogin: Locator;
  readonly categorySidebar: Locator;
  readonly featuredProducts: Locator;
  readonly firstFeaturedAddToCart: Locator;

  constructor(page: Page) {
    super(page);

    this.navHome = page.locator('a[href="/"]');
    this.navProducts = page.locator('a[href="/products"]');
    this.navSignupLogin = page.locator('a[href="/login"]');

    // side “Category” block (left sidebar)
    this.categorySidebar = page.locator('.left-sidebar h2:has-text("Category")');

    // grid of “FEATURES ITEMS” cards
    this.featuredProducts = page.locator('.features_items .product-image-wrapper');

    // convenience: first card’s “Add to cart” button
    this.firstFeaturedAddToCart = this.featuredProducts
      .first()
      .locator('a:has-text("Add to cart")');
  }

  async goToProducts(): Promise<void> {
    await this.click(this.navProducts);
  }

  async openSignupLogin(): Promise<void> {
    await this.click(this.navSignupLogin);
  }

  async addFirstFeaturedToCart(): Promise<void> {
    await this.hover(this.featuredProducts.first()); // reveal overlay
    await this.click(this.firstFeaturedAddToCart);
  }

  async openProductDetailsByName(name: string): Promise<void> {
    const card = this.featuredProducts.filter({ hasText: name }).first();
    await this.click(card.locator('a:has-text("View Product")'));
  }
}
