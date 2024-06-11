import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const res = await fetch(`https://dummyjson.com/users/${params.id}`);
	const user = await res.json();

	return { user };
};
