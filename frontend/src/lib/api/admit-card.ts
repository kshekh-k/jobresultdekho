// src/lib/api/admit-card.ts
import type { Page } from "@sveltejs/kit";
import { apiGet } from "./client";

export interface AdmitCard {
  id: number;
  title: string;
  department?: string;
  category?: string;
  last_date: string;
  slug?: string;
  description: string;
  content: string;
}

export async function getLatestAdmitCards(customFetch?: typeof fetch): Promise<AdmitCard> {
  return await apiGet<AdmitCard>(`/admit-cards/latest`, customFetch);
}

export async function getAdmitCardBySlug(slug: string, customFetch?: typeof fetch): Promise<AdmitCard> {
  return await apiGet<AdmitCard>(`/admit-cards/${slug}`, customFetch);
}



