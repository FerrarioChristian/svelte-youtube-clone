<script lang="ts">
	import type { PageData } from './$types';
	import { videos } from '$lib/homepageVideos';
	import VideoDetails from '../../../components/routes-components/watch/VideoDetails.svelte';
	import CommentSection from '../../../components/routes-components/watch/CommentSection.svelte';
	import LikedPlaylist from '../../../components/routes-components/watch/LikedPlaylist.svelte';

	export let data: PageData;

	let currentVideo = videos.find((video) => video.id === data.videoId);
	let currentChannel = data.users.find((channel) => channel.id === currentVideo?.channelId);
</script>

<div class="main-container">
	{#if !currentVideo || !currentChannel}
		<h1>Video not found</h1>
	{:else}
		<main class="video-main-container">
			<div class="video-container">
				<iframe
					title="YouTube video player"
					src={`https://www.youtube.com/embed/${currentVideo.id}`}
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
			<VideoDetails {currentVideo} {currentChannel} />
			<CommentSection />
			<!-- {currentVideo} {currentChannel} /> -->
		</main>

		<div class="right-panel">
			<LikedPlaylist />
		</div>
	{/if}
</div>

<style>
	.main-container {
		display: flex;
		gap: 3rem;
		flex-grow: 1;
		align-items: flex-start;
	}

	.video-main-container {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		flex-grow: 0;
	}

	.right-panel {
		flex-basis: 60rem;
		max-width: 30rem;
		flex-shrink: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-self: stretch;
	}

	.video-container {
		flex-grow: 0;
		position: relative;
		padding-bottom: 56.25%;
		width: 100%;
		border-radius: 1rem;
		overflow: hidden;
	}

	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
