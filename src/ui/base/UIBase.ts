/* eslint-disable playwright/no-wait-for-timeout */
import { Page, Locator, Request, FrameLocator, Download } from '@playwright/test';
import {
  ClickOptions,
  TypeOptions,
  DragAndDropOptions,
  WaitForElementOptions,
  GetTextOptions,
  CountElementsOptions,
  HoverOptions,
  ClipboardOptions,
  AlertOptions,
  FileUploadOptions,
  FileDownloadOptions,
  IFrameOptions,
  WaitForRequestOptions,
  WaitForConditionOptions,
  StateCheckOptions,
  DoubleClickOptions,
} from './action-options.types';

/**
 * Abstract UIBase for Playwright projects.
 * Encapsulates common page interactions for UI automation.
 * All PageObjects should extend from this class.
 */
export abstract class UIBase {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ---------- BASIC ACTIONS ----------

  async click(locator: Locator, options?: ClickOptions): Promise<void> {
    const { timeout, force, retries, waitFor } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;

    for (let i = 0; i < attempts; i++) {
      try {
        await locator.click({ timeout, force });
        if (waitFor) {
          await waitFor.waitFor({ state: 'visible', timeout });
        }
        return;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  async type(locator: Locator, text: string, options?: TypeOptions): Promise<void> {
    const { timeout, clear, delay, retries, waitFor, pressEnter } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;

    for (let i = 0; i < attempts; i++) {
      try {
        if (clear) {
          await locator.fill('', { timeout });
        }
        await locator.type(text, { delay, timeout });
        if (pressEnter) {
          await locator.press('Enter', { timeout });
        }
        if (waitFor) {
          await waitFor.waitFor({ state: 'visible', timeout });
        }
        return;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  async typeAndEnter(locator: Locator, text: string, options?: TypeOptions): Promise<void> {
    await this.type(locator, text, { ...options, pressEnter: true });
  }

  async clear(locator: Locator, options?: TypeOptions): Promise<void> {
    const { timeout, retries } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;
    for (let i = 0; i < attempts; i++) {
      try {
        await locator.fill('', { timeout });
        return;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  async getText(locator: Locator, options?: GetTextOptions): Promise<string> {
    const { timeout, retries, trim, waitFor } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;
    for (let i = 0; i < attempts; i++) {
      try {
        if (waitFor) {
          await waitFor.waitFor({ state: 'visible', timeout });
        }
        const txt = await locator.textContent({ timeout });
        if (txt === null) {
          throw new Error('Element has no text content');
        }
        return trim ? txt.trim() : txt;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  async getAllTexts(locator: Locator, options?: GetTextOptions): Promise<string[]> {
    const { timeout, retries, trim } = options || {};
    const attempts = retries ?? 3;
    let lastError: any;

    for (let i = 0; i < attempts; i++) {
      try {
        const count = await locator.count();
        const texts: string[] = [];

        for (let idx = 0; idx < count; idx++) {
          const el = locator.nth(idx);
          const txt = await el.textContent({ timeout });

          if (txt !== null) {
            texts.push(trim ? txt.trim() : txt);
          }
        }

        if (texts.length < 30 && i < attempts - 1) {
          await this.page.waitForTimeout(300);
          continue;
        }

        return texts;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
        await this.page.waitForTimeout(300);
      }
    }

    throw lastError;
  }

  async countElements(locator: Locator, options?: CountElementsOptions): Promise<number> {
    const { retries, visibleOnly } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;
    for (let i = 0; i < attempts; i++) {
      try {
        if (visibleOnly) {
          const count = await locator.filter({ has: this.page.locator(':visible') }).count();
          return count;
        }
        return await locator.count();
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  async isVisible(locator: Locator, options?: StateCheckOptions): Promise<boolean> {
    const { timeout, retries } = options || {};
    const attempts = retries ?? 1;
    for (let i = 0; i < attempts; i++) {
      try {
        return await locator.isVisible({ timeout });
      } catch (error) {
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    return false;
  }

  async isEnabled(locator: Locator, options?: StateCheckOptions): Promise<boolean> {
    const { timeout, retries } = options || {};
    const attempts = retries ?? 1;
    for (let i = 0; i < attempts; i++) {
      try {
        return await locator.isEnabled({ timeout });
      } catch (error) {
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    return false;
  }

  async isDisabled(locator: Locator, options?: StateCheckOptions): Promise<boolean> {
    const { timeout, retries } = options || {};
    const attempts = retries ?? 1;
    for (let i = 0; i < attempts; i++) {
      try {
        return !(await locator.isEnabled({ timeout }));
      } catch (error) {
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    return false;
  }

  async isChecked(locator: Locator, options?: StateCheckOptions): Promise<boolean> {
    const { timeout, retries } = options || {};
    const attempts = retries ?? 1;
    for (let i = 0; i < attempts; i++) {
      try {
        return await locator.isChecked({ timeout });
      } catch (error) {
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    return false;
  }

  async isUnchecked(locator: Locator, options?: StateCheckOptions): Promise<boolean> {
    const { timeout, retries } = options || {};
    const attempts = retries ?? 1;
    for (let i = 0; i < attempts; i++) {
      try {
        return !(await locator.isChecked({ timeout }));
      } catch (error) {
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    return false;
  }

  async reloadPage(): Promise<void> {
    await this.page.reload();
    // eslint-disable-next-line playwright/no-networkidle
    await this.page.waitForLoadState('networkidle');
  }

  filterByText(locator: Locator, text: string): Locator {
    return locator.filter({ hasText: text });
  }

  /**
   * Generic helper to get a value element by label from a list of items.
   * @param itemsLocator Locator for the list of items/rows
   * @param label The label text to search for
   * @param valueSelector Selector (relative to item) for the value
   * @param options Optional GetTextOptions
   * @returns Promise<string>
   */
  async getValueByLabel(
    itemsLocator: Locator,
    label: string,
    valueSelector: string,
    options?: GetTextOptions,
  ): Promise<string> {
    const item = this.filterByText(itemsLocator, label);
    const value = item.locator(valueSelector);
    return this.getText(value, options);
  }

  // ---------- ADVANCED ACTIONS ----------

  /**
   * Sets a session token (e.g., after logging in via API) in sessionStorage, then reloads the page.
   * @param pageURL URL to navigate before setting the token (optional)
   * @param token The authentication token string
   */
  async setSessionToken(token: string, pageURL?: string): Promise<void> {
    if (pageURL) {
      await this.page.goto(pageURL);
    }
    await this.page.evaluate((authToken) => {
      // eslint-disable-next-line no-undef
      sessionStorage.setItem('token', authToken);
    }, token);
    await this.reloadPage();
  }

  async dragAndDrop(from: Locator, to: Locator | { x: number; y: number }, options?: DragAndDropOptions): Promise<void> {
    const { timeout, steps, delay, retries } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;

    for (let i = 0; i < attempts; i++) {
      try {
        if ('x' in to && 'y' in to) {
          // Drag to coordinates using mouse API
          const box = await from.boundingBox();
          if (!box) {
            throw new Error('Source element not visible for drag');
          }
          const startX = box.x + box.width / 2;
          const startY = box.y + box.height / 2;

          await this.page.mouse.move(startX, startY);
          await this.page.mouse.down();
          if (delay) {
            await this.page.waitForTimeout(delay);
          }
          await this.page.mouse.move(to.x, to.y, { steps: steps || 1 });
          await this.page.mouse.up();
        } else {
          await from.dragTo(to as Locator, { timeout });
        }
        if (delay) {
          await this.page.waitForTimeout(delay);
        }
        return;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  async scrollToElement(locator: Locator, options?: HoverOptions): Promise<void> {
    const { timeout, retries } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;

    for (let i = 0; i < attempts; i++) {
      try {
        await locator.scrollIntoViewIfNeeded({ timeout });
        return;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  async hover(locator: Locator, options?: HoverOptions): Promise<void> {
    const { timeout, force, retries } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;
    for (let i = 0; i < attempts; i++) {
      try {
        await locator.hover({ timeout, force });
        return;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  // ---------- CLIPBOARD ACTIONS ----------

  async copy(locator: Locator, options?: ClipboardOptions): Promise<void> {
    // Typical copy action: select + press Ctrl/Cmd+C
    const { timeout, retries } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;
    for (let i = 0; i < attempts; i++) {
      try {
        await locator.click({ timeout });
        await this.page.keyboard.press(process.platform === 'darwin' ? 'Meta+C' : 'Control+C');
        return;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  async paste(locator: Locator, options?: ClipboardOptions): Promise<void> {
    // Typical paste action: focus + press Ctrl/Cmd+V
    const { timeout, retries } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;
    for (let i = 0; i < attempts; i++) {
      try {
        await locator.click({ timeout });
        await this.page.keyboard.press(process.platform === 'darwin' ? 'Meta+V' : 'Control+V');
        return;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  async getClipboardText(): Promise<string> {
    return this.page.evaluate('navigator.clipboard.readText()');
  }

  // ---------- ALERT/MODAL ACTIONS ----------

  async acceptAlert(options?: AlertOptions): Promise<void> {
    const { retries } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;
    for (let i = 0; i < attempts; i++) {
      try {
        this.page.once('dialog', async (dialog) => await dialog.accept());
        return;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  async dismissAlert(options?: AlertOptions): Promise<void> {
    const { retries } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;
    for (let i = 0; i < attempts; i++) {
      try {
        this.page.once('dialog', async (dialog) => await dialog.dismiss());
        return;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  // ---------- FILE UPLOAD/DOWNLOAD ----------

  async uploadFile(locator: Locator, filePath: string, options?: FileUploadOptions): Promise<void> {
    const { timeout, retries } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;
    for (let i = 0; i < attempts; i++) {
      try {
        await locator.setInputFiles(filePath, { timeout });
        return;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  async downloadFile(locator: Locator, options?: FileDownloadOptions): Promise<Download> {
    const { timeout, retries } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;
    for (let i = 0; i < attempts; i++) {
      try {
        const [download] = await Promise.all([this.page.waitForEvent('download', { timeout }), locator.click({ timeout })]);
        return download;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  // ---------- IFRAMES ----------

  async switchToIframe(iframeLocator: Locator, options?: IFrameOptions): Promise<FrameLocator> {
    const { timeout, retries } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;
    for (let i = 0; i < attempts; i++) {
      try {
        await iframeLocator.waitFor({ state: 'visible', timeout });
        const nameOrId = await iframeLocator.evaluate((el) => el.getAttribute('name') || el.getAttribute('id'));
        if (!nameOrId) {
          throw new Error('Iframe must have a name or id attribute to use frameLocator.');
        }
        const frameLocator = this.page.frameLocator(nameOrId);
        return frameLocator;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  async findInIframe(iframeLocator: Locator, childLocator: Locator, options?: IFrameOptions): Promise<Locator> {
    // Typical approach: get Frame, then locate inside.
    const frameLocator = await this.switchToIframe(iframeLocator, options);
    return frameLocator.locator(childLocator);
  }

  // ---------- NETWORK / WAITS ----------

  async waitForRequest(
    urlOrPredicate: string | RegExp | ((req: Request) => boolean),
    options?: WaitForRequestOptions,
  ): Promise<Request> {
    const { timeout, retries } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;
    for (let i = 0; i < attempts; i++) {
      try {
        return await this.page.waitForRequest(urlOrPredicate, { timeout });
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  async waitForElement(locator: Locator, options?: WaitForElementOptions): Promise<void> {
    const { timeout, state, retries } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;
    for (let i = 0; i < attempts; i++) {
      try {
        await locator.waitFor({ state, timeout });
        return;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  async waitForElementToDisappear(locator: Locator, options?: WaitForElementOptions): Promise<void> {
    await this.waitForElement(locator, { ...options, state: 'detached' });
  }

  async waitForUrlChange(urlOrRegex: string | RegExp, options?: WaitForElementOptions): Promise<void> {
    const { timeout, retries } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;
    for (let i = 0; i < attempts; i++) {
      try {
        await this.page.waitForURL(urlOrRegex, { timeout });
        return;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  async waitForNetworkIdle(options?: WaitForElementOptions): Promise<void> {
    const { timeout } = options || {};
    // eslint-disable-next-line playwright/no-networkidle
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  async waitForNavigation(options?: WaitForElementOptions): Promise<void> {
    const { timeout } = options || {};
    await this.page.waitForNavigation({ timeout });
  }

  async waitForCondition(condition: () => Promise<boolean>, options?: WaitForConditionOptions): Promise<void> {
    const { timeout = 5000, retries = 10, intervalMs = 200 } = options || {};
    let attempts = 0;
    const start = Date.now();
    while (attempts < retries && Date.now() - start < timeout) {
      if (await condition()) {
        return;
      }
      await this.page.waitForTimeout(intervalMs);
      attempts++;
    }
    throw new Error('Condition not met within specified timeout.');
  }

  // ---------- RETRY HELPER ----------

  async retryNTimes<T>(fn: () => Promise<T>, retries: number, delayMs?: number): Promise<T> {
    let attempts = 0;
    let lastError: any;
    while (attempts < retries) {
      try {
        return await fn();
      } catch (e) {
        lastError = e;
        attempts++;
        if (delayMs) {
          await new Promise((res) => setTimeout(res, delayMs));
        }
      }
    }
    throw lastError;
  }

  async waitForAnyElementVisible(locator: Locator, options?: WaitForElementOptions): Promise<void> {
    const { timeout, state = 'visible', retries } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;

    for (let i = 0; i < attempts; i++) {
      try {
        const count = await locator.count();
        if (count === 0) {
          throw new Error('No elements found for waitForAnyElementVisible');
        }
        for (let idx = 0; idx < count; idx++) {
          try {
            await locator.nth(idx).waitFor({ state, timeout });
            return;
          } catch {
            /* Ignore, keep searching */
          }
        }
        throw new Error('No visible element found in locator group');
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  async waitForAllElementsVisible(locator: Locator, options?: WaitForElementOptions): Promise<void> {
    const { timeout, state = 'visible', retries } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;

    for (let i = 0; i < attempts; i++) {
      try {
        const count = await locator.count();
        if (count === 0) {
          throw new Error('No elements found');
        }

        for (let idx = 0; idx < count; idx++) {
          await locator.nth(idx).waitFor({ state, timeout });
        }

        return;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }

    throw lastError;
  }

  async doubleClick(locator: Locator, options?: DoubleClickOptions): Promise<void> {
    const { timeout, force, retries, waitFor } = options || {};
    const attempts = retries ?? 1;
    let lastError: any;

    for (let i = 0; i < attempts; i++) {
      try {
        await locator.dblclick({ timeout, force });
        if (waitFor) {
          await waitFor.waitFor({ state: 'visible', timeout });
        }
        return;
      } catch (error) {
        lastError = error;
        if (i === attempts - 1) {
          throw error;
        }
      }
    }
    throw lastError;
  }
}
