// src/lib/api/job.ts
import type { Page } from '@sveltejs/kit';
import { apiGet } from './client';
import { filterClosingSoonJobs, getClosingSoonDateRange } from '$lib/closingSoon';

export interface Job {
	id: number;
	title: string;
	department?: any;
	category?: any;
	last_date: string;
	slug?: string;
	short_description?: string;
	content?: string;
	total_posts?: number;
	reference_url?: string;
	Link_not_available?: boolean;
	Start_date?: boolean;
	Apply_date_Start_message?: string;
	target?: string;
	createdAt?: string;
	updatedAt?: string;
	created_at?: string;
	updated_at?: string;
	stage?: string;
}

export async function getHotPosts(customFetch?: typeof fetch): Promise<Job> {
	return await apiGet<Job>(`/jobs/hot-posts`, customFetch);
}

export async function getHighAlertPosts(customFetch?: typeof fetch): Promise<Job> {
	return await apiGet<Job>(`/jobs/high-alert`, customFetch);
}

export async function getLatestJobs(customFetch?: typeof fetch): Promise<Job> {
	return await apiGet<Job>(`/jobs/latest`, customFetch);
}

export async function getJobBySlug(slug: string, customFetch?: typeof fetch): Promise<Job> {
	return await apiGet<Job>(`/jobs/${slug}`, customFetch);
}

export async function searchJobs(
	params: { q?: string; page?: number; pageSize?: number },
	customFetch?: typeof fetch
): Promise<{ data: Job[]; meta: any }> {
	const { q = '', page = 1, pageSize = 20 } = params;
	if (!q) return { data: [], meta: {} };

	const query = new URLSearchParams();
	query.set('q', q);
	query.set('page', String(page));
	query.set('pageSize', String(pageSize));

	// ✅ Call your custom backend route
	return await apiGet<{ data: Job[]; meta: any }>(`/jobs/search?${query.toString()}`, customFetch);
}

/**
 * Fetch published job posts closing within the next 7 days, including today.
 * Dynamically queries the public Strapi API and applies type-safe date normalization,
 * filtering, deduplication, and sorting (earliest closing date first).
 */
export async function getClosingSoonJobs(
	params?: { page?: number; pageSize?: number },
	customFetch?: typeof fetch
): Promise<Job[]> {
	const { page = 1, pageSize = 50 } = params || {};
	const { todayStr, endDateStr } = getClosingSoonDateRange();

	const query = new URLSearchParams();
	query.set('filters[stage][$eq]', 'Job');
	query.set('filters[last_date][$gte]', todayStr);
	query.set('filters[last_date][$lte]', endDateStr);
	query.set('sort[0]', 'last_date:asc');
	query.set('fields[0]', 'title');
	query.set('fields[1]', 'slug');
	query.set('fields[2]', 'last_date');
	query.set('fields[3]', 'total_posts');
	query.set('fields[4]', 'reference_url');
	query.set('fields[5]', 'Link_not_available');
	query.set('fields[6]', 'Start_date');
	query.set('fields[7]', 'Apply_date_Start_message');
	query.set('populate[department][fields][0]', 'title');
	query.set('populate[department][fields][1]', 'slug');
	query.set('populate[category][fields][0]', 'title');
	query.set('populate[category][fields][1]', 'slug');
	query.set('pagination[page]', String(page));
	query.set('pagination[pageSize]', String(pageSize));

	try {
		const rawData = await apiGet<any>(`/jobs?${query.toString()}`, customFetch);
		const jobsList: Job[] = Array.isArray(rawData)
			? rawData
			: Array.isArray(rawData?.data)
				? rawData.data
				: [];

		return filterClosingSoonJobs(jobsList);
	} catch (err) {
		console.error('Error fetching closing soon jobs:', err);
		return [];
	}
}
