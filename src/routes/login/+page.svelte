<script lang="ts">
	import { loginStatus } from '$lib/stores/loginStatus';
	import { onDestroy } from 'svelte';

	let username: string;
	let password: string;

	let isLogged: boolean;

	const unsubscribe = loginStatus.subscribe((value) => {
		isLogged = value.isLogged;
	});

	onDestroy(unsubscribe);

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
				throw new Error('Login failed');
			}

			const data = await response.json();

			await loginStatus.update((status) => ({
				...status,
				authKey: data.token,
				userData: data,
				isLogged: true
			}));
		} catch (error) {
			console.error(error);
			await loginStatus.update((status) => ({
				isLogged: false,
				authKey: '',
				userData: {}
			}));
		}
	};

	const logout = () => {
		loginStatus.update(() => ({ isLogged: false, authKey: '', userData: {} }));
	};
</script>

<h1>Login</h1>
<form class="log-form">
	{#if !isLogged}
		<input type="text" title="username" placeholder="username" bind:value={username} />
		<input type="password" title="username" placeholder="password" bind:value={password} />
		<button type="submit" class="btn" on:click={login}>Login</button>
	{:else}
		<button type="submit" class="btn" on:click={logout}>Logout</button>
	{/if}
</form>

<style>
	.log-form {
		display: flex;
		flex-direction: column;
		max-width: 20rem;
		gap: 1rem;
	}

	input {
		height: 2rem;
	}

	button {
		height: 2rem;
	}
</style>
