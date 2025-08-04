import { UIBase } from '@ui/base/UIBase';
import { Page } from 'playwright';

export class BasePage extends UIBase {
  protected url?: string;

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    if (!this.url) {
      throw new Error('No URL defined for this PageObject');
    }
    await this.page.goto(this.url);
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
