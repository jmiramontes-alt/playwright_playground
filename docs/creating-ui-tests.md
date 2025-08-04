# Creating UI Tests

This guide explains how to create effective UI tests using our automation framework.

## Best Practices

### 1. Use Appropriate Fixtures

Import your fixtures from the main fixtures file:

```typescript
import { test, expect } from '@tests/fixtures/main-ui-tests-fixtures';
```

### 2. Apply Proper Tagging

Use the centralized tag system for categorization:

```typescript
import { SMOKE, UI } from '@tags';

test(
  'should login successfully',
  {
    tag: [SMOKE, UI],
  },
  async ({ loginPage }) => {
    // test implementation
  }
);
```

### 3. Use Page Object Models

Leverage the existing page objects for interactions:

```typescript
test('should navigate to orders', async ({ ordersPage }) => {
  await ordersPage.navigateToOrders();
  await expect(ordersPage.ordersTable).toBeVisible();
});
```

### 4. Follow Naming Conventions

- Test files: `kebab-case.spec.ts`
- Test descriptions: Clear, descriptive names
- Variables: `camelCase`

## Complete Example

Here's a complete example of a well-structured UI test:

```typescript
import { test, expect } from '@tests/fixtures/main-ui-tests-fixtures';
import { preferencesBody, preferencesReset } from '@pages/constants/preferences';
import { ALL_ORDER_COLUMNS, ORDER_COLUMN_NAMES } from '@pages/constants/order-columns.types';
import { SMOKE, UI } from '@tags';

test.describe('Order Column Management', () => {
  test.beforeEach(async ({ loginPage, user }) => {
    await loginPage.loginViaApi(user);
  });

  test.afterEach(async ({ user }) => {
    // Cleanup test data
  });

  test(
    'should verify default columns and rows',
    {
      tag: [SMOKE, UI],
    },
    async ({ ordersPage }) => {
      // Step 1: Validate column width
      const actualWidth = await ordersPage.getColumnWidth(ORDER_COLUMN_NAMES.PRIORITY);
      expect(actualWidth).toBe(80);

      // Step 2: Reload and re-validate
      await ordersPage.reloadPage();
      const widthAfterReload = await ordersPage.getColumnWidth(ORDER_COLUMN_NAMES.PRIORITY);
      expect(widthAfterReload).toBe(80);

      // Step 3: Validate available columns
      const colNamesInSettings = await ordersPage.openSettingsAndGetColumnNames();
      expect(colNamesInSettings).toEqual(ALL_ORDER_COLUMNS);

      // Step 4: Test column visibility
      await ordersPage.setColumnCheckboxState(ORDER_COLUMN_NAMES.AGE, false);
      await expect(ordersPage.columnHeaderByName(ORDER_COLUMN_NAMES.AGE)).toBeHidden();

      await ordersPage.setColumnCheckboxState(ORDER_COLUMN_NAMES.AGE, true);
      await expect(ordersPage.columnHeaderByName(ORDER_COLUMN_NAMES.AGE)).toBeVisible();

      // Step 5: Test column reordering
      const headersBefore = await ordersPage.getOrderedHeaderNames();
      const headersAfter = await ordersPage.moveColumnAndGetNewOrder(ORDER_COLUMN_NAMES.AGE, ORDER_COLUMN_NAMES.PRIORITY);
      expect(headersBefore).not.toEqual(headersAfter);
    }
  );
});
```

## Assertion Examples

### Use fluent assertions

```typescript
// Assert visibility
await expect(page.locator('#element')).toBeVisible();

// Assert text content
await expect(page.locator('#title')).toHaveText('Expected Title');

// Assert attribute values
await expect(page.locator('#input')).toHaveAttribute('value', 'expected');
```

## Test Tagging

This framework uses a comprehensive tagging system for test organization and execution. Tags are imported from `@tags` for easy access:

```typescript
import { SMOKE, UI } from '@tags';

test.describe('Login Tests', () => {
  test('should login successfully', { tag: [SMOKE, UI] }, async ({ page }) => {
    // Test implementation
  });
});
```

Available tags include: `SMOKE`, `REGRESSION`, `API`, `UI`, and more. For a complete list of available tags, see [`src/common/constants/tags.ts`](../src/common/constants/tags.ts).

## Common Pitfalls

1. **Don't use hardcoded waits**: Use Playwright's auto-waiting features
2. **Don't skip cleanup**: Always clean up test data in `afterEach`
3. **Don't create overly complex tests**: Keep tests focused and atomic
4. **Don't forget tags**: Always tag your tests appropriately
5. **Avoid using relative imports**: Use path aliases from tsconfig.json if possible
