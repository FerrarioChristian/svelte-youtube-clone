<script lang="ts">
	import type { PageData } from './$types';
	import { loginStatus } from '$lib/stores/loginStatus';
	import { subscriptions } from '$lib/stores/subscriptions';
	import type { Subscription } from '$lib/types';
	import { get } from 'svelte/store';
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	let user = get(loginStatus).userData;

	const unsubscribe = loginStatus.subscribe((value) => {
		user = value.userData;
	});

	onDestroy(unsubscribe);

	const handleSubscribe = () => {
		if (!user) {
			alert('Devi essere loggato per iscriverti a un canale');
			goto('/login');
		} else {
			subscriptions.update((subs: Subscription[]) => {
				return subs.some((sub) => sub.subscriberId === user!.id && sub.channelId === data.user.id)
					? subs.filter((sub) => !(sub.subscriberId === user!.id && sub.channelId === data.user.id))
					: [...subs, { subscriberId: user!.id, channelId: data.user.id }];
			});
		}
	};
</script>

<img src={data.user.image} alt="" />
<h1>{data.user.firstName} {data.user.lastName}</h1>
<h2>@{data.user.username}</h2>

{#if user && $subscriptions.some((sub) => sub.subscriberId === user?.id && sub.channelId === data.user.id)}
	<p>Sei iscritto a questo canale</p>
	<button on:click={handleSubscribe}>Disiscriviti</button>
{:else}
	<p>Non sei iscritto a questo canale</p>
	<button on:click={handleSubscribe}>Iscriviti</button>
{/if}

<a href="/channel/{data.user.id}/community">Community</a>
<a href="/channel/{data.user.id}/information">Informazioni</a>

<style>
	img {
		border-radius: 50%;
		border: 1px solid #aaa;
	}
</style>
