<script lang="ts">
	import { goto } from '$app/navigation';
	import { videos } from '$lib/homepageVideos';
	import { likedVideos } from '$lib/stores/likedVideos';
	import { loginStatus } from '$lib/stores/loginStatus';
	import type { LikedVideo, User } from '$lib/types';
	import { get } from 'svelte/store';
	import VideoPreview from '../../components/common/VideoPreview.svelte';

	let currentUser = get(loginStatus).userData;

	$: if (!currentUser) {
		alert('Devi essere loggato per vedere i tuoi video piaciuti');
		goto('/login');
	}

	$: videosLiked = videos.filter((vid) =>
		$likedVideos.some((liked) => liked.likerId === currentUser?.id && liked.videoId === vid.id)
	);

	const dislike = (id: string) => {
		likedVideos.update((vids: LikedVideo[]) => {
			return vids.filter((vid) => !(vid.likerId === currentUser?.id && vid.videoId === id));
		});
	};

	const getUserById = async (id: number) => {
		try {
			const res = await fetch(`http://dummyjson.com/users/${id}`);
			const data: User = await res.json();
			return data;
		} catch (error) {
			console.error(error);
		}
	};
</script>

<h1>Liked Videos</h1>

{#if videosLiked.length === 0}
	<p>Playlist vuota</p>
{:else}
	<div class="liked-container">
		{#each videosLiked as video}
			{#await getUserById(video.channelId) then user}
				<VideoPreview {user} />
			{:catch}
				<p>Errore nel caricamento del video</p>
			{/await}
		{/each}
	</div>
{/if}

<style>
	.liked-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
		padding: 1rem;
	}
</style>
