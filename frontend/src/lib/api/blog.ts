// src/lib/api/blog.ts
import type { Page } from "@sveltejs/kit";
import { apiGet } from "./client";

export interface Blog {
  id: number;
  title: string;
  slug: string;
  short_description?: string;
  short_intro?: string;
  content_md?: string;
  content?: any;
  cover_image?: any;
  category?: any;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  SEO?: {
    title?: string;
    description?: string;
    tags?: string;
  };
  comments?: any[];
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
