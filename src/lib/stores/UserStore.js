import { writable } from 'svelte/store';

const initialUserState = {
	firstname: '',
	lastname: '',
	displayname: '',
	email: '',
	role: '',
	city: ''
};

// The userStore holds the information of a user selected on the user admin page
export const userStore = writable(initialUserState);

export const resetUserStore = () => {
	userStore.set(initialUserState);
};
