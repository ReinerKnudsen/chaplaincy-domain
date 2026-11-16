import { existsSync } from 'node:fs';
import { defineConfig, devices } from '@playwright/test';

// Load .env so the tests see the same VITE_* config as the dev server plus the
// E2E_* credentials. In CI the values come from the environment instead.
if (existsSync('.env')) process.loadEnvFile('.env');

const AUTH_FILE = 'tests/.auth/editor.json';

/**
 * E2E tests run against the real dev Firebase project (VITE_PROJECTID).
 * Everything the admin tests create is titled `[E2E] …` and removed again —
 * by the test itself and, as a safety net, by tests/global-teardown.ts.
 *
 * See tests/README.md.
 */
export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? [['html', { open: 'never' }], ['github']] : 'html',
	globalTeardown: './tests/global-teardown.ts',
	use: {
		baseURL: 'http://localhost:5173',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
	},

	projects: [
		// Public pages, no login.
		{
			name: 'public',
			testMatch: 'public/**/*.spec.ts',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'public-mobile',
			testMatch: 'public/navigation.spec.ts',
			use: { ...devices['Pixel 7'] },
		},
		// Login/logout itself — starts logged out on purpose.
		{
			name: 'auth',
			testMatch: 'auth/**/*.spec.ts',
			use: { ...devices['Desktop Chrome'] },
		},
		// Logs in once and stores the Firebase session (IndexedDB) for the admin tests.
		{
			name: 'setup',
			testMatch: 'auth.setup.ts',
		},
		{
			name: 'admin',
			testMatch: 'admin/**/*.spec.ts',
			dependencies: ['setup'],
			use: { ...devices['Desktop Chrome'], storageState: AUTH_FILE },
		},
	],

	webServer: {
		command: 'npm run dev',
		url: 'http://localhost:5173',
		reuseExistingServer: !process.env.CI,
		timeout: 120000,
	},
});
