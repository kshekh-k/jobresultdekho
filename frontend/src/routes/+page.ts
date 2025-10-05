// src/routes/+page.ts
import type { PageLoad } from './$types';
import { getLatestJob } from '$lib/api/job';

export async function load({ fetch }: { fetch: typeof window.fetch }) {
  	const latestJobs = await getLatestJob(fetch);

  	return { latestJobs };
}