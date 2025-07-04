/** @type { import('eslint').Linter.Config } */
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
		extraFileExtensions: ['.svelte'],
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier',
	],
	plugins: ['@typescript-eslint'],
	env: {
		browser: true,
		es2020: true,
		node: true,
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
	],
	rules: {
		'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
		'no-console': ['error', { allow: ['warn', 'error'] }],
		quotes: ['error', 'single'],
	},
};
