const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// *****************************************************************************************
// Add user role
// *****************************************************************************************

exports.setUserRole = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError(
			'unauthenticated',
			'The function must be called while authenticated.'
		);
	}

	try {
		let user;
		if (data.uid) {
			user = await admin.auth().getUser(data.uid);
		} else if (data.email) {
			user = await admin.auth().getUserByEmail(data.email);
		} else {
			throw new functions.https.HttpsError(
				'invalid-argument',
				'Must provide a valid UID or email.'
			);
		}
		console.log('User identified: ', user);
		if (!data.role) {
			throw new functions.https.HttpsError('invalid-argument', 'Must provide a role to assign.');
		}

		await admin.auth().setCustomUserClaims(user.uid, { role: data.role });
		return {
			message: `Success! User now has the role ${data.role}.`
		};
	} catch (error) {
		console.error('Error setting user role:', error);
		throw new functions.https.HttpsError('internal', 'Failed to set user role.', error);
	}
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
				role: user.customClaims?.role
				// add any other user properties you want to return
			}
		};
	} catch (error) {
		throw new functions.https.HttpsError('internal', error.message, error);
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
		await admin.auth().setCustomUserClaims(user.uid, {
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
