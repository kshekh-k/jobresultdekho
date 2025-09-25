// src/lib/api/admit-card.ts
import type { Page } from "@sveltejs/kit";
import { apiGet } from "./client";

export interface AdmitCard {
  id: number;
  title: string;
  slug?: string;
  description: string;
  content: string;
}

export async function getAdmitCardBySlug(slug: string, customFetch?: typeof fetch): Promise<AdmitCard> {
  return await apiGet<AdmitCard>(`/admit-cards/${slug}`, customFetch);
}



