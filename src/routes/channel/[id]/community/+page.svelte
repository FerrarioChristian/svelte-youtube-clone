<script lang="ts">
	import type { PageData } from './$types';
	import PostItem from '../../../../components/routes-components/channel/community/PostItem.svelte';

	export let data: PageData;
</script>

<h1>Post dell'utente</h1>
<section class="posts-container">
	{#if data.posts.length > 0}
		{#each data.posts as post}
			<PostItem {post} />
		{/each}
	{:else}
		<p>Nessun post da visualizzare.</p>
	{/if}
</section>

<style>
	.posts-container {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
