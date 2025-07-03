import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	PRIVATE_BREVO_API_KEY,
	PRIVATE_BREVO_REDIRECTION_URL,
	PRIVATE_BREVO_LIST,
} from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { firstName, lastName, email } = await request.json();

		const options = {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				'api-key': PRIVATE_BREVO_API_KEY,
			},
			body: JSON.stringify({
				attributes: { FirstName: firstName || '', LastName: lastName || '' },
				includeListIds: [+PRIVATE_BREVO_LIST],
				email: email,
				templateId: 9,
				redirectionUrl: PRIVATE_BREVO_REDIRECTION_URL,
			}),
		};

		if (!email) {
			return json(
				{
					error: true,
					message: 'Email is required',
				},
				{ status: 400 }
			);
		}

		const response = await fetch(
			'https://api.brevo.com/v3/contacts/doubleOptinConfirmation',
			options,
		);

		const responseText = await response.text();

		// If we got a 204 No Content or other success status, return success
		if (response.ok) {
			return json({
				success: true,
				message: 'Please check your email to confirm your subscription.',
			});
		}

		// Try to parse error response if exists
		let result;
		try {
			result = responseText ? JSON.parse(responseText) : { message: 'Unknown error' };
		} catch (_) {
			return json(
				{
					error: true,
					message: `Server error (${response.status}): ${responseText || 'No response body'}`,
				},
				{ status: response.status }
			);
		}

		return json(
			{
				error: true,
				message: `Failed to subscribe: ${result.message || 'Unknown error'}`,
			},
			{ status: response.status }
		);
	} catch (error) {
		return json(
			{
				error: true,
				message: 'An unexpected error occurred. Please try again later.',
			},
			{ status: 500 }
		);
	}
};
