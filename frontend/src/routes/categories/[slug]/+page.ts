import type { PageLoad } from "./$types";
import { getCategoryBySlug } from "$lib/api/categories";

export const load: PageLoad = async ({ params, fetch }) => {
  const category = await getCategoryBySlug(params.slug, fetch);
  return { category };
};
