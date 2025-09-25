// src/lib/api/answer-key.ts
import type { Page } from "@sveltejs/kit";
import { apiGet } from "./client";

export interface AnswerKey {
  id: number;
  title: string;
  slug?: string;
  description: string;
  content: string;
}

export async function getAnswerKeyBySlug(slug: string, customFetch?: typeof fetch): Promise<AnswerKey> {
  return await apiGet<AnswerKey>(`/pages/${slug}`, customFetch);
}



