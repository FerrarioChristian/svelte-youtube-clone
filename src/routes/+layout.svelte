<script>
	import LeftBar from './LeftBar.svelte';
	import NavBar from './NavBar.svelte';
</script>

<NavBar />
<div class="main-container">
	<LeftBar />
	<div class="page-container"><slot></slot></div>
</div>

<style>
	.main-container {
		display: flex;
	}

	.page-container {
		padding-inline: 2rem;
		flex-grow: 1;
	}
</style>
