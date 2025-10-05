// src/routes/+page.ts
import type { PageLoad } from './$types';
import { getLatestJob } from '$lib/api/job';

export async function load({ fetch }: { fetch: typeof window.fetch }) {
  	const latestJobs = await getLatestJob(fetch);
  	const latestJobss = [
		{
			id: 1,
			department: 'SSC',
			label: 'SSC CPO SI Online Form 2025 – Start',
			date: '15/10/2025',
			timeLeft: '15 days',
			href: '/post/one',
			target: '_blank'
		}
	];
  	return { latestJobs };
}