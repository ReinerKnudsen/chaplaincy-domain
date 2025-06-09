import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { PRIVATE_BREVO_API_KEY, PRIVATE_BREVO_REDIRECTION_URL } from '$env/static/private';

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
				includeListIds: [5],
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
			const result = await response.json();

			if (!response.ok) {
				return fail(400, {
					error: true,
					message: `Failed to subscribe: ${result.message || 'Unknown error'}`,
				});
			}

			return {
				success: true,
				message: 'Please check your email to confirm your subscription.',
			};
		} catch (error) {
			console.error('Newsletter subscription error:', error);
			return fail(500, {
				error: true,
				message: 'Failed to subscribe. Please try again later.',
			});
		}
	},
} satisfies Actions;
