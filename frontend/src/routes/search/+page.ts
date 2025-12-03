// src/routes/search/+page.ts
import type { PageLoad } from "./$types";
import { searchJobs } from "$lib/api/job";

export const load: PageLoad = async ({ fetch, url }) => {
  const q = url.searchParams.get("q") ?? "";
  const page = Number(url.searchParams.get("page") ?? 1);

  if (!q) {
    return {
      category: {
        title: "Search Results",
        description: "Type a keyword above and hit Search.",
        slug: "latest-job",
        search: []
      }
    };
  }

  try {
    const json = await searchJobs({ q, page }, fetch);
    return {
      category: {
        title: "Search Results",
        description: `Showing results for "${q}"`,
        slug: "latest-job",
        search: json.data ?? []
      }
    };
  } catch (err) {
    console.error("Search error", err);
    return {
      category: {
        title: "Search Results",
        description: `No results found for "${q}"`,
        slug: "latest-job",
        search: []
      }
    };
  }
};
