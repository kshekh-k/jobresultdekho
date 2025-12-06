// src/routes/blog/+page.ts
import type { PageLoad } from './$types';
import { getBlogList } from '$lib/api/blog';

export const load: PageLoad = async ({ fetch }) => {
  const blogs = await getBlogList(fetch);
  return { blogs };
};
