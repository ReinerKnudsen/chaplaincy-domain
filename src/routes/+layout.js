import { doc, getDoc } from 'firebase/firestore';
import { settingsColRef } from '$lib/firebase/firebaseConfig';

let routes;

export const load = async () => {
	await loadRouteData();
	return { routes };
};

const loadRouteData = async () => {
	const refDoc = doc(settingsColRef, 'routes');
	const response = await getDoc(refDoc);
	routes = response.data();
};
