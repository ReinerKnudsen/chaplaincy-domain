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

exports.setAdminRole = functions.https.onRequest(async (req, res) => {
	// Überprüfen, ob es eine POST-Anfrage ist
	cors(req, res, async () => {
		try {
			if (req.method !== 'POST') {
				return res.status(400).send('Only POST requests are accepted');
			}
			// Email-Adresse aus der Anfrage entnehmen
			const email = req.body.email;
			if (!email) {
				return res.status(400).send('Email is required');
			}
			try {
				const user = await admin.auth().getUserByEmail(email);
				// Benutzerrolle setzen (Admin)
				await admin.auth().setCustomUserClaims(user.uid, { role: 'Admin' });

				return res.status(200).send(`Success! ${email} is now an Admin.`);
			} catch (error) {
				return res.status(500).send(error.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
});

exports.changeUserRole = functions.https.onRequest((req, res) => {
	cors(req, res, async () => {
		try {
			let user;
			const data = req.body; // hole die Daten aus dem Request-Body

			if (data.uid) {
				user = await admin.auth().getUser(data.uid);
			} else if (data.email) {
				user = await admin.auth().getUserByEmail(data.email);
			} else {
				return res.status(400).send('Must provide a valid UID or email.');
			}

			if (!data.role) {
				return res.status(400).send('Must provide a role to assign.');
			}

			await admin.auth().setCustomUserClaims(user.uid, { role: data.role });
			res.status(200).send({ message: `Success! User now has the role ${data.role}.` });
		} catch (error) {
			console.error('Error setting user role:', error);
			res.status(500).send('Failed to set user role.');
		}
	});
});

// *****************************************************************************************
// Add user role
// *****************************************************************************************

exports.setUserRole = functions.https.onCall(async (data, context) => {
	return new Promise((resolve, reject) => {
		cors(async (req, res) => {
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
				if (!data.role) {
					throw new functions.https.HttpsError(
						'invalid-argument',
						'Must provide a role to assign.'
					);
				}

				await admin.auth().setCustomUserClaims(user.uid, { role: data.role });
				return {
					message: `Success! User now has the role ${data.role}.`
				};
			} catch (error) {
				console.error('Error setting user role:', error);
				throw new functions.https.HttpsError('internal', 'Failed to set user role.', error);
			}
		})(data, context);
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
				role: user.customClaims.role
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

exports.updateUserProfile = functions.https.onCall(async (data) => {
	try {
		const user = await admin.auth().getUser(data.uid);
		await admin.auth().updateUser(user.uid, {
			displayName: data.displayName,
			email: data.email
		});
		if (data.role) {
			await admin.auth().setCustomUserClaims(user.uid, {
				role: data.role
			});
			return {
				message: `Success! User profile updated.`
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
			displayName: data.displayName
		});
		await admin.auth().setCustomUserClaims(user.uid, {
			role: data.role
		});
		return user;
	} catch (error) {
		throw new functions.https.HttpsError('internal', error.message, error);
	}
});
