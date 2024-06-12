<script lang="ts">
	import { videos } from '$lib/homepageVideos';
	import { likedVideos } from '$lib/stores/likedVideos';
	import VideoPreview from '../../components/common/VideoPreview.svelte';

	$: videosLiked = videos.filter((vid) => $likedVideos.includes(vid.id));

	const dislike = async (id: string) => {
		likedVideos.update((vid: string[]) => {
			return vid.filter((vid) => vid !== id);
		});
	};
</script>

<h1>Liked Videos</h1>

{#if videosLiked.length === 0}
	<p>Non sei iscritto a nessun canale</p>
{:else}
	<div class="liked-container">
		{#each videosLiked as video}
			<h1>{video.title}</h1>
		{/each}
	</div>
{/if}
