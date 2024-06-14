<script lang="ts">
	import { onMount } from 'svelte';
	import type { User } from '$lib/types';
	import { loginStatus } from '$lib/stores/loginStatus';
	import { myComments } from '$lib/stores/myComments';

	export let comment;
	$: user = {} as User;

	let readmore = false;
	let showMenu = false;
	let isEditing = false;

	let commentBackup = comment.body;

	const fetchUser = async () => {
		const res = await fetch(`https://dummyjson.com/users/${comment.userId}`);
		const result = await res.json();
		user = result;
	};

	onMount(() => {
		fetchUser();
	});

	const submitEditedComment = () => {
		myComments.update((comments) => comments.map((c) => (c.id === comment.id ? comment : c)));
		isEditing = false;
	};

	const cancelEdit = () => {
		comment.body = commentBackup;
		isEditing = false;
	};

	const handleEditComment = () => {
		showMenu = false;
		isEditing = !isEditing;
	};

	const handleShowMenu = () => {
		showMenu = !showMenu;
	};

	const handleDeleteComment = () => {
		myComments.update((comments) => comments.filter((c) => c.id !== comment.id));
		showMenu = false;
	};
</script>

<div class="comment-container">
	<img src={user.image} alt="" />
	<div class="comment-body-container">
		<p class="channel-name">@{user.username}</p>
		{#if !isEditing}
			<p class={readmore ? 'read-more' : 'read-less'}>
				{comment.body}
			</p>
			<button class="read-more-button" on:click={() => (readmore = !readmore)}>Leggi tutto</button>
		{:else}
			<textarea bind:value={comment.body} name="comment"></textarea>
			<div class="button-container">
				<button class="cancel-button" on:click={cancelEdit}>Annulla</button>
				<button class="submit-button" on:click={submitEditedComment} disabled={!comment.body.length}
					>Invia</button
				>
			</div>
		{/if}
	</div>
	{#if comment.userId === $loginStatus.userData?.id && !isEditing}
		<button
			class="material-symbols-outlined more-button"
			on:click={handleShowMenu}
			on:blur={() => {
				setTimeout(() => {
					showMenu = false;
				}, 100);
			}}
		>
			more_vert
		</button>
		<div class="hidden-menu" hidden={!showMenu}>
			<button on:click={handleEditComment}
				><span class="material-symbols-outlined"> edit </span>Modifica</button
			>
			<button on:click={handleDeleteComment}
				><span class="material-symbols-outlined"> delete </span>Elimina</button
			>
		</div>
	{/if}
</div>

<style>
	.comment-container {
		position: relative;
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

	.hidden-menu {
		display: flex;
		flex-direction: column;
		position: absolute;
		right: 0;
		top: 0;
		background-color: white;
		border-radius: 0.5rem;
	}

	.hidden-menu button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		flex-grow: 1;
		margin: 0;
		padding: 1rem;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.hidden-menu button:hover {
		background-color: #f1f1f1;
	}

	[hidden] {
		display: none;
	}

	.more-button {
		cursor: pointer;
		margin-left: auto;
		margin-bottom: auto;
		background-color: transparent;
		border: none;
	}

	textarea {
		width: 100%;
		height: 1rem;
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

	.comment-body-container {
		width: 100%;
	}

	.button-container {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}

	.cancel-button {
		padding: 0.6rem 0.8rem;
		border-radius: 1.5rem;
		border: none;
		cursor: pointer;
		background-color: transparent;
	}

	.cancel-button:hover {
		background-color: #cccc;
	}

	.submit-button {
		padding: 0.6rem 1.8rem;
		border-radius: 1.5rem;
		border: none;
		cursor: pointer;
		background-color: #063fff;
		color: white;
	}

	.submit-button:hover {
		background-color: #0556bf;
	}

	.submit-button:disabled {
		background-color: #aaa;
	}

	.read-more-button {
		background-color: transparent;
		font-weight: bold;
		color: #777;
		border: none;
		cursor: pointer;
		margin: 0;
		padding: 0;
	}
</style>
