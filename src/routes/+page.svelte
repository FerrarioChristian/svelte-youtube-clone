<script lang="ts">
	import VideoPreview from '$lib/VideoPreview.svelte';
	import CategoryChips from './CategoryChips.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<CategoryChips />
<section class="video-section">
	{#each data.users as user}
		<VideoPreview {user} />
	{/each}
</section>

<style>
	.video-section {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 3rem;
	}
</style>
