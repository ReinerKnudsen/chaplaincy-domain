import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { E2E_EMAIL, E2E_PASSWORD, E2E_PREFIX, hasCredentials } from './helpers/env';

/**
 * Safety net: removes every news item and event whose title starts with
 * `[E2E]` — e.g. when a test failed before it could delete what it created.
 * Uses the same client SDK and the same Firestore rules as the app.
 */
export default async function globalTeardown() {
	if (!hasCredentials || !process.env.VITE_PROJECTID) return;

	const app = initializeApp(
		{
			apiKey: process.env.VITE_APIKEY,
			authDomain: process.env.VITE_AUTHDOMAIN,
			projectId: process.env.VITE_PROJECTID,
			appId: process.env.VITE_APPID,
		},
		'e2e-teardown'
	);
	try {
		await signInWithEmailAndPassword(getAuth(app), E2E_EMAIL, E2E_PASSWORD);
		const db = getFirestore(app);
		let removed = 0;
		for (const name of ['news', 'events']) {
			const leftovers = await getDocs(
				query(collection(db, name), where('title', '>=', E2E_PREFIX), where('title', '<', E2E_PREFIX + ''))
			);
			await Promise.all(leftovers.docs.map((d) => deleteDoc(d.ref)));
			removed += leftovers.size;
		}
		if (removed) console.warn(`[e2e teardown] removed ${removed} leftover test document(s)`);
	} catch (err) {
		console.warn('[e2e teardown] cleanup failed:', err);
	} finally {
		await deleteApp(app);
	}
}
