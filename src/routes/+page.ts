import type { PageLoad } from './$types';
import type { User } from '$lib/types';
export const load: PageLoad = async ({ fetch }) => {
	type Result = {
		users: User[];
	};

	const res = await fetch(`https://dummyjson.com/users`);
	const result: Result = await res.json();

	return { users: result.users };
};
