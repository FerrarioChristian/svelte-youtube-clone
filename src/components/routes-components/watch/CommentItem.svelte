<script lang="ts">
	import { onMount } from 'svelte';
	import type { User } from '$lib/types';
	import { loginStatus } from '$lib/stores/loginStatus';
	import { get } from 'svelte/store';

	export let comment;
	$: user = {} as User;

	let readmore = false;

	let loginStatusData = get(loginStatus);

	onMount(async () => {
		if (comment.userId === 0) {
			user = loginStatusData.userData;
		} else {
			const res = await fetch(`https://dummyjson.com/users/${comment.userId}`);
			const result = await res.json();
			user = result;
		}
	});
</script>

<div class="comment-container">
	<img src={user.image} alt="" />
	<div>
		<p class="channel-name">@{user.username}</p>
		<p class={readmore ? 'read-more' : 'read-less'}>{comment.body}</p>
		<button on:click={() => (readmore = !readmore)}>Leggi tutto</button>
	</div>
	<span class="material-symbols-outlined"> more_vert </span>
</div>

<style>
	.comment-container {
		display: flex;
		gap: 1rem;
	}

	img {
		border-radius: 50%;
		width: 3rem;
		height: 3rem;
		border: 1px solid #aaa;
		margin: 0;
	}

	.channel-name {
		margin: 0;
		font-size: small;
		font-weight: bold;
	}

	.read-less {
		margin: 0;
		margin-block: 0.5rem;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 5;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

	.read-more {
		margin: 0;
		margin-block: 0.5rem;
	}

	button {
		background-color: transparent;
		font-weight: bold;
		color: #777;
		border: none;
		cursor: pointer;
		margin: 0;
		padding: 0;
	}

	span {
		margin-left: auto;
	}
</style>
