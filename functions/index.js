/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable no-tabs */
/* eslint-disable indent */
/* eslint-disable max-len */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();
exports.testCORS = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		res.status(200).send('CORS-Test erfolgreich!');
	});
});

// *****************************************************************************************
// Make user admin
// *****************************************************************************************

exports.changeUserRole = functions.https.onRequest((req, res) => {
	cors(req, res, async () => {
		try {
			let user;
			const data = req.body.data; // hole die Daten aus dem Request-Body
			if (!data.uid && !data.email) {
				return res.status(400).send({
					data: {
						error: 'Must provide a valid UID or email.',
					},
				});
			}

			if (!data.role) {
				return res.status(400).send({
					data: {
						error: 'Must provide a role to assign.',
					},
				});
			}

			if (data.uid) {
				user = await admin.auth().getUser(data.uid);
			} else if (data.email) {
				user = await admin.auth().getUserByEmail(data.email);
			}
			await admin.auth().setCustomUserClaims(user.uid, { role: data.role });
			res.status(200).send({
				data: {
					message: `Success! User now has the role ${data.role}.`,
				},
			});
		} catch (error) {
			console.error('Error setting user role:', error);
			res.status(500).send({
				data: {
					error: 'Failed to set user role.',
				},
			});
		}
	});
});

// *****************************************************************************************
// Get user profile
// *****************************************************************************************

exports.getUserProfile = functions.https.onCall(async (data) => {
	try {
		const user = await admin.auth().getUser(data.uid);
		return {
			user: {
				uid: user.uid,
				email: user.email,
				displayName: user.displayName,
				role: user.customClaims.role,
				// add any other user properties you want to return
			},
		};
	} catch (error) {
		throw new functions.https.HttpsError('internal', error.message, error);
	}
});

// *****************************************************************************************
// Update user profile
// *****************************************************************************************

exports.updateUserProfile = functions.https.onCall(async (data) => {
	try {
		const user = await admin.auth().getUser(data.uid);
		await admin.auth().updateUser(user.uid, {
			displayName: data.displayName,
			email: data.email,
		});
		if (data.role) {
			await admin.auth().setCustomUserClaims(user.uid, {
				role: data.role,
			});
			return {
				message: `Success! User profile updated.`,
			};
		}
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
			const users = [];
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

// *****************************************************************************************
// Create new user without password and initiate password reset
// *****************************************************************************************
exports.createUser = functions.https.onCall(async (data) => {
	try {
		const user = await admin.auth().createUser({
			email: data.email,
			displayName: data.displayName,
		});
		await admin.auth().setCustomUserClaims(user.uid, {
			role: data.role,
		});
		return user;
	} catch (error) {
		throw new functions.https.HttpsError('internal', error.message, error);
	}
});

exports.getCountOfAdmins = functions.https.onCall(async (data, context) => {
	if (context.auth.token.role !== 'admin') {
		throw new functions.https.HttpsError('permission-denied', 'Only admins can access this data');
	}
	const admins = await admin.auth().listUsers(1000);
	const adminCount = admins.users.filter((user) => user.customClaims.role === 'admin').length;
	return adminCount;
});
