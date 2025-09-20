// src/lib/api/page.ts
import type { Page } from "@sveltejs/kit";
import { apiGet } from "./client";

export interface PageData {
  id: number;
  title: string;
  slug?: string;
  description: string;
  content: string;
}

export async function getPageBySlug(slug: string, customFetch?: typeof fetch): Promise<PageData> {
  return await apiGet<PageData>(`/pages/${slug}`, customFetch);
}



