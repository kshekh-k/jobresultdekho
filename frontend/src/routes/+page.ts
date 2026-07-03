// src/routes/+page.ts
import type { PageLoad } from './$types';
import { getLatestAdmissions } from '$lib/api/admission';
import { getLatestAdmitCards } from '$lib/api/admit-card';
import { getLatestAnswerKeys } from '$lib/api/answer-key';
import { getHotPosts, getHighAlertPosts, getLatestJobs } from '$lib/api/job';
import { getLatestResults } from '$lib/api/result';
import { getLatestSyllabus } from '$lib/api/syllabus';
import { getCategoryTree } from '$lib/api/category';

export async function load({ fetch }: { fetch: typeof window.fetch }) {
	// Run all fetches in parallel; a failed API call returns null instead of throwing.
	const [
		latestAdmissions,
		latestAdmitCards,
		latestAnswerKeys,
		hotPosts,
		highAlertPosts,
		latestJobs,
		latestResults,
		latestSyllabus,
		categoryTree,
	] = await Promise.allSettled([
		getLatestAdmissions(fetch),
		getLatestAdmitCards(fetch),
		getLatestAnswerKeys(fetch),
		getHotPosts(fetch),
		getHighAlertPosts(fetch),
		getLatestJobs(fetch),
		getLatestResults(fetch),
		getLatestSyllabus(fetch),
		getCategoryTree(fetch),
	]).then(results => results.map(r => (r.status === 'fulfilled' ? r.value : null)));

	return {
		latestAdmissions,
		latestAdmitCards,
		latestAnswerKeys,
		hotPosts,
		highAlertPosts,
		latestJobs,
		latestResults,
		latestSyllabus,
		categoryTree,
	};
}

