import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import {
	PRIVATE_BREVO_API_KEY,
	PRIVATE_BREVO_REDIRECTION_URL,
	PRIVATE_BREVO_LIST,
} from '$env/static/private';

export const actions = {
	subscribe: async ({ request }) => {
		const data = await request.formData();
		const firstName = data.get('firstName')?.toString() || '';
		const lastName = data.get('lastName')?.toString() || '';
		const email = data.get('email')?.toString();

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

		if (!email) {
			return fail(400, {
				error: true,
				message: 'Email is required',
			});
		}

		try {
			const response = await fetch(
				'https://api.brevo.com/v3/contacts/doubleOptinConfirmation',
				options,
			);

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
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (_) {
			return fail(500, {
				error: true,
				message: 'An unexpected error occurred. Please try again later.',
			});
		}
	},
} satisfies Actions;
