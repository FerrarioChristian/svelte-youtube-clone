<script lang="ts">
	import { subscriptions } from '$lib/stores/subscriptions';

	export let currentVideo;
	export let currentChannel;

	const handleSubscribe = () => {
		subscriptions.update((subs: number[]) => {
			return subs.includes(currentChannel.id)
				? subs.filter((id) => id !== currentChannel.id)
				: [...subs, currentChannel.id];
		});
	};
</script>

<h1 class="video-title">{currentVideo.title}</h1>
<div class="video-details-container">
	<div class="channel-details">
		<a href="/channel/{currentChannel.id}">
			<img class="channel-pro-pic" src={currentChannel.image} alt="channel" /></a
		>
		<div class="details-container">
			<div class="channel-name">{currentChannel.username}</div>
			<div class="channel-subscribers">{currentChannel.age} iscritti</div>
		</div>
		{#if $subscriptions.includes(currentChannel.id)}
			<button on:click={handleSubscribe}>Disiscriviti</button>
		{:else}
			<button on:click={handleSubscribe}>Iscriviti</button>
		{/if}
		<div class="buttons-container">
			<button>Like</button>
			<button>Dislike</button>
			<button>Condividi</button>
		</div>
	</div>
</div>

<style>
	.video-details-container {
		display: flex;
		flex-grow: 1;
	}

	.video-title {
		width: 100%;
		font-size: 1.5rem;
		text-align: left;
	}

	.channel-details {
		display: flex;
		align-items: center;
		flex-grow: 1;
		gap: 1rem;
	}

	.channel-details img {
		border-radius: 50%;
		width: 3rem;
		height: 3rem;
		border: 1px solid #aaa;
		margin: 0;
	}

	.channel-details button {
		background-color: #ededed;
		border: none;
		cursor: pointer;
	}
	.channel-details button:hover {
		background-color: #ddd;
	}

	.channel-name {
		font-weight: bold;
	}

	button {
		font-size: medium;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 1rem;
		margin: 0.5rem;
	}

	.buttons-container {
		display: flex;
		flex-grow: 1;
		justify-content: end;
	}
</style>
