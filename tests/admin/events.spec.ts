import { test, expect, type Page } from '@playwright/test';
import { e2eTitle, hasCredentials, localDate, NO_CREDENTIALS } from '../helpers/env';
import { deleteRowByTitle, fillEditor } from '../helpers/ui';

async function openCreateForm(page: Page) {
	await page.goto('/admin/eventsadmin');
	await page.getByRole('button', { name: 'Create Event' }).click();
	await expect(page.locator('#title')).toBeVisible();
}

async function fillEvent(page: Page, title: string, startdate: string) {
	await page.locator('#title').fill(title);
	await fillEditor(page, 'This event was created by an automated end-to-end test.');
	await expect(page.locator('#slug')).toHaveValue(/automated end-to-end test/);

	// First real location (index 0 is the "Select a location" placeholder).
	const location = page.locator('select').filter({ hasText: 'Select a location' });
	await expect(location.locator('option')).not.toHaveCount(2); // locations loaded
	await location.selectOption({ index: 1 });

	await page.locator('#startdate').fill(startdate);
	await page.locator('#startdate').blur(); // copies the start date into the end date
	await expect(page.locator('#enddate')).toHaveValue(startdate);
	await page.locator('#starttime').fill('18:00');
	await page.locator('#endtime').fill('19:30');
	await page.locator('#endtime').blur();
}

test.describe('Events admin', () => {
	test.skip(!hasCredentials, NO_CREDENTIALS);

	test('publish → visible on /events → delete', async ({ page }) => {
		const title = e2eTitle('Event');
		await openCreateForm(page);

		const publish = page.getByRole('button', { name: 'Publish event' });
		await expect(publish).toBeDisabled();
		await fillEvent(page, title, localDate(3));
		await expect(publish).toBeEnabled();
		await publish.click();

		await expect(page).toHaveURL('/admin/eventsadmin');
		await expect(page.locator('tr', { hasText: title })).toBeVisible();

		await page.goto('/events');
		await expect(page.getByText(title)).toBeVisible();
		await page.getByText(title).click();
		await expect(page.getByText('automated end-to-end test').first()).toBeVisible();

		await page.goto('/admin/eventsadmin');
		await deleteRowByTitle(page, title);
		await page.goto('/events');
		await expect(page.getByText(title)).toHaveCount(0);
	});

	test('a start date in the past is rejected', async ({ page }) => {
		const title = e2eTitle('Past event');
		await openCreateForm(page);
		await fillEvent(page, title, localDate(-2));
		await page.getByRole('button', { name: 'Publish event' }).click();

		// .first(): the toast currently renders twice (page and form each mount a ToastContainer).
		await expect(page.getByText('The start date cannot be in the past').first()).toBeVisible();
		await expect(page).toHaveURL('/admin/eventsadmin/create');
	});
});
