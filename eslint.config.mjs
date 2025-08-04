import tseslint from 'typescript-eslint';

// ignore files
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// lang options
import globals from 'globals';

// playwright rules
import stylisticJs from '@stylistic/eslint-plugin';

import esImport from 'eslint-plugin-import';
import playwright from 'eslint-plugin-playwright';

// legacy rules
import eslintjs from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslintjs.configs.recommended,
  allConfig: eslintjs.configs.all,
});

// prettier
import pluginprettier from 'eslint-plugin-prettier';

// eslint config
export default tseslint.config(
  {
    ignores: ['*.js', '*.cjs', '*.mjs'],
  },
  eslintjs.configs.recommended,
  tseslint.configs.recommended,
  esImport.flatConfigs.recommended,
  ...compat.extends('prettier'),
  ...compat.extends('plugin:playwright/recommended'),
  {
    ignores: [
      'node_modules',
      'test-results',
      'playwright-report',
      'playwright/.cache',
      'package-lock.json',
      '.gitlab-ci.yml',
      'package.json',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        loadTypeScriptPlugins: true,
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      ecmaVersion: 2023,
      sourceType: 'module',
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: true,
      },
    },
    plugins: {
      '@stylistic/js': stylisticJs,
      playwright,
      prettier: pluginprettier,
    },
    rules: {
      '@stylistic/js/comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
        },
      ],
      '@stylistic/js/eol-last': 'warn',
      '@stylistic/js/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      '@stylistic/js/no-multi-spaces': 'warn',
      '@stylistic/js/space-before-function-paren': 'off',
      'array-callback-return': 'warn',
      'import/no-unresolved': 'error',
      'import/no-named-as-default': 0,
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/no-cycle': [
        2,
        {
          maxDepth: 1,
        },
      ],
      'no-async-promise-executor': 'warn',
      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-new': 'warn',
      'no-unused-expressions': 0,
      'no-var': 'error',
      'playwright/prefer-locator': 1,
      'playwright/prefer-native-locators': 1,
      'playwright/prefer-to-have-count': 1,
      'prefer-const': 'warn',
      'prefer-promise-reject-errors': 'off',

      '@typescript-eslint/no-unused-expressions': 'warn',
      curly: 'error',
      '@typescript-eslint/no-this-alias': 'error',
      'no-fallthrough': 'error',
      'no-empty': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-console': 'warn',
      'no-undef': 'error',
      'playwright/expect-expect': 'warn',
      'playwright/no-networkidle': 'warn',
      'playwright/no-wait-for-timeout': 'error',
    },
  }
);
