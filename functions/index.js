const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// *****************************************************************************************
// Add user role
// *****************************************************************************************

exports.addUserRole = functions.https.onCall(async (data, context) => {
	console.log('Entered AddUserRole');
	let user;
	if (data.uid) {
		user = await admin.auth().getUser(data.uid);
	} else if (data.email) {
		console.log('Email (add user role): ', data.email);
		user = await admin.auth().getUserByEmail(data.email);
	}
	console.log('User (add user role): ', user);
	await admin.auth().setCustomUserClaims(user.uid, { role: data.role });
	return {
		message: `Success! User now has the role ${data.role}.`
	};
});

// *****************************************************************************************
// Get user profile
// *****************************************************************************************

exports.getUserProfile = functions.https.onCall(async (data, context) => {
	try {
		const user = await admin.auth().getUser(data.uid);
		return {
			user: {
				uid: user.uid,
				email: user.email,
				displayName: user.displayName,
				role: user.customClaims.role
				// add any other user properties you want to return
			}
		};
	} catch (error) {
		return error;
	}
});

// *****************************************************************************************
// Update user profile
// *****************************************************************************************

exports.updateUserProfile = functions.https.onCall(async (data, context) => {
	// update (depending on the updated data in "data")
	// - name
	// - email
	// - role

	try {
		const user = await admin.auth().getUser(data.uid);
		await admin.auth().updateUser(user.uid, {
			displayName: data.displayName,
			email: data.email
		});
		return {
			message: `Success! User profile updated.`
		};
	} catch (error) {
		return error;
	}
});

// *****************************************************************************************
// Get all users
// *****************************************************************************************

exports.getAllUsers = functions.https.onRequest((req, res) => {
	const maxResults = 20; // optional arg.

	admin
		.auth()
		.listUsers(maxResults)
		.then((userRecords) => {
			userRecords.users.forEach((user) => console.log(user.toJSON()));
			res.end('Retrieved users list successfully.');
			return userRecords;
		})
		.catch((error) => console.log(error));
});
