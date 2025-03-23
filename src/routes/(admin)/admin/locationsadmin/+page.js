import { getDocs } from 'firebase/firestore';
import { locationColRef } from '$lib/firebase/firebaseConfig';

export const load = async () => {
	let snapshot = await getDocs(locationColRef);
	if (snapshot) {
		let locations = snapshot.docs.map((location) => {
			return {
				id: location.id,
				data: location.data(),
			};
		});
		return { locations };
	}
	console.log('Error loading locations');
};
