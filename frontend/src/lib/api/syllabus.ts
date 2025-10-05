// src/lib/api/syllabus.ts
import type { Page } from "@sveltejs/kit";
import { apiGet } from "./client";

export interface Syllabus {
  id: number;
  title: string;
  department?: string;
  category?: string;
  last_date: string;
  slug?: string;
  description: string;
  content: string;
}

export async function getLatestSyllabus(customFetch?: typeof fetch): Promise<Syllabus> {
  return await apiGet<Syllabus>(`/syllabus/latest`, customFetch);
}

export async function getSyllabusBySlug(slug: string, customFetch?: typeof fetch): Promise<Syllabus> {
  return await apiGet<Syllabus>(`/syllabus/${slug}`, customFetch);
}



