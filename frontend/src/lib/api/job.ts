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

export async function getHotJobs(customFetch?: typeof fetch): Promise<Job> {
  return await apiGet<Job>(`/jobs/hot-posts`, customFetch);
}

export async function getLatestJobs(customFetch?: typeof fetch): Promise<Job> {
  return await apiGet<Job>(`/jobs/latest`, customFetch);
}

export async function getJobBySlug(slug: string, customFetch?: typeof fetch): Promise<Job> {
  return await apiGet<Job>(`/jobs/${slug}`, customFetch);
}



