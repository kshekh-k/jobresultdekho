// src/lib/api/answer-key.ts
import type { Page } from "@sveltejs/kit";
import { apiGet } from "./client";

export interface AnswerKey {
  id: number;
  title: string;
  department?: string;
  category?: string;
  last_date: string;
  slug?: string;
  description: string;
  content: string;
}

export async function getLatestAnswerKeys(customFetch?: typeof fetch): Promise<AnswerKey> {
  return await apiGet<AnswerKey>(`/answer-keys/latest`, customFetch);
}

export async function getAnswerKeyBySlug(slug: string, customFetch?: typeof fetch): Promise<AnswerKey> {
  return await apiGet<AnswerKey>(`/answer-keys/${slug}`, customFetch);
}



