import { getDocs } from 'firebase/firestore';
import { locationColRef } from '$lib/firebase/firebaseConfig';
import type { LocationItem } from '$lib/stores/LocationsStore';

export const load = async () => {
	let snapshot = await getDocs(locationColRef);
	if (snapshot) {
		let locations = snapshot.docs.map((doc) => {
			const data = doc.data();
			return {
				id: doc.id,
				name: data.name,
				description: data.description,
				street: data.street,
				city: data.city,
				zip: data.zip,
				openMapUrl: data.openMapUrl,
			} satisfies LocationItem;
		});
		return { locations };
	}
	console.log('Error loading locations');
	return { locations: [] };
};
