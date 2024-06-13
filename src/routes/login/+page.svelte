<script lang="ts">
	import { goto } from '$app/navigation';
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
				throw new Error('Login failed ## TODO');
			}

			const data = await response.json();

			await loginStatus.update(() => ({
				authKey: data.token,
				userData: data,
				isLogged: true
			}));

			username = '';
			password = '';
			goto('/');
		} catch (error) {
			console.error(error);
			await loginStatus.update(() => ({
				isLogged: false
			}));
			username = '';
			password = '';
			goto('/');
		}
	};

	const logout = () => {
		loginStatus.update(() => ({ isLogged: false }));
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
