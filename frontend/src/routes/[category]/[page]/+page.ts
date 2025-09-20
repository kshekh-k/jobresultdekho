import type { PageLoad } from "./$types";
import { getPageBySlug } from "$lib/api/page";

export const load: PageLoad = async ({ params, fetch }) => {
  const page = await getPageBySlug(params.page, fetch);
  return { page };
};
