<div class="chips-container">
	<a>Tutti</a>
	<a>Giochi</a>
	<a>Matematica</a>
	<a>Fitness</a>
	<a>Caricamenti recenti</a>
	<a>Guardati</a>
	<a>Novità per te</a>
</div>

<style>
	a {
		background-color: rgba(0, 0, 0, 0.05);
		padding-inline: 0.8rem;
		padding-block: 0.5rem;
		border-radius: 0.5rem;
		font-size: small;
		font-weight: bold;
		cursor: pointer;
	}

	a:first-of-type {
		background-color: black;
		color: white;
	}

	a:first-of-type:hover {
		background-color: black;
		color: white;
	}

	a:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

	.chips-container {
		display: flex;
		gap: 1rem;
		padding-block: 1rem;
	}
</style>
