// src/lib/api/study-material.ts
import type { Page } from "@sveltejs/kit";
import { apiGet } from "./client";

export interface StudyMaterial {
  id: number;
  title: string;
  slug?: string;
  description: string;
  content: string;
}

export async function getStudyMaterialBySlug(slug: string, customFetch?: typeof fetch): Promise<StudyMaterial> {
  return await apiGet<StudyMaterial>(`/study-material/${slug}`, customFetch);
}



