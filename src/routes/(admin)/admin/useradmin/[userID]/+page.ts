import { error } from '@sveltejs/kit';
import { getUserByID } from '$lib/services/authService';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		const user = await getUserByID(params.userID);
		if (!user) {
			throw error(404, 'User not found');
		}
		return { user };
	} catch (err) {
		console.error('Error loading user:', err);
		throw error(500, 'Could not load user');
	}
};
