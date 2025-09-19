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

export async function getCategoryTree(): Promise<Category[]> {
  return await apiGet<Category[]>("/categories/tree");
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  return await apiGet<Category>(`/categories/${slug}`);
}

