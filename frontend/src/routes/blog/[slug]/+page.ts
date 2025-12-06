// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';
import { getBlogBySlug } from '$lib/api/blog';

export const load: PageLoad = async ({ params, fetch }) => {
  const { slug } = params;

  try {
    const blog = await getBlogBySlug(slug, fetch);

    if (!blog) {
      return {
        status: 404,
        error: new Error("Blog not found")
      };
    }

    return { blog };
  } catch (err) {
    console.error("Error loading blog:", err);

    return {
      status: 500,
      error: new Error("Failed to load blog")
    };
  }
};
