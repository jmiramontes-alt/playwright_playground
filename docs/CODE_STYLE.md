# Code Style and Naming Conventions

Having clear and consistent naming conventions is one of the easiest ways to make our codebase easier to read, maintain, and scale. It reduces confusion, improves collaboration across the team, and helps avoid bugs caused by misunderstandings or inconsistent usage.

These conventions may not be perfect or bullet-proof, but we want to have an understanding/convention that we all agree on and just follow these rules.

## File Naming Conventions

We follow a simplified two-rule system to eliminate decision fatigue:

### Rule 1: Classes (PascalCase.ts)

**When to use:** Files that export a class as the primary export  
**Format:** `PascalCase.ts`  
**Examples:** `LoginPage.ts`, `OrdersPage.ts`, `OrderDetailsPage.ts`, `TopBarMenu.ts`, `TableComponent.ts`

**Applies to:**

- Page Object Model files (`src/ui/pages/`)
- Component files (`src/ui/pages/components/`)
- Fixture files that export classes
- Any file where the primary export is a class

### Rule 2: Everything Else (kebab-case.ts)

**When to use:** All other files  
**Format:** `kebab-case.ts` (or `.json`, `.md`, etc.)  
**Examples:** `open-order-details.spec.ts`, `auth-api.ts`, `order-details.data.ts`, `exam.types.ts`, `main-ui-tests-fixtures.ts`

**Rationale:**

- 100% lowercase avoids cross-OS case-sensitivity surprises
- Keeps import paths predictable
- No mental overhead deciding between different cases

**Applies to:**

- Test files/specs
- API clients and services
- Utility files
- Data files
- Type definition files
- Constants files
- Configuration files
- Any file that doesn't primarily export a class

**Note:** Even though fixture files might export classes, they're typically configuration/setup files rather than primary class definitions, so they follow the kebab-case convention.

## Quick Decision Guide

**Ask yourself:** "Does this file primarily export a class that I'll import as a symbol?"

- **Yes** → Use `PascalCase.ts` (matches the class name)
- **No** → Use `kebab-case.ts` (everything else)

**Result:** Only two filename patterns to remember!

## Folder Naming Conventions

### General Rules

- Use **lowercase** for all folder names: `tests/`, `src/`, `utils/`, `fixtures/`

## Variable and Function Naming

### Variables

- Use **camelCase** for variables: `orderDetails`, `examData`, `userData`
- Use **SCREAMING_SNAKE_CASE** for constants: `ORDER_COLUMN_NAMES`, `UI_LABELS`, `TAGS`

### Functions and Methods

- Use **camelCase** for functions: `loginViaApi()`, `fillSearchInput()`, `waitForDetailsToLoad()`
- Use descriptive names that indicate the action being performed
- Async functions should clearly indicate their asynchronous nature

### Classes

- Use **PascalCase** for classes: `LoginPage`, `OrderDetailsPage`, `TagVisibilityReporter`

## Import Conventions

### Use Path Mappings

Configure TypeScript path mappings in `tsconfig.json`:

```typescript
"paths": {
  "@api/*": ["src/api/*"],
  "@common/*": ["src/common/*"],
  "@support/*": ["src/common/data/test-data/*"],
  "@constants/*": ["src/common/constants/*"],
  "@fixtures/*": ["tests/fixtures/*"],
  "@types/*": ["src/api/types/*"],
  "@tests/*": ["tests/*"],
  "@utils/*": ["src/common/utils/*"],
  "@pages/*": ["src/ui/pages/*"],
  "@pages": ["src/ui/pages/index"],
  "@ui/*": ["src/ui/*"],
  "@tags": ["src/common/constants/tags"]
}
```

### Import Examples

```typescript
// Try using path mappings
import { LoginPage } from '@pages/LoginPage';
import { logger } from '@utils/logger';
import { TAGS } from '@tests/constants';
import { AuthCredentials } from '@api/types/auth.types';
import { SMOKE, FUNCTIONAL } from '@tags';

// Avoid relative imports when path mappings exist
import { LoginPage } from '../../../src/ui/pages/LoginPage';
```

---

**Remember:** These conventions are living guidelines. As the project evolves, we may need to adjust them. The key is maintaining consistency across the team and making the codebase as readable and maintainable as possible.
