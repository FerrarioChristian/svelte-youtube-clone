import { loginStatus } from '$lib/stores/loginStatus';

const login = async () => {
	try {
		const response = await fetch('https://dummyjson.com/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username,
				password
			})
		});

		if (!response.ok) {
			throw new Error('Login failed ## TODO');
		}

		const data = await response.json();

		await loginStatus.update(() => ({
			authKey: data.token,
			userData: data,
			isLogged: true
		}));
	} catch (error) {
		console.error(error);
		await loginStatus.update(() => ({
			isLogged: false
		}));
	}
};

const logout = () => {
	loginStatus.update(() => ({ isLogged: false }));
};
