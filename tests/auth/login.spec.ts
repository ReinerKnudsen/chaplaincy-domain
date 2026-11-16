import { test, expect } from '@playwright/test';
import { hasCredentials, NO_CREDENTIALS } from '../helpers/env';
import { login } from '../helpers/ui';

test.describe('Authentication', () => {
	test('login and logout toggle the admin link and the footer button', async ({ page }) => {
		test.skip(!hasCredentials, NO_CREDENTIALS);
		const adminLink = page.getByRole('link', { name: 'Admin', exact: true });

		await page.goto('/');
		await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
		await expect(adminLink).toBeHidden();

		// Retry the click: before hydration the button has no handler yet.
		await expect(async () => {
			await page.getByRole('button', { name: 'Login' }).click();
			await expect(page).toHaveURL('/login', { timeout: 1000 });
		}).toPass();

		await login(page);
		await expect(page).toHaveURL('/admin');

		await page.goto('/');
		await expect(adminLink).toBeVisible();
		await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();

		await page.getByRole('button', { name: 'Sign out' }).click();
		await expect(page).toHaveURL('/');
		await expect(adminLink).toBeHidden();
		await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
	});

	test('wrong password shows an error and stays on /login', async ({ page }) => {
		await login(page, 'nobody@example.invalid', 'wrong-password');
		await expect(page.getByText('Whoops. Signing you in I could not.')).toBeVisible();
		await expect(page).toHaveURL('/login');
	});

	test('sign-in button stays disabled until both fields are filled', async ({ page }) => {
		await page.goto('/login');
		const signIn = page.getByRole('button', { name: 'Sign in' });
		await expect(signIn).toBeDisabled();
		await page.getByLabel('Your email').fill('someone@example.com');
		await expect(signIn).toBeDisabled();
		await page.getByPlaceholder('•••••').fill('x');
		await expect(signIn).toBeEnabled();
	});

	test('admin area redirects anonymous visitors to the home page', async ({ page }) => {
		await page.goto('/admin/newsadmin');
		await expect(page).toHaveURL('/');
	});
});
