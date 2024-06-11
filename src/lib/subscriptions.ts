import { persisted } from 'svelte-persisted-store';

export const subscriptions = persisted<number[]>('subscriptions', []);
