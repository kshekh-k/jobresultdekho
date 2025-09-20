<script lang="ts">
  // For the page detail
  export let data: { pageData: any };
</script>

{#if data.pageData}
  <article>
    <h1 class="text-2xl font-bold">{data.pageData.title}</h1>
    <p class="mt-2 text-gray-700">{data.pageData.description}</p>

    {#if data.pageData.content}
      <div class="mt-4 prose">
        {@html data.pageData.content}
      </div>
    {/if}

    {#if data.pageData.categories?.length}
      <p class="mt-6 text-sm text-gray-500">
        Categories:
        {#each data.pageData.categories as cat, i}
          <a href={`/${cat.slug}`}>{cat.title}</a>{i < data.pageData.categories.length - 1 ? ', ' : ''}
        {/each}
      </p>
    {/if}
  </article>
{:else}
  <p>Page not found.</p>
{/if}
