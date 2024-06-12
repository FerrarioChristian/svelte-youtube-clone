<nav>
	<div class="logo-container">
		<div class="hamburger-menu">
			<a class="icon">
				<span class="material-symbols-outlined"> menu </span>
			</a>
		</div>
		<a href="/">
			<img src="/youtube_logo.svg" alt="youtube logo" />
		</a>
	</div>

	<div class="middle-section">
		<div class="searchbar">
			<input type="text" placeholder="Cerca" />
			<a class="icon">
				<span class="material-symbols-outlined"> search </span>
			</a>
		</div>
		<a class="icon icon-background">
			<span class="material-symbols-outlined"> mic </span>
		</a>
	</div>
	<a href="/" class="icon">
		<span class="material-symbols-outlined"> notifications </span>
	</a>
	<a href="/" class="icon">
		<span class="material-symbols-outlined">
			<span class="material-symbols-outlined"> video_call </span>
		</span>
	</a>
	<a href="/login" class="icon">
		<span class="material-symbols-outlined"> account_circle </span>
	</a>
</nav>

<style>
	nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-right: 2rem;
	}

	img {
		cursor: pointer;
		height: 1.3rem;
		margin-left: 1rem;
	}

	span {
		font-weight: 250;
	}

	.icon {
		color: black;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		margin: 0.5rem;
		width: 2.5rem;
		height: 2.5rem;
		cursor: pointer;
		flex-shrink: 0;
		text-decoration: none;
	}

	.icon-background {
		background-color: #eee;
		margin: 0;
		margin-left: 1rem;
	}

	.icon:hover {
		background-color: #ddd;
	}

	.logo-container {
		min-width: 246px;
		display: flex;
		align-items: center;
	}

	.hamburger-menu {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 4rem;
	}

	.searchbar {
		justify-content: center;
		align-items: center;
		display: flex;
		flex-basis: 37rem;
		height: 2.5rem;
		border-radius: 3rem;
		padding-left: 2rem;
		border: 1px solid #ccc;
	}

	.middle-section {
		display: flex;
		margin-right: auto;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
	}

	input {
		background-color: transparent;
		border: none;
		flex-grow: 1;
		font-size: medium;
	}
	input:focus {
		outline: none;
	}
</style>
