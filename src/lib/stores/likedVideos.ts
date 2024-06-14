import type { LikedVideo } from '$lib/types';
import { persisted } from 'svelte-persisted-store';

export const likedVideos = persisted<LikedVideo[]>('likedVideos', []);
