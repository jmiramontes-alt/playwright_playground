# Creating API Tests

This guide explains how to create effective API tests using our Playwright automation framework.

## Test Structure

All API tests should follow this structure and use the service-based architecture:

```typescript
import { test, expect } from '@playwright/test';
import { ExamApiFacade } from '@api/business/exam-api-facade';
import { userData } from '@support/credentials';
import { getToken } from '@api/services/support/auth-api';
import { TAGS, API, SMOKE, EXAMS } from '@tags';

test.describe('API Test Suite', () => {
  let token: string;

  test.beforeAll(async () => {
    const { radCreds1 } = userData().radiologistCreds;
    token = await getToken(radCreds1);
  });

  test('should validate API response', { tag: [API, SMOKE] }, async () => {
    // Test implementation
  });
});
```

## Best Practices

### 1. Use Service Layer

Leverage the existing API services and facades:

```typescript
import { ExamApiFacade } from '@api/business/exam-api-facade';
import { UsersService } from '@api/users-api';
import { FilterService } from '@api/filter-api';
```

### 2. Apply Proper Tagging

Use appropriate tags for API tests:

```typescript
import { TAGS, API, SMOKE, PERFORMANCE } from '@tags';

test(
  'should retrieve exam data',
  {
    tag: [API, SMOKE],
  },
  async () => {
    // test implementation
  }
);
```

### 3. Token Management

Use the centralized token management:

```typescript
import { getToken } from '@api/services/support/auth-api';
import { userData } from '@support/credentials';

const { radCreds1 } = userData().radiologistCreds;
const token = await getToken(radCreds1);
```

### 4. Response Validation

Validate both structure and data, making use of fluent assertions:

```typescript
const response = await examApiFacade.getExamList(token, filter);
expect(Array.isArray(response.data)).toBeTruthy();
expect(response.count).toBeGreaterThan(0);
```

## Complete Example

Here's the actual API test from the codebase, demonstrating best practices:

```typescript
import { test, expect } from '@playwright/test';
import { ExamApiFacade } from '@api/business/exam-api-facade';
import { userData } from '@support/credentials';
import { getToken } from '@api/services/support/auth-api';
import { TAGS, API, SMOKE } from '@tags';

const filters = ['inflight', 'completed', 'pending', 'consult', 'support'];
const { radCreds1 } = userData().radiologistCreds;
const examApiFacade = new ExamApiFacade();

test.describe('Exam List API - Filtered Queries', () => {
  let token: string;

  test.beforeAll(async () => {
    token = await getToken(radCreds1);
  });

  for (const filter of filters) {
    test(
      `should return exam list for filter: "${filter}"`,
      {
        tag: [API, SMOKE, EXAMS],
      },
      async () => {
        const response = await examApiFacade.getExamList(token, filter);
        const exams = await response.data;

        // Validate response structure
        expect(Array.isArray(exams)).toBeTruthy();
        expect(await response.count).toBeGreaterThan(0);

        // Validate individual exam objects
        for (const exam of exams) {
          examApiFacade.validateExam(exam);
        }
      }
    );
  }

  test(
    'should handle invalid filter gracefully',
    {
      tag: [API],
    },
    async () => {
      const response = await examApiFacade.getExamList(token, 'invalid-filter');
      // Add appropriate error handling validation
    }
  );

  test(
    'should require valid authentication',
    {
      tag: [API, SMOKE],
    },
    async () => {
      // Test with invalid token
      const invalidToken = 'invalid-token';

      try {
        await examApiFacade.getExamList(invalidToken, 'inflight');
        // Should not reach here if properly implemented
        expect(false).toBe(true);
      } catch (error) {
        // Validate proper error response
        expect(error).toBeDefined();
      }
    }
  );
});
```

## Testing Patterns

### Data-Driven Testing

```typescript
const testCases = [
  { filter: 'inflight', expectedMinCount: 1 },
  { filter: 'completed', expectedMinCount: 5 },
  { filter: 'pending', expectedMinCount: 0 },
];

for (const testCase of testCases) {
  test(`should return ${testCase.filter} exams`, async () => {
    const response = await examApiFacade.getExamList(token, testCase.filter);
    expect(await response.count).toBeGreaterThanOrEqual(testCase.expectedMinCount);
  });
}
```

### Error Handling Pattern

```typescript
test('should handle API errors gracefully', { tag: [API] }, async () => {
  try {
    await apiService.performInvalidOperation();
  } catch (error) {
    expect(error.message).toContain('Expected error message');
    expect(error.status).toBe(400);
  }
});
```

## Service Integration Examples

### Using Multiple Services

```typescript
test(
  'should coordinate multiple API calls',
  {
    tag: [API, INTEGRATION],
  },
  async () => {
    const usersService = new UsersService();
    const filterService = new FilterService();

    // Setup user preferences
    await usersService.updateSavePreferences(user, preferencesBody, token);

    // Reset filters
    await filterService.resetFilterSettings(user, 'orders', token);

    // Perform main operation
    const response = await examApiFacade.getExamList(token, 'inflight');
    expect(response.data).toBeDefined();
  }
);
```

## Common Pitfalls

1. **Don't skip authentication**: Always use proper tokens
2. **Don't ignore error responses**: Test both success and failure cases
3. **Don't hardcode data**: Use test data from the support files
4. **Don't skip validation**: Validate both structure and business logic
5. **Don't use magic numbers**: Use constants for expected values
