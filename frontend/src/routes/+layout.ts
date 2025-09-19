import type { LayoutLoad } from "./$types";
import { getCategoryTree } from "$lib/api/categories";

export const load: LayoutLoad = async () => {
  const categories = await getCategoryTree();
  return { categories };
};
