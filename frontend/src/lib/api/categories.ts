// src/lib/api/categories.ts
import { apiGet } from "./client";

export interface Category {
  id: number;
  title: string;
  slug?: string;
  description: string;
  order: number;
  children?: Category[];
  parent?: Category | null;
}

export async function getCategoryTree(customFetch?: typeof fetch): Promise<Category[]> {
  return await apiGet<Category[]>("/categories/tree", customFetch);
}

export async function getCategoryBySlug(slug: string, customFetch?: typeof fetch): Promise<Category> {
  return await apiGet<Category>(`/categories/${slug}`, customFetch);
}

