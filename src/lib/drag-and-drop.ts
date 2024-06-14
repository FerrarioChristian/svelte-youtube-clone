import { videos } from './homepageVideos';

export function draggable(node: HTMLElement, data: number) {
	let state = data;

	node.draggable = true;
	node.style.cursor = 'grab';
	for (const child of node.children) {
		child.style.pointerEvents = 'none';
	}

	function handle_dragstart(e: DragEvent) {
		if (!e.dataTransfer) return;
		e.dataTransfer.setData('text/plain', state.toString());
	}

	function handle_dragenter(e: DragEvent) {
		e.preventDefault();
		if (!(e.target instanceof HTMLElement)) return;
	}

	function handle_dragleave(e: DragEvent) {
		e.preventDefault();
		if (!(e.target instanceof HTMLElement)) return;
		node.style.paddingTop = '0';
	}

	function handle_dragover(e: DragEvent) {
		e.preventDefault();
	}

	function handle_drop(e: DragEvent) {
		e.preventDefault();
		node.style.paddingTop = '0';
	}

	node.addEventListener('dragstart', handle_dragstart);
	node.addEventListener('dragenter', handle_dragenter);
	node.addEventListener('dragleave', handle_dragleave);
	node.addEventListener('dragover', handle_dragover);
	node.addEventListener('drop', handle_drop);

	return {
		update(data: number) {
			state = data;
		},

		destroy() {
			node.removeEventListener('dragstart', handle_dragstart);
			node.removeEventListener('dragenter', handle_dragenter);
			node.removeEventListener('dragleave', handle_dragleave);
			node.removeEventListener('dragover', handle_dragover);
			node.removeEventListener('drop', handle_drop);
		}
	};
}

export function dropzone(node: HTMLElement, options) {
	let state = {
		dropEffect: 'move',
		...options
	};

	function handle_dragleave(e: DragEvent) {
		if (!(e.target instanceof HTMLElement)) return;
	}

	function handle_dragenter(e: DragEvent) {
		if (!(e.target instanceof HTMLElement)) return;
	}

	function handle_dragover(e: DragEvent) {
		e.preventDefault();
		if (!e.dataTransfer) return;
		e.dataTransfer.dropEffect = state.dropEffect;

		console.log('event', e);
		console.log('node', node);
	}

	function handle_drop(e: DragEvent) {
		e.preventDefault();
		if (!e.dataTransfer) return;
		const data = e.dataTransfer.getData('text/plain');
		const video = videos.find((video) => video.channelId.toString() === data);
		console.log(e.target);
		console.log(video);
		if (!(e.target instanceof HTMLElement)) return;
		state.on_dropzone(data, e);
	}

	node.addEventListener('dragenter', handle_dragenter);
	node.addEventListener('dragleave', handle_dragleave);
	node.addEventListener('dragover', handle_dragover);
	node.addEventListener('drop', handle_drop);

	return {
		update(options) {
			state = {
				dropEffect: 'move',
				...options
			};
		},

		destroy() {
			node.removeEventListener('dragenter', handle_dragenter);
			node.removeEventListener('dragleave', handle_dragleave);
			node.removeEventListener('dragover', handle_dragover);
			node.removeEventListener('drop', handle_drop);
		}
	};
}
