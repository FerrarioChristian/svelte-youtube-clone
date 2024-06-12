import type { User } from '$lib/types';
import { persisted } from 'svelte-persisted-store';

export const loginStatus = persisted('login', {
	isLogged: false,
	userData: {} as User,
	authKey: ''
});
