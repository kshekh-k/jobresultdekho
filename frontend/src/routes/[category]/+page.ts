import type { PageLoad } from "./$types";
import { getCategoryBySlug } from "$lib/api/category";

export const load: PageLoad = async ({ params, fetch }) => {
  const category = await getCategoryBySlug(params.category, fetch);  
  return { category };
};
