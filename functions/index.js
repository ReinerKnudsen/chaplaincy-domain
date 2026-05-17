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

// *****************************************************************************
// Make user admin
// *****************************************************************************

exports.changeUserRole = functions.https.onCall(async (data, context) => {
	// Add protection: only admins can change roles
	// Special case: allow if there are no admins yet (for initial setup)
	const admins = await admin.auth().listUsers(1000);
	const adminCount = admins.users.filter((user) => user.customClaims && user.customClaims.role === 'admin').length;

	if (adminCount > 0 && (!context.auth || context.auth.token.role !== 'admin')) {
		throw new functions.https.HttpsError('permission-denied', 'Only admins can change roles.');
	}

	try {
		let user;
		if (!data.uid && !data.email) {
			throw new functions.https.HttpsError('invalid-argument', 'Must provide a valid UID or email.');
		}

		if (!data.role) {
			throw new functions.https.HttpsError('invalid-argument', 'Must provide a role to assign.');
		}

		if (data.uid) {
			user = await admin.auth().getUser(data.uid);
		} else if (data.email) {
			user = await admin.auth().getUserByEmail(data.email);
		}

		await admin.auth().setCustomUserClaims(user.uid, { role: data.role });
		return {
			message: `Success! User now has the role ${data.role}.`,
		};
	} catch (error) {
		console.error('Error setting user role:', error);
		if (error instanceof functions.https.HttpsError) throw error;
		throw new functions.https.HttpsError('internal', 'Failed to set user role.');
	}
});

// *****************************************************************************
// Get user profile
// *****************************************************************************

exports.getUserProfile = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
	}

	// Only allow users to see their own profile or allow admins to see any profile
	if (context.auth.uid !== data.uid && context.auth.token.role !== 'admin') {
		throw new functions.https.HttpsError('permission-denied', 'You can only retrieve your own profile.');
	}

	try {
		const user = await admin.auth().getUser(data.uid);
		return {
			user: {
				uid: user.uid,
				email: user.email,
				displayName: user.displayName,
				role: user.customClaims ? user.customClaims.role : null,
			},
		};
	} catch (error) {
		throw new functions.https.HttpsError('internal', error.message, error);
	}
});

// *****************************************************************************
// Update user profile
// *****************************************************************************

exports.updateUserProfile = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
	}

	// Only allow users to update their own profile OR allow admins to update any
	const isAdmin = context.auth.token.role === 'admin';
	if (context.auth.uid !== data.uid && !isAdmin) {
		throw new functions.https.HttpsError('permission-denied', 'You can only update your own profile.');
	}

	// If a role is being set, only admins can do that
	if (data.role && !isAdmin) {
		throw new functions.https.HttpsError('permission-denied', 'Only admins can change user roles.');
	}

	try {
		const user = await admin.auth().getUser(data.uid);
		const updateData = {
			displayName: data.displayName,
			email: data.email,
		};

		await admin.auth().updateUser(user.uid, updateData);

		if (data.role && isAdmin) {
			await admin.auth().setCustomUserClaims(user.uid, {
				role: data.role,
			});
		}

		return {
			message: `Success! User profile updated.`,
		};
	} catch (error) {
		throw new functions.https.HttpsError('internal', error.message);
	}
});

// *****************************************************************************
// List all users
// *****************************************************************************
exports.listUsers = functions.https.onCall((data, context) => {
	// Check if the user is an admin or if there are no users yet
	if (!context.auth || context.auth.token.role !== 'admin') {
		// We might allow listing if we're doing the first-time setup, 
		// but usually listUsers should be admin-only.
		throw new functions.https.HttpsError('permission-denied', 'Only admins can list users');
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
			console.error('Error listing users:', error);
			throw new functions.https.HttpsError('internal', 'Error listing users');
		});
});

// *****************************************************************************
// Create new user without password and initiate password reset
// *****************************************************************************
exports.createUser = functions.https.onCall(async (data, context) => {
	// Only admins can create new users via this function
	if (!context.auth || context.auth.token.role !== 'admin') {
		throw new functions.https.HttpsError('permission-denied', 'Only admins can create new users.');
	}

	try {
		const user = await admin.auth().createUser({
			email: data.email,
			displayName: data.displayName,
		});
		await admin.auth().setCustomUserClaims(user.uid, {
			role: data.role || 'user',
		});
		return user;
	} catch (error) {
		throw new functions.https.HttpsError('internal', error.message, error);
	}
});

exports.getCountOfAdmins = functions.https.onCall(async (data, context) => {
	// Allow any authenticated user to check admin count (needed for first-admin logic)
	// or relax further if needed, but at least authenticate.
	if (!context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
	}
	
	const admins = await admin.auth().listUsers(1000);
	const adminCount = admins.users.filter((user) => user.customClaims && user.customClaims.role === 'admin').length;
	return { count: adminCount };
});

