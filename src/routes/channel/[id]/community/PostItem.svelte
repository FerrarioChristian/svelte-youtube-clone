<script>
	export let post;
</script>

<article>
	<div class="tags-container">
		{#each post.tags as tag}
			<div>#{tag}</div>
		{/each}
	</div>
	<h2>{post.title}</h2>
	<p>{post.body}</p>
	<div class="interactions-container">
		<div class="icon">
			<span class="material-symbols-outlined"> thumb_up </span>
			{post.reactions.likes}
		</div>
		<div class="icon">
			<span class="material-symbols-outlined"> thumb_down </span>
			{post.reactions.dislikes}
		</div>
		<div class="icon">
			<span class="material-symbols-outlined"> chat </span>
			{post.views}
		</div>
	</div>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		min-width: 30rem;
		flex-basis: 0;
		flex-grow: 1;
		border-radius: 1rem;
		border: 1px solid #aaa;
		padding: 1rem;
	}

	.tags-container {
		display: flex;
		gap: 0.5rem;
	}

	p {
		flex-grow: 1;
	}

	h2 {
		margin: 0;
	}

	.tags-container * {
		color: cornflowerblue;
		margin-block: 0.5rem;
		cursor: pointer;
	}

	.icon {
		display: flex;
		gap: 0.3rem;
		justify-content: center;
		align-items: center;
		border-radius: 1rem;
		cursor: pointer;
		text-decoration: none;
		padding: 0.5rem;
	}

	.icon:hover {
		background-color: #ccc;
	}

	.interactions-container {
		display: flex;
		gap: 0.5rem;
	}
</style>
