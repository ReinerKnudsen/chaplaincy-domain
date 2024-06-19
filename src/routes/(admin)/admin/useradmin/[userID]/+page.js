import { getUserByID } from '$lib/services/authservice';

export async function load({ params }) {
	const user = await getUserByID(params.userID);
	console.log(user);
	return { user };
}
