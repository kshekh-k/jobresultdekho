import type { PageLoad } from "./$types";
import { getCategoryBySlug } from "$lib/api/categories";

export const load: PageLoad = async ({ params }) => {
  const category = await getCategoryBySlug(params.slug);
  return { category };
};
