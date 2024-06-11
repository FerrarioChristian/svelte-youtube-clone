import { persisted } from 'svelte-persisted-store';

export const likedVideos = persisted('likedVideos', []);
