/**
 * Credentials of the E2E test account (role `editor` or `admin`) in the dev
 * Firebase project. Set them in .env (local) or as GitHub secrets (CI) —
 * never in the test code: the repository is public.
 */
export const E2E_EMAIL = process.env.E2E_EMAIL ?? '';
export const E2E_PASSWORD = process.env.E2E_PASSWORD ?? '';
export const hasCredentials = !!E2E_EMAIL && !!E2E_PASSWORD;
export const NO_CREDENTIALS = 'E2E_EMAIL / E2E_PASSWORD not set — see tests/README.md';

/** Every document the tests create starts with this prefix, so leftovers can be found and removed. */
export const E2E_PREFIX = '[E2E]';

/** A unique, recognisable title for one test run. */
export const e2eTitle = (what: string) => `${E2E_PREFIX} ${what} ${Date.now()}-${Math.floor(Math.random() * 1e4)}`;

/** Local date as YYYY-MM-DD (never toISOString — that would be UTC). */
export const localDate = (offsetDays = 0) => {
	const d = new Date();
	d.setDate(d.getDate() + offsetDays);
	const pad = (n: number) => String(n).padStart(2, '0');
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
