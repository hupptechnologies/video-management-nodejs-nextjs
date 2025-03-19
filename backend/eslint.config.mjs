import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

/** @type {import('eslint').FlatConfig[]} */
export default [
	{
		ignores: ['node_modules/', 'dist/', 'build/', 'migrations/*', 'config/*'],
	},
	js.configs.recommended,
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				project: './tsconfig.json',
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: {
				__dirname: 'readonly',
				__filename: 'readonly',
				console: 'readonly',
				...globals.node,
			},
		},
		plugins: {
			'@typescript-eslint': tseslint,
		},
		rules: {
			...tseslint.configs.recommended.rules,
			'@typescript-eslint/no-unused-vars': ['error'],
			'@typescript-eslint/no-explicit-any': 'warn',
		},
	},
	{
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			...prettierConfig.rules,
			quotes: [
				'error',
				'single',
				{
					avoidEscape: true,
				},
			],
			semi: ['error', 'always'],
			'comma-spacing': [
				'error',
				{
					before: false,
					after: true,
				},
			],
			'no-var': 'error',
			'prefer-const': 'error',
			'no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
				},
			],
			'keyword-spacing': [
				'error',
				{
					before: true,
					after: true,
				},
			],
			'arrow-spacing': [
				'error',
				{
					before: true,
					after: true,
				},
			],
			'no-trailing-spaces': 'error',
			'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'prettier/prettier': [
				'error',
				{
					useTabs: true,
					tabWidth: 2,
					singleQuote: true,
				},
			],
			'@typescript-eslint/no-explicit-any': 'off',
			'no-multiple-empty-lines': [
				'error',
				{
					max: 1,
					maxEOF: 0,
				},
			],
			eqeqeq: 'error',
			curly: 'error',
			'no-duplicate-imports': 'error',
		},
	},
];
