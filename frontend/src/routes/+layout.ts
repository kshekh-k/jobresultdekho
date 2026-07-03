import type { LayoutLoad } from "./$types";
import { getCategoryTree } from "$lib/api/category";
import { getHighAlertPosts } from "$lib/api/job";

export const load: LayoutLoad = async ({ fetch }) => {
  const [highAlertPosts, categories] = await Promise.allSettled([
    getHighAlertPosts(fetch),
    getCategoryTree(fetch),
  ]).then(results => results.map(r => (r.status === 'fulfilled' ? (r.value ?? []) : [])));

  return { categories, highAlertPosts };
};
