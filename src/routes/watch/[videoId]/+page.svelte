<script lang="ts">
	import type { PageData } from './$types';
	import { videos } from '$lib/homepageVideos';
	import VideoDetails from '../../../components/routes-components/watch/VideoDetails.svelte';
	import CommentSection from '../../../components/routes-components/watch/CommentSection.svelte';

	export let data: PageData;

	let currentVideo = videos.find((video) => video.id === data.videoId);
	let currentChannel = data.users.find((channel) => channel.id === currentVideo?.channelId);
</script>

{#if !currentVideo || !currentChannel}
	<h1>Video not found</h1>
{:else}
	<main class="main-container">
		<div class="video-container">
			<iframe
				title="YouTube video player"
				src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
		<VideoDetails {currentVideo} {currentChannel} />
		<CommentSection />
		<!-- {currentVideo} {currentChannel} /> -->
	</main>
{/if}

<style>
	.main-container {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.video-container {
		flex-grow: 1;
		position: relative;
		padding-bottom: 56.25%;
		height: 100%;
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
