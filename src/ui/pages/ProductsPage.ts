// src/pages/productsPage.ts
import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productCards: Locator;
  readonly addToCartButtons: Locator;
  readonly viewProductLinks: Locator;

  constructor(page: Page) {
    super(page);

    // search bar on /products (has handy IDs on the site)
    this.searchInput = page.locator('#search_product'); // <input id="search_product">
    this.searchButton = page.locator('#submit_search'); // <button id="submit_search">

    // product catalogue grid
    this.productCards = page.locator('.product-image-wrapper');
    this.addToCartButtons = this.productCards.locator('a:has-text("Add to cart")');
    this.viewProductLinks = this.productCards.locator('a:has-text("View Product")');
  }

  async search(term: string): Promise<void> {
    await this.type(this.searchInput, term, { clear: true });
    await this.click(this.searchButton);
    await this.waitForElement(this.productCards.first(), { state: 'visible' });
  }

  async openProductDetails(index = 0): Promise<void> {
    await this.click(this.viewProductLinks.nth(index));
  }

  async addProductToCartByName(name: string): Promise<void> {
    const card = this.productCards.filter({ hasText: name }).first();
    await this.hover(card);
    await this.click(card.locator('a:has-text("Add to cart")'));
  }
}
