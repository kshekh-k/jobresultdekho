// src/lib/api/admission.ts
import type { Page } from "@sveltejs/kit";
import { apiGet } from "./client";

export interface Admission {
  id: number;
  title: string;
  slug?: string;
  description: string;
  content: string;
}

export async function getAdmissionBySlug(slug: string, customFetch?: typeof fetch): Promise<Admission> {
  return await apiGet<Admission>(`/admission/${slug}`, customFetch);
}



