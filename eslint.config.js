import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
	// Global ignores (replaces .eslintignore)
	{
		ignores: [
			'.DS_Store',
			'node_modules/**',
			'build/**',
			'.svelte-kit/**',
			'.netlify/**',
			'package/**',
			'functions/**',
			'scripts/**',
			'postcss.config.cjs',
			'.env',
			'.env.*',
			'!.env.example',
			'pnpm-lock.yaml',
			'package-lock.json',
			'yarn.lock',
			'**/*.test.ts',
			'**/mediaadmin/migration/**',
		],
	},

	// Base configs (replaces extends)
	js.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,

	// Global language options (replaces env + parserOptions)
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2020,
				...globals.node,
			},
		},
	},

	// Svelte file overrides (replaces overrides)
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
			},
		},
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'svelte/no-navigation-without-resolve': 'off',
		},
	},

	// Custom rules for all files
	{
		rules: {
			'no-console': ['error', { allow: ['warn', 'error'] }],
			quotes: ['error', 'single'],
		},
	},

	// no-unused-vars only for non-Svelte files (Svelte template usage causes false positives)
	{
		files: ['**/*.{js,mjs,cjs,ts}'],
		rules: {
			'no-unused-vars': [
				'error',
				{ varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
			],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
			],
		},
	}
);
