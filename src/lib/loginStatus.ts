import { persisted } from 'svelte-persisted-store';

export const loginStatus = persisted('login', {
	isLogged: false,
	userData: {},
	authKey: ''
});
