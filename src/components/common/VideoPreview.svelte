<script lang="ts">
	import { videos } from '$lib/homepageVideos';
	import type { User } from '$lib/types/index';
	export let user: User;
</script>

<article class="video-container">
	<a class="thumbnail" href="/watch/{videos[user.id - 1].id}">
		<img
			class="thumbnail-image"
			src={`https://img.youtube.com/vi_webp/${videos[user.id - 1].id}/mqdefault.webp`}
			alt="thumbnail"
		/>
	</a>
	<div class="video-details-container">
		<a href="/channel/{user.id}"> <img class="channel-pro-pic" src={user.image} alt="channel" /></a>
		<div class="details-container">
			<div class="video-title">{videos[user.id - 1].title}</div>
			<div class="channel-name">{user.username}</div>
		</div>
	</div>
</article>

<style>
	.video-container {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
	}

	.video-details-container {
		display: flex;
		padding: 0.5rem;
		margin-right: auto;
		margin-top: 0.3rem;
	}

	.details-container {
		margin-left: 1rem;
	}

	.thumbnail-image {
		width: 100%;
		height: 100%;
		min-width: 320px;
		min-height: 180px;
		border-radius: 0.5rem;
		background-color: #ccc;
		object-fit: fill;
	}

	.thumbnail {
		width: 100%;
	}

	.channel-pro-pic {
		border-radius: 50%;
		width: 36px;
		height: 36px;
		border: 1px solid #aaa;
	}

	.video-title {
		text-decoration: none;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}
	.channel-name {
		font-size: small;
	}
</style>
