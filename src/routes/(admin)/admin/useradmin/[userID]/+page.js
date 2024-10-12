import { getUserByID } from '../../../../../lib/services/authService.js';

export async function load({ params }) {
	try {
		const user = await getUserByID(params.userID);
		return { user };
	} catch (error) {
		console.log("Couldn't load user:", error);
	}
}
