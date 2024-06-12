import { persisted } from 'svelte-persisted-store';

import type { Comment } from '$lib/types';

export const myComments = persisted<Comment[]>('myComments', []);
