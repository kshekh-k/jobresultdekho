// src/lib/api/result.ts
import type { Page } from "@sveltejs/kit";
import { apiGet } from "./client";

export interface Result {
  id: number;
  title: string;
  department?: string;
  category?: string;
  last_date: string;
  slug?: string;
  description: string;
  content: string;
}

export async function getLatestResults(customFetch?: typeof fetch): Promise<Result> {
  return await apiGet<Result>(`/results/latest`, customFetch);
}

export async function getResultBySlug(slug: string, customFetch?: typeof fetch): Promise<Result> {
  return await apiGet<Result>(`/results/${slug}`, customFetch);
}



