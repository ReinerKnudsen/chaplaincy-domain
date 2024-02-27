// This is a protected route, only accessible to authenticated users.

import { authStore } from '$lib/stores/AuthStore';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	const unsubscribe = authStore.subscribe((user) => {
		if (!authStore.user) {
			throw redirect(302, '/login');
		}
	});

	unsubscribe();
	return {};
};
