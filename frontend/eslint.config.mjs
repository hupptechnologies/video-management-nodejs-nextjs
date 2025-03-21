import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import tsparser from '@typescript-eslint/parser';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettierConfig,
  {
    ignores: ['**/build/**', '**/dist/**', '**/.next/**']
  },
  {
    plugins: {
      prettier: prettierPlugin,
      '@next/next': nextPlugin
    },
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      'prettier/prettier': ['error', { useTabs: true, tabWidth: 2, singleQuote: true, }],
      'react-hooks/exhaustive-deps': 'off',
      'no-console': [
        'error',
        {
          allow: ['info', 'error']
        }
      ],
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'all',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_'
        }
      ],
      eqeqeq: 'error',
      curly: 'error',
      'no-duplicate-imports': 'error'
    }
  }
);