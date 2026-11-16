import { expect, type Page } from '@playwright/test';
import { E2E_EMAIL, E2E_PASSWORD } from './env';

export async function login(page: Page, email = E2E_EMAIL, password = E2E_PASSWORD) {
	await page.goto('/login');
	await page.getByLabel('Your email').fill(email);
	await page.getByPlaceholder('•••••').fill(password);
	await page.getByRole('button', { name: 'Sign in' }).click();
}

/** Types markdown into the Toast UI editor and blurs it (blur derives the teaser text). */
export async function fillEditor(page: Page, text: string) {
	const editor = page.locator('.toastui-editor-md-container .ProseMirror').first();
	await editor.click();
	await page.keyboard.type(text);
	await page.locator('#title').click();
}

/** Opens the delete dialog for the row with this title in an admin table and confirms it. */
export async function deleteRowByTitle(page: Page, title: string) {
	const row = page.locator('tr', { hasText: title });
	await row.getByRole('button', { name: 'Delete item' }).click();
	const dialog = page.getByRole('dialog');
	await expect(dialog).toContainText('Confirm Delete');
	await dialog.getByRole('button', { name: 'Delete' }).click();
	await expect(page.locator('tr', { hasText: title })).toHaveCount(0);
}

/** Collects uncaught page errors so a test can assert there were none. */
export function trackPageErrors(page: Page) {
	const errors: string[] = [];
	page.on('pageerror', (err) => errors.push(err.message));
	return errors;
}
