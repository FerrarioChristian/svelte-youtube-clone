<script lang="ts">
	import type { PageData } from './$types';
	import { subscriptions } from '$lib/subscriptions';

	export let data: PageData;

	const handleSubscribe = () => {
		subscriptions.update((subs: number[]) => {
			return subs.includes(data.user.id)
				? subs.filter((id) => id !== data.user.id)
				: [...subs, data.user.id];
		});
	};
</script>

<img src={data.user.image} alt="" />
<h1>{data.user.firstName} {data.user.lastName}</h1>
<h2>@{data.user.username}</h2>

{#if $subscriptions.includes(data.user.id)}
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
