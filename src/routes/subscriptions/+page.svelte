<script lang="ts">
	import { subscriptions } from '$lib/stores/subscriptions';

	export let data;
	$: subscribedChannels = data.users.filter((user) => $subscriptions.includes(user.id));

	const unsubscribe = async (id: number) => {
		subscriptions.update((subs: number[]) => {
			return subs.filter((sub) => sub !== id);
		});
	};
</script>

<h1>Subscriptions</h1>

{#if subscribedChannels.length === 0}
	<p>Non sei iscritto a nessun canale</p>
{:else}
	<div class="subscriptions-container">
		{#each subscribedChannels as subscription}
			<div class="subscription-card">
				<a href="/channel/{subscription.id}" class="clickable-subscription">
					<img src={subscription.image} alt="channel" />
					<h2>{subscription.firstName} {subscription.lastName}</h2>
					<h3>@{subscription.username}</h3>
					<p>Sei iscritto a questo canale</p>
				</a>
				<button on:click={() => unsubscribe(subscription.id)}>Disiscriviti</button>
			</div>
		{/each}
	</div>
{/if}

<style>
	.clickable-subscription {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		color: black;
	}

	.subscriptions-container {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
	}

	.subscription-card {
		flex-grow: 1;
		max-width: 14rem;
		display: flex;
		flex-direction: column;
		border-radius: 2rem;
		padding: 2rem;
		border: 1px solid #aaa;
	}

	img {
		border-radius: 50%;
		border: 1px solid #aaa;
		margin: 1rem;
		margin-bottom: 2rem;
	}

	h2 {
		font-size: larger;
		margin: 0;
		margin-bottom: 0.3rem;
	}

	h3 {
		font-size: medium;
		margin: 0;
		margin-bottom: 1rem;
		font-weight: 600;
	}

	p {
		margin: 0;
		margin-bottom: 1rem;
	}

	button {
		background-color: red;
		color: white;
		padding: 0.8rem;
		border: none;
		cursor: pointer;
		width: 100%;
		border-radius: 1rem;
	}

	button:hover {
		background-color: darkred;
	}
</style>
