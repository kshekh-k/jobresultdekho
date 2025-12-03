<script lang="ts">
  import { page } from '$app/stores';
  import { searchJobs } from '$lib/api/job';
  export let data;

  // initial SSR data
  let { q, jobs, meta } = data;

  // reactively update q from URL
  $: q = $page.url.searchParams.get("q") ?? "";

  // refetch jobs whenever q changes (client-side)
  $: if (q) {
    searchJobs({ q })
      .then(json => {
        jobs = json.data ?? [];
        meta = json.meta ?? {};
      })
      .catch(err => {
        console.error("Search error", err);
        jobs = [];
      });
  }
</script>

<section class="container mx-auto px-4 py-8 space-y-6">
  <h1 class="text-2xl font-semibold">Search Jobs</h1>

  <!-- Search form -->
  <form method="GET" action="/search" class="flex gap-2 max-w-xl">
    <input
      name="q"
      type="text"
      placeholder="Search jobs (e.g. BSSC, Bihar, SSC)..."
      value={q}
      class="flex-1 rounded-lg border border-gray-600 bg-transparent px-3 py-2 text-sm outline-none focus:border-blue-500"
    />
    <button
      type="submit"
      class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
    >
      Search
    </button>
  </form>

  {#if !q}
    <p class="text-sm text-gray-400">
      Type a keyword above and hit Search.
    </p>

  {:else if q && jobs.length === 0}
    <p class="text-sm text-gray-400">
      No results found for "<span class="font-semibold">{q}</span>".
    </p>

  {:else}
    <p class="text-sm text-gray-400 mb-2">
      Showing {jobs.length} result{jobs.length !== 1 ? "s" : ""} for
      "<span class="font-semibold">{q}</span>"
    </p>

    <div class="space-y-3">
      {#each jobs as job}
        <a
          href={`/latest-job/jobs/${job.slug}`}
          class="block rounded-lg border border-gray-700 bg-white/5 px-4 py-3 hover:border-blue-500 hover:bg-white/10 transition"
        >
          <div class="flex items-center justify-between gap-4">
            <div>
              <h2 class="text-sm font-semibold">{job.title}</h2>

              {#if job.short_description}
                <p class="mt-1 text-xs text-gray-400 line-clamp-2">
                  {job.short_description}
                </p>
              {/if}
            </div>

            {#if job.last_date}
              <span class="text-[11px] text-gray-300">
                Last date: {new Date(job.last_date).toLocaleDateString()}
              </span>
            {/if}
          </div>
        </a>
      {/each}
    </div>
  {/if}
</section>
