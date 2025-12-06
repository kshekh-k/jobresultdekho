// src/lib/api/blog.ts
import type { Page } from "@sveltejs/kit";
import { apiGet } from "./client";

export interface Blog {
  id: number;
  title: string;
  slug: string;
  short_description?: string;
  content?: string;
  cover_image?: string;
  category?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function getLatestBlog(customFetch?: typeof fetch): Promise<Blog> {
  return await apiGet<Blog>(`/blogs/latest`, customFetch);
}

export async function getBlogList(customFetch?: typeof fetch): Promise<Blog[]> {
  return await apiGet<Blog[]>(`/blogs`, customFetch);
}

export async function getBlogBySlug(slug: string, customFetch?: typeof fetch): Promise<Blog> {
  return await apiGet<Blog>(`/blogs/${slug}`, customFetch);
}
