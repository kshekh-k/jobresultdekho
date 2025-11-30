import type { LayoutLoad } from "./$types";
import { getCategoryTree } from "$lib/api/category";
import { getHighAlertPosts } from "$lib/api/job";

export const load: LayoutLoad = async ({fetch}) => {
  const highAlertPosts = await getHighAlertPosts(fetch);
  const categories = await getCategoryTree(fetch);
  return { categories, highAlertPosts };
};
