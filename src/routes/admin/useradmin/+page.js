import { getDocs } from 'firebase/firestore';
import { userColRef } from '$lib/firebase/firebaseConfig';

export const load = async () => {
	let snapshot = await getDocs(userColRef);
	let users = snapshot.docs.map((user) => {
		return {
			id: user.id,
			data: user.data()
		};
	});
	console.log(users);
	return { users };
};
