<script lang="ts">
	import { subscriptions } from '$lib/stores/subscriptions';
	import { likedVideos } from '$lib/stores/likedVideos';
	import { loginStatus } from '$lib/stores/loginStatus';
	import { get } from 'svelte/store';
	import { onDestroy } from 'svelte';
	import type { LikedVideo, Subscription } from '$lib/types';
	import { goto } from '$app/navigation';

	export let currentVideo;
	export let currentChannel;
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
				return subs.some(
					(sub) => sub.subscriberId === user!.id && sub.channelId === currentChannel.id
				)
					? subs.filter(
							(sub) => !(sub.subscriberId === user!.id && sub.channelId === currentChannel.id)
						)
					: [...subs, { subscriberId: user!.id, channelId: currentChannel.id }];
			});
		}
	};

	const handleLike = () => {
		if (!user) {
			alert('Devi essere loggato per iscriverti a un canale');
			goto('/login');
		} else {
		}
		likedVideos.update((vids: LikedVideo[]) => {
			console.log(user);
			return vids.some((vid) => vid.likerId === user!.id && vid.videoId === currentVideo.id)
				? vids.filter((vid) => !(vid.likerId === user!.id && vid.videoId === currentVideo.id))
				: [...vids, { likerId: user!.id, videoId: currentVideo.id }];
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
		{#if user && $subscriptions.some((sub) => sub.subscriberId === user?.id && sub.channelId === currentChannel.id)}
			<button on:click={handleSubscribe}>Disiscriviti</button>
		{:else}
			<button on:click={handleSubscribe}>Iscriviti</button>
		{/if}

		<div class="buttons-container">
			{#if user && $likedVideos.some((vid) => vid.likerId === user?.id && vid.videoId === currentVideo.id)}
				<button on:click={handleLike}>Rimuovi like</button>
			{:else}
				<button on:click={handleLike}>Like</button>
			{/if}
			<button>Condividi</button>
		</div>
	</div>
</div>

<style>
	.video-details-container {
		display: flex;
		flex-grow: 0;
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
