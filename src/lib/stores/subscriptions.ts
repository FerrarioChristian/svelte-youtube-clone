import type { Subscription } from '$lib/types';
import { persisted } from 'svelte-persisted-store';

export const subscriptions = persisted<Subscription[]>('subscriptions', []);
