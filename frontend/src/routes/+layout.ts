import type { LayoutLoad } from "./$types";
import { getCategoryTree } from "$lib/api/categories";

export const load: LayoutLoad = async ({fetch}) => {
  const categories = await getCategoryTree(fetch);
  return { categories };
};
