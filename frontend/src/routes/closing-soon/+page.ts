import type { PageLoad } from './$types';
import { getClosingSoonJobs } from '$lib/api/job';

export const load: PageLoad = async ({ fetch }) => {
	try {
		// Fetch up to 100 qualifying jobs for complete pagination on the permanent page
		const jobs = await getClosingSoonJobs({ pageSize: 100 }, fetch);
		return { jobs };
	} catch (err) {
		console.error('Failed to load closing soon jobs:', err);
		return { jobs: [] };
	}
};
