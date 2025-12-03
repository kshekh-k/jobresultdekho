// src/lib/api/job.ts
import type { Page } from "@sveltejs/kit";
import { apiGet } from "./client";

export interface Job {
  id: number;
  title: string;
  department?: string;
  category?: string;
  last_date: string;
  slug?: string;
  short_description: string;
  content: string;
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
  const { q = "", page = 1, pageSize = 20 } = params;
  if (!q) return { data: [], meta: {} };

  const query = new URLSearchParams();
  query.set("q", q);
  query.set("page", String(page));
  query.set("pageSize", String(pageSize));

  // ✅ Call your custom backend route
  return await apiGet<{ data: Job[]; meta: any }>(
    `/jobs/search?${query.toString()}`,
    customFetch
  );
}





