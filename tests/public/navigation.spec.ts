import { test, expect } from '@playwright/test';
import { navLinks, urlPattern } from '../helpers/menu';

// Runs on desktop (project "public") and on a phone viewport (project "public-mobile").
test('every navigation link leads to its page', async ({ page, isMobile }) => {
	await page.goto('/');
	const nav = page.getByRole('navigation').first();

	for (const { title, url, parent } of navLinks) {
		if (isMobile) {
			// Retry the toggle: before hydration the button has no handler yet.
			const mobileMenu = page.locator('#mobileMenu');
			await expect(async () => {
				await nav.getByRole('button', { name: 'Toggle mobile menu' }).click();
				await expect(mobileMenu).toBeVisible({ timeout: 1000 });
			}).toPass();
			await mobileMenu.getByRole('link', { name: title, exact: true }).click();
		} else {
			// Sub menus open on hover.
			if (parent) await nav.getByRole('button', { name: parent }).hover();
			await nav.getByRole('link', { name: title, exact: true }).first().click();
		}
		await expect(page, `"${title}" → ${url}`).toHaveURL(urlPattern(url));
	}
});
