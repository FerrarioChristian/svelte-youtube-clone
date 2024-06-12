<script lang="ts">
	import { myComments } from '$lib/stores/myComments';
	import type { Comment } from '$lib/types';

	let body = '';

	const cancel = () => {
		body = '';
	};

	const comment = () => {
		myComments.update((comments: Comment[]) => [
			{
				id: Math.floor(Math.random() * 1000 + 200),
				body,
				userId: 0
			},
			...comments
		]);
		body = '';
	};
</script>

<div class="new-comment-container">
	<img src="/pro-pic.png" alt="" />
	<div class="text-buttons-container">
		<textarea bind:value={body} name="comment"></textarea>
		<div class="button-container">
			<button on:click={cancel}>Annulla</button>
			<button on:click={comment}>Commenta</button>
		</div>
	</div>
</div>

<style>
	img {
		border-radius: 50%;
		width: 3rem;
		height: 3rem;
		border: 1px solid #aaa;
		margin: 0;
	}

	.new-comment-container {
		display: flex;
		gap: 1rem;
	}

	.text-buttons-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.button-container {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}

	button {
		padding: 0.6rem 0.8rem;
		border-radius: 1.5rem;
		border: none;
		cursor: pointer;
	}

	button:first-child {
		background-color: transparent;
	}
	button:first-child:hover {
		background-color: #cccc;
	}

	button:last-child {
		background-color: #063fff;
		color: white;
	}

	button:last-child:hover {
		background-color: #0556bf;
	}

	textarea {
		height: 1rem;
		width: 100%;
		padding: 0.5rem;
		border: none;
		background-color: transparent;
		resize: none;
		border-bottom: #aaa 1px solid;
	}

	textarea:focus {
		outline: none;
		border-bottom: 2px solid black;
	}
</style>
