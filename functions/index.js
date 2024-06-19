const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// *****************************************************************************************
// Add user role
// *****************************************************************************************

exports.addUserRole = functions.https.onCall(async (data, context) => {
	let user;
	if (data.uid) {
		user = await admin.auth().getUser(data.uid);
	} else if (data.email) {
		user = await admin.auth().getUserByEmail(data.email);
	}
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
			displayName: data.firstname + '_' + data.lastname,
			email: data.email
		});
		await admin
			.auth()
			.setCustomUserClaims(user.uid, {
				firstname: data.firstname,
				lastname: data.lastname,
				role: data.role
			});
		return {
			message: `Success! User profile updated.`
		};
	} catch (error) {
		return error;
	}
});

// *****************************************************************************************
// List all users
// *****************************************************************************************
exports.listUsers = functions.https.onCall((data, context) => {
	// Check if the user is an admin.
	if (context.auth.token.role !== 'admin') {
		return { error: 'Only admins can list users' };
	}

	return admin
		.auth()
		.listUsers()
		.then((listUsersResult) => {
			let users = [];
			listUsersResult.users.forEach((userRecord) => {
				users.push(userRecord.toJSON());
			});
			return { users: users };
		})
		.catch((error) => {
			console.log('Error listing users:', error);
			return { error: 'Error listing users' };
		});
});
