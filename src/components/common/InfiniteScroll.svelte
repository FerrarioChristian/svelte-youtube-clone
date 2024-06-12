<script>
	import { onDestroy, createEventDispatcher } from 'svelte';

	export let hasMore = true;

	const dispatch = createEventDispatcher();
	let isLoadMore = false;

	$: {
		document.addEventListener('scroll', onScroll);
	}

	const onScroll = () => {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
		const offset = scrollHeight - clientHeight - scrollTop;

		if (offset <= 10) {
			if (!isLoadMore && hasMore) {
				dispatch('loadMore');
			}
			isLoadMore = true;
		} else {
			isLoadMore = false;
		}
	};

	onDestroy(() => {
		document.removeEventListener('scroll', onScroll);
	});
</script>
