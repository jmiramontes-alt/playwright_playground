/**
 * Test Tags Constants
 *
 * tag definitions for test categorization and execution filtering.
 * These tags help organize tests by type, priority, and functionality.
 *
 * Usage:
 * import { TAGS } from '@tags';
 *
 * test('should login', { tag: [TAGS.SMOKE, TAGS.AUTH] }, async ({ page }) => {
 *   // test implementation
 * });
 */

export const TAGS = {
  // Test Priority Levels
  SMOKE: '@smoke',
  REGRESSION: '@regression',

  // Test Categories
  UI: '@ui',
  API: '@api',

  // Performance
  PERFORMANCE: '@performance',
  LOAD: '@load',
} as const;

/**
 * Usage:
 * import { SMOKE, FUNCTIONAL, AUTH } from '@tags';
 *
 * test('should login', { tag: [SMOKE, AUTH] }, async ({ page }) => {
 *   // test implementation
 * });
 */
export const { SMOKE, REGRESSION, UI, API, PERFORMANCE, LOAD } = TAGS;

export const SUITE_TAGS = {
  SMOKE_UI: [TAGS.SMOKE, TAGS.UI],
  SMOKE_API: [TAGS.SMOKE, TAGS.API],
  REGRESSION_UI: [TAGS.REGRESSION, TAGS.UI],
  REGRESSION_API: [TAGS.REGRESSION, TAGS.API],
} as const;
