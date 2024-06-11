import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const res = await fetch(`https://dummyjson.com/posts/user/${params.id}`);
	const result = await res.json();

	return { posts: result.posts };
};
