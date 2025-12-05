import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
	test('should login and logout successfully', async ({ page }) => {
		// Navigate to home page
		await page.goto('/');

		// STEP 1: Verify no user is logged in initially
		// Check that "Login" button is visible in footer (not "Sign out")
		await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

		// Verify Admin link is NOT visible in navigation
		const adminLink = page.getByRole('link', { name: 'Admin', exact: true });
		await expect(adminLink).not.toBeVisible();

		// STEP 2: Navigate to login page
		// Scroll to footer to ensure button is in viewport
		const loginButton = page.getByRole('button', { name: 'Login' });
		await loginButton.scrollIntoViewIfNeeded();
		await expect(loginButton).toBeVisible();
		await expect(loginButton).toBeEnabled();

		// Click and wait for navigation
		await loginButton.click();
		await page.waitForURL('/login', { timeout: 10000 });

		// STEP 3: Fill in login credentials
		await page.getByLabel('Your email').fill('reiner@me.de');
		await page.getByPlaceholder('•••••').fill('apoll13o');

		// STEP 4: Submit login form and wait for redirect
		await Promise.all([
			page.waitForURL('/admin', { timeout: 10000 }),
			page.getByRole('button', { name: 'Sign in' }).click(),
		]);

		// STEP 6: Navigate back to home to check navigation
		await page.goto('/');

		// STEP 7: Verify Admin link IS visible in navigation after login
		await expect(adminLink).toBeVisible();

		// STEP 8: Verify "Sign out" button is visible in footer (not "Login")
		await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
		await expect(page.getByRole('button', { name: 'Login' })).not.toBeVisible();

		// STEP 9: Logout
		await page.getByRole('button', { name: 'Sign out' }).click();

		// STEP 10: Verify successful logout - should redirect to home
		await expect(page).toHaveURL('/');

		// STEP 11: Verify Admin link is NOT visible after logout
		await expect(adminLink).not.toBeVisible();

		// STEP 12: Verify "Login" button is visible again in footer
		await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
		await expect(page.getByRole('button', { name: 'Sign out' })).not.toBeVisible();
	});
});
