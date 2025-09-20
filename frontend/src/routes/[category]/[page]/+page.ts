import type { PageLoad } from "./$types";
import { getPageBySlug } from "$lib/api/page";

export const load: PageLoad = async ({ params, fetch }) => {
  console.log('api function calling', params.page);
  const page = await getPageBySlug(params.page, fetch);  
  return { page };
};
