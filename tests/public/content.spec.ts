import { test, expect } from '@playwright/test';
import { trackPageErrors } from '../helpers/ui';

// Read-only checks against whatever content currently exists in the dev project.
for (const kind of ['news', 'events'] as const) {
	test.describe(`/${kind}`, () => {
		test('list opens a detail page', async ({ page }) => {
			const errors = trackPageErrors(page);
			await page.goto(`/${kind}`);
			// Detail links only — the navigation also links to "/${kind}/" itself.
			const cards = page.locator(`a[href^="/${kind}/"]:not([href="/${kind}/"])`);
			await expect(page.getByText('loading...')).toBeHidden();
			test.skip((await cards.count()) === 0, `no published ${kind} in the dev project`);

			const href = await cards.first().getAttribute('href');
			await cards.first().click();
			await expect(page).toHaveURL(href!);
			await expect(page.locator('h1, h2').first()).toBeVisible();
			expect(errors).toEqual([]);
		});

		test('unknown id answers with 404', async ({ page }) => {
			// KNOWN BUG: the detail loader catches its own error(404) and rethrows error(500).
			// Remove test.fail() once src/routes/(pages)/${kind}/[id]/+page.js lets HttpErrors through.
			test.fail();
			const response = await page.goto(`/${kind}/does-not-exist-e2e`);
			expect(response?.status()).toBe(404);
		});
	});
}
