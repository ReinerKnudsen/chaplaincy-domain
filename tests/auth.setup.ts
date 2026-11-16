import { test as setup, expect } from '@playwright/test';
import { hasCredentials, NO_CREDENTIALS } from './helpers/env';
import { login } from './helpers/ui';

const AUTH_FILE = 'tests/.auth/editor.json';

// Log in once; the admin tests reuse the session. Firebase Auth keeps it in
// IndexedDB, so the storage state must include IndexedDB.
setup('log in as editor', async ({ page }) => {
	setup.skip(!hasCredentials, NO_CREDENTIALS);
	await login(page);
	await page.waitForURL('/admin');
	await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
	await page.context().storageState({ path: AUTH_FILE, indexedDB: true });
});
