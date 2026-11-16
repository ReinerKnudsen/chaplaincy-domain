import { test, expect, type Page } from '@playwright/test';
import { e2eTitle, hasCredentials, localDate, NO_CREDENTIALS } from '../helpers/env';
import { deleteRowByTitle, fillEditor } from '../helpers/ui';

async function openCreateForm(page: Page) {
	await page.goto('/admin/newsadmin');
	await page.getByRole('button', { name: 'Create News' }).click();
	await expect(page.getByRole('heading', { name: 'Create news item' })).toBeVisible();
}

async function fillNews(page: Page, title: string) {
	await page.locator('#title').fill(title);
	await fillEditor(page, 'This news item was created by an automated end-to-end test.');
	// Blurring the editor derives the teaser text from the body.
	await expect(page.locator('#slug')).toHaveValue(/automated end-to-end test/);
}

test.describe('News admin', () => {
	test.skip(!hasCredentials, NO_CREDENTIALS);

	test('publish → visible on /news → delete', async ({ page }) => {
		const title = e2eTitle('Published news');
		await openCreateForm(page);

		const publish = page.getByRole('button', { name: 'Publish news' });
		await expect(publish).toBeDisabled();
		await fillNews(page, title);
		await expect(publish).toBeEnabled();
		await publish.click();

		await expect(page).toHaveURL('/admin/newsadmin');
		await expect(page.locator('tr', { hasText: title })).toBeVisible();

		await page.goto('/news');
		await expect(page.getByText(title)).toBeVisible();
		await page.getByText(title).click();
		await expect(page.getByText('automated end-to-end test').first()).toBeVisible();

		await page.goto('/admin/newsadmin');
		await deleteRowByTitle(page, title);
		await page.goto('/news');
		await expect(page.getByText(title)).toHaveCount(0);
	});

	test('a draft stays off the public page', async ({ page }) => {
		const title = e2eTitle('Draft news');
		await openCreateForm(page);
		await fillNews(page, title);
		await page.getByRole('button', { name: 'Save draft' }).click();

		await expect(page).toHaveURL('/admin/newsadmin');
		await expect(page.locator('tr', { hasText: title })).toBeVisible();

		await page.goto('/news');
		await expect(page.getByText('loading...')).toBeHidden();
		await expect(page.getByText(title)).toHaveCount(0);

		await page.goto('/admin/newsadmin');
		await deleteRowByTitle(page, title);
	});

	test('news scheduled for the future stays off the public page', async ({ page }) => {
		const title = e2eTitle('Scheduled news');
		await openCreateForm(page);
		await fillNews(page, title);
		await page.locator('#publishdate').fill(localDate(7));
		await page.getByRole('button', { name: 'Publish news' }).click();

		await expect(page).toHaveURL('/admin/newsadmin');
		await expect(page.locator('tr', { hasText: title })).toContainText(localDate(7));

		await page.goto('/news');
		await expect(page.getByText('loading...')).toBeHidden();
		await expect(page.getByText(title)).toHaveCount(0);

		await page.goto('/admin/newsadmin');
		await deleteRowByTitle(page, title);
	});

	test('leaving the form with unsaved changes asks for confirmation', async ({ page }) => {
		await openCreateForm(page);
		await page.locator('#title').fill(e2eTitle('Unsaved news'));
		await page.locator('#subtitle').click(); // blur → change detection

		await page.getByRole('link', { name: 'Events' }).first().click();
		const dialog = page.getByRole('dialog');
		await expect(dialog).toContainText('Unsaved Changes');

		await dialog.getByRole('button', { name: 'Stay on Page' }).click();
		await expect(page).toHaveURL('/admin/newsadmin/create');

		await page.getByRole('link', { name: 'Events' }).first().click();
		await page.getByRole('dialog').getByRole('button', { name: 'Leave Page' }).click();
		await expect(page).toHaveURL('/admin/newsadmin');
	});
});
