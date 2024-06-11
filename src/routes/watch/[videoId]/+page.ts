import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return { videoId: params.videoId };
	//error(404, 'Not found');
};
