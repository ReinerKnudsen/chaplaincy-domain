import { getUserByID } from '../../../../../lib/services/authService.js';

export async function load({ params }) {
	const user = await getUserByID(params.userID);
	return { user };
}
