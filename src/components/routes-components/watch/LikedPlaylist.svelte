<script lang="ts">
	import { goto } from '$app/navigation';
	import { videos } from '$lib/homepageVideos';
	import { likedVideos } from '$lib/stores/likedVideos';
	import { loginStatus } from '$lib/stores/loginStatus';
	import type { User, Video } from '$lib/types';
	import { get } from 'svelte/store';
	import LikedPlaylistItem from './LikedPlaylistItem.svelte';
	import { onMount } from 'svelte';

	let currentUser = get(loginStatus).userData;

	let itemDragging: Video;

	let videosLiked: Video[] = [];

	let users: User[] = [];

	$: if (!currentUser) {
		alert('Devi essere loggato per vedere i tuoi video piaciuti');
		goto('/login');
	}

	$: {
		const tmp = $likedVideos.filter((liked) =>
			videos.some((vid) => liked.likerId === currentUser?.id && liked.videoId === vid.id)
		);
		videosLiked = tmp.flatMap((likedVideo) => {
			return videos
				.filter((vid) => vid.id === likedVideo.videoId)
				.map((vid) => ({ id: vid.id, title: vid.title, channelId: vid.channelId }));
		});
	}

	onMount(async () => {
		const res = await fetch(`http://dummyjson.com/users`);
		const data = await res.json();
		users = data.users;
		videosLiked = videosLiked;
	});

	const getUserById = (id: number) => {
		return users.find((user) => user.id === id);
	};

	const handleDrag = (e: DragEvent) => {
		const id = (e.target as HTMLElement).getAttribute('id');
		const video = videos.find((video) => video.id === id);
		if (!video) return;
		itemDragging = video;
	};

	const handleDrop = (videoId: string) => {
		likedVideos.update((videos) => {
			return videos.filter((video) => video.videoId !== itemDragging.id);
		});

		if (!videoId) return;

		const targetIndex = $likedVideos.map((video) => video.videoId).indexOf(videoId);

		likedVideos.update((videos) => {
			videos.splice(targetIndex, 0, { likerId: currentUser!.id, videoId: itemDragging.id });
			return videos;
		});
	};

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault();
	};
</script>

{#if videosLiked.length != 0}
	<div class="playlist-container" on:dragover={handleDragOver} role="listitem">
		<h2>Video piaciuti</h2>
		{#each videosLiked as video}
			{@const user = getUserById(video.channelId)}
			{#if user}
				<LikedPlaylistItem
					{user}
					{video}
					on:drag={handleDrag}
					on:drop={() => handleDrop(video.id)}
				/>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.playlist-container {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		border: 1px solid #ccc;
		border-radius: 1rem;
		padding: 1rem;
	}

	h2 {
		margin: 0;
		font-size: 1.2rem;
		font-weight: 700;
	}
</style>
