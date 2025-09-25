// src/routes/[category]/[type]/[slug]/+page.ts
import type { PageLoad } from "./$types";
import { getContentBySlug } from "$lib/api/content";

export const load: PageLoad = async ({ params, fetch }) => {
  const { type, slug } = params;

  const content = await getContentBySlug(type, slug, fetch);

  if (!content) {
    throw new Error(`No ${type} found for slug ${slug}`);
  }

  return { content, type };
};