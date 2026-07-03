import type { PageLoad } from "./$types";
import { getCategoryBySlug } from "$lib/api/category";

export const load: PageLoad = async ({ params, fetch }) => {
  try {
    const category = await getCategoryBySlug(params.category, fetch);
    return { category };
  } catch {
    return { category: null };
  }
};
