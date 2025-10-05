// src/routes/+page.ts
import type { PageLoad } from './$types';
import { getLatestAdmissions } from '$lib/api/admission';
import { getLatestAdmitCards } from '$lib/api/admit-card';
import { getLatestAnswerKeys } from '$lib/api/answer-key';
import { getLatestJobs } from '$lib/api/job';
import { getLatestResults } from '$lib/api/result';
import { getLatestSyllabus } from '$lib/api/syllabus';

export async function load({ fetch }: { fetch: typeof window.fetch }) {
	const latestAdmissions = await getLatestAdmissions(fetch);
	const latestAdmitCards = await getLatestAdmitCards(fetch);
	const latestAnswerKeys = await getLatestAnswerKeys(fetch);
  	const latestJobs = await getLatestJobs(fetch);
	const latestResults = await getLatestResults(fetch);
	const latestSyllabus = await getLatestSyllabus(fetch);
	
  	return { 
		latestAdmissions, 
		latestAdmitCards, 
		latestAnswerKeys, 
		latestJobs, 
		latestResults, 
		latestSyllabus 
	};
}