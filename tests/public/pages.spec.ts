import { test, expect } from '@playwright/test';
import { navLinks } from '../helpers/menu';
import { trackPageErrors } from '../helpers/ui';

// Pages that exist but are not (or no longer) linked from the main navigation.
const unlinkedPages = ['/impressum', '/legal', '/prayers', '/newsletter', '/newsletter/archive', '/mission'];

const pages = [...new Set([...navLinks.map((l) => l.url), ...unlinkedPages])].filter((url) => url !== '/');

test.describe('Every public page renders', () => {
	for (const url of pages) {
		test(url, async ({ page }) => {
			const errors = trackPageErrors(page);
			const response = await page.goto(url);
			expect(response?.status(), 'HTTP status').toBeLessThan(400);

			await expect(page.locator('footer')).toBeVisible();
			await expect(page.getByText(/Failed to load|Internal Error/)).toHaveCount(0);

			// Static pages get a title from their load function; it must not fall back to the placeholder.
			const title = page.locator('h1.page-title');
			if (await title.count()) await expect(title).not.toHaveText('Page Title');

			expect(errors, 'uncaught JavaScript errors').toEqual([]);
		});
	}
});

test('home page renders without errors', async ({ page }) => {
	const errors = trackPageErrors(page);
	const response = await page.goto('/');
	expect(response?.status()).toBeLessThan(400);
	await expect(page.getByAltText('Chaplaincy Logo')).toBeVisible();
	expect(errors).toEqual([]);
});

test('footer shows the app version', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('footer')).toContainText(/\d+\.\d+\.\d+/);
});
