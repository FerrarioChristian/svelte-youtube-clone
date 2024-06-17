<script lang="ts">
	import type { User, Video } from '$lib/types';

	export let user: User;
	export let video: Video;
</script>

<a href={video.id} class="item-container" draggable="true" on:drag id={video.id} on:drop>
	<img src="https://img.youtube.com/vi_webp/{video.id}/mqdefault.webp" alt="" />
	<div class="details-container">
		<h2>{video.title}</h2>
		<p>@{user.username}</p>
	</div>
</a>

<style>
	.item-container {
		max-height: 5rem;
		display: flex;
		border-radius: 0.5rem;
		background-color: #f9f9f9;
		text-decoration: none;
		color: black;
		gap: 1rem;
		margin: 0.5rem 0;
	}

	.item-container:hover {
		background-color: #f0f0f0;
	}

	.details-container {
		min-width: 20rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		justify-content: flex-start;
	}

	img {
		border-radius: 0.5rem;
		object-fit: cover;
		flex: 1 1 auto;
		max-height: 100%;
	}
	h2 {
		margin: 0;
		padding: 0;
		margin-top: 0.5rem;
		font-size: 1em;
		font-weight: 500;
	}
	p {
		margin: 0;
		padding: 0;
		font-size: 0.8em;
	}
</style>
