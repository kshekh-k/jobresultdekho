// src/routes/search/+page.ts
import type { PageLoad } from "./$types";
import { searchJobs } from "$lib/api/job";

export const load: PageLoad = async ({ fetch, url }) => {
  const q = url.searchParams.get("q") ?? "";
  const page = Number(url.searchParams.get("page") ?? 1);

  if (!q) {
    return { q, jobs: [], meta: {} };
  }

  try {
    const json = await searchJobs({ q, page }, fetch);
    return {
      q,
      jobs: json.data ?? [],
      meta: json.meta ?? {},
    };
  } catch (err) {
    console.error("Search error", err);
    return { q, jobs: [], meta: {} };
  }
};
