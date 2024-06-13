import type { LoginStatus, User } from '$lib/types';
import { persisted } from 'svelte-persisted-store';

export const loginStatus = persisted<LoginStatus>('login', {
	isLogged: false,
	userData: {} as User,
	authKey: ''
});
