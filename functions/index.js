const functions = require('firebase-functions');
const admin = require('firebase-admin');

const app = admin.initializeApp();

exports.addUserRole = functions.https.onCall(async (data, context) => {
	const user = await admin.auth().getUser(data.uid);
	await admin.auth().setCustomUserClaims(user.uid, { role: data.role });
	return {
		message: `Success! User now has the role ${data.role}.`
	};
});
