import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import {
	PRIVATE_BREVO_API_KEY,
	PRIVATE_BREVO_REDIRECTION_URL,
	PRIVATE_BREVO_LIST,
	PRIVATE_RECAPTCHA_SECRET_KEY,
} from '$env/static/private';

// Bots that fill in every field they find are caught by the honeypot; the rest
// are filtered by the reCaptcha score. Same approach as the contact form.
const RECAPTCHA_THRESHOLD = 0.5;

// Deliberately permissive: this only rejects input that cannot be an address.
// Deciding whether an address is real is the double opt-in mail's job.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateRecaptcha = async (token: string): Promise<{ success: boolean; error?: string }> => {
	if (!PRIVATE_RECAPTCHA_SECRET_KEY) {
		console.error('PRIVATE_RECAPTCHA_SECRET_KEY not found in environment variables');
		return { success: false, error: 'Server configuration error' };
	}

	try {
		const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				secret: PRIVATE_RECAPTCHA_SECRET_KEY,
				response: token,
			}),
		});

		const data = await response.json();

		if (!data.success) {
			console.error('reCaptcha validation failed:', data['error-codes']);
			return { success: false, error: 'reCaptcha validation failed' };
		}

		const score = data.score || 0;
		if (score < RECAPTCHA_THRESHOLD) {
			console.warn(`reCaptcha score too low: ${score}`);
			return { success: false, error: 'Security check failed' };
		}

		return { success: true };
	} catch (error) {
		console.error('reCaptcha validation error:', error);
		return { success: false, error: 'Security validation failed' };
	}
};

export const actions = {
	subscribe: async ({ request }) => {
		const data = await request.formData();
		const firstName = data.get('firstName')?.toString() || '';
		const lastName = data.get('lastName')?.toString() || '';
		const email = data.get('email')?.toString();
		const recaptchaToken = data.get('recaptcha_token')?.toString();

		// Honeypot check - if the hidden field is filled, it's likely a bot.
		// Report success so the bot does not learn it was blocked.
		const honeypot = data.get('website')?.toString();
		if (honeypot) {
			console.warn('Newsletter signup rejected: honeypot filled');
			return {
				success: true,
				message: 'Please check your email to confirm your subscription.',
			};
		}

		if (!email) {
			return fail(400, {
				error: true,
				message: 'Email is required',
			});
		}

		if (!EMAIL_PATTERN.test(email)) {
			return fail(400, {
				error: true,
				message: 'Please enter a valid email address.',
			});
		}

		if (!recaptchaToken) {
			return fail(400, {
				error: true,
				message: 'Security validation failed. Please try again.',
			});
		}

		const recaptchaResult = await validateRecaptcha(recaptchaToken);
		if (!recaptchaResult.success) {
			return fail(400, {
				error: true,
				message: recaptchaResult.error || 'Security validation failed. Please try again.',
			});
		}

		const options = {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				'api-key': PRIVATE_BREVO_API_KEY,
			},
			body: JSON.stringify({
				attributes: { FirstName: firstName, LastName: lastName },
				includeListIds: [+PRIVATE_BREVO_LIST],
				email: email,
				templateId: 9,
				redirectionUrl: PRIVATE_BREVO_REDIRECTION_URL,
			}),
		};

		try {
			const response = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', options);

			const responseText = await response.text();

			// If we got a 204 No Content or other success status, return success
			if (response.ok) {
				return {
					success: true,
					message: 'Please check your email to confirm your subscription.',
				};
			}

			// Try to parse error response if exists
			let result;
			try {
				result = responseText ? JSON.parse(responseText) : { message: 'Unknown error' };
			} catch (_) {
				return fail(response.status, {
					error: true,
					message: `Server error (${response.status}): ${responseText || 'No response body'}`,
				});
			}

			return fail(response.status, {
				error: true,
				message: `Failed to subscribe: ${result.message || 'Unknown error'}`,
			});
		} catch (_) {
			return fail(500, {
				error: true,
				message: 'An unexpected error occurred. Please try again later.',
			});
		}
	},
} satisfies Actions;
