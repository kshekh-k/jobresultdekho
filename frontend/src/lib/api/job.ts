// src/lib/api/job.ts
import type { Page } from "@sveltejs/kit";
import { apiGet } from "./client";

export interface Job {
  id: number;
  title: string;
  slug?: string;
  description: string;
  content: string;
}

export async function getJobBySlug(slug: string, customFetch?: typeof fetch): Promise<Job> {
  return await apiGet<Job>(`/jobs/${slug}`, customFetch);
}



