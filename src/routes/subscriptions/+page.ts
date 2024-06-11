import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch(`https://dummyjson.com/users`);
	const result = await res.json();

	return { users: result.users };
};
