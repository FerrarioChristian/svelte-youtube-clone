<div class="left-bar">
	<a href="/" class="icon">
		<span class="material-symbols-outlined"> home </span>
		<p>Home</p>
	</a>
	<a href="/" class="icon">
		<span class="material-symbols-outlined"> play_circle </span>
		<p>Shorts</p>
	</a>
	<a href="/subscriptions" class="icon">
		<span class="material-symbols-outlined"> subscriptions </span>
		<p>Iscrizioni</p>
	</a>
	<a href="/liked" class="icon">
		<span class="material-symbols-outlined"> video_library </span>
		<p>Tu</p>
	</a>
</div>

<style>
	.left-bar {
		display: flex;
		flex-direction: column;
		width: 4rem;
		align-items: center;
	}

	.icon {
		color: black;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 1rem;
		width: 4rem;
		height: 5rem;
		cursor: pointer;
		text-decoration: none;
		gap: 0.5rem;
	}

	span {
		font-size: 1.5rem;
		font-weight: 300;
	}

	.icon:hover {
		background-color: #eee;
	}

	p {
		margin: 0;
		font-size: x-small;
	}
</style>
