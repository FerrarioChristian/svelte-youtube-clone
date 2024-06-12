<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import CommentItem from './CommentItem.svelte';
	import type { Comment } from '$lib/types';
	import { browser } from '$app/environment';

	let page = 0;
	let comments: Comment[] = [];
	let hasMore = true;

	const fetchComments = async () => {
		const res = await fetch(`https://dummyjson.com/posts?limit=3&skip=${page * 3}`);
		const result = await res.json();
		const newComments: Comment[] = result.posts;

		if (newComments.length === 0) {
			hasMore = false;
		} else {
			comments = [...comments, ...newComments];
		}
	};

	const onScroll = () => {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
		const offset = scrollHeight - clientHeight - scrollTop;

		if (offset <= 0 && hasMore) {
			page++;
			fetchComments();
		}
	};

	if (browser) {
		onMount(() => {
			window.addEventListener('scroll', onScroll);
			fetchComments();
		});

		onDestroy(() => {
			window.removeEventListener('scroll', onScroll);
		});
	}
</script>

<h3>Commenti</h3>
<div>
	{#if comments.length > 0}
		{#each comments as comment}
			<CommentItem {comment} />
		{/each}
	{:else}
		<p>Loading comments...</p>
	{/if}
</div>

<style>
	h3 {
		margin: 0;
		margin-top: 3rem;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		padding-block: 2rem;
	}
</style>
