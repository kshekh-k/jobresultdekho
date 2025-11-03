// src/routes/+page.ts
import type { PageLoad } from './$types';
import { getLatestAdmissions } from '$lib/api/admission';
import { getLatestAdmitCards } from '$lib/api/admit-card';
import { getLatestAnswerKeys } from '$lib/api/answer-key';
import { getHotJobs } from '$lib/api/job';
import { getLatestJobs } from '$lib/api/job';
import { getLatestResults } from '$lib/api/result';
import { getLatestSyllabus } from '$lib/api/syllabus';
import { getCategoryTree } from '$lib/api/category';

export async function load({ fetch }: { fetch: typeof window.fetch }) {
	const latestAdmissions = await getLatestAdmissions(fetch);
	const latestAdmitCards = await getLatestAdmitCards(fetch);
	const latestAnswerKeys = await getLatestAnswerKeys(fetch);
	const hotJobs = await getHotJobs(fetch);
  	const latestJobs = await getLatestJobs(fetch);
	const latestResults = await getLatestResults(fetch);
	const latestSyllabus = await getLatestSyllabus(fetch);
	const categoryTree = await getCategoryTree(fetch);
	
  	return { 
		latestAdmissions, 
		latestAdmitCards, 
		latestAnswerKeys,
		hotJobs,
		latestJobs, 
		latestResults, 
		latestSyllabus,
		categoryTree
	};
}