import { writable } from 'svelte/store';

const initialUserState = {
	firstname: '',
	lastname: '',
	displayname: '',
	email: '',
	role: '',
	city: '',
	isAdmin: false
};

export const userStore = writable(initialUserState);

export const resetUserStore = () => {
	userStore.set(initialUserState);
};
