<script lang="ts">
  export let data: { page: any };
</script>

<article>
  <h1 class="text-2xl font-bold">{data.page.title}</h1>
  <p class="mt-2 text-gray-700">{data.page.description}</p>

  <!-- Render rich text blocks -->
  {#if data.page.content}
    {#each data.page.content as block}
      {#if block.type === 'paragraph'}
        <p>
          {#each block.children as child}
            {child.text}
          {/each}
        </p>
      {/if}
    {/each}
  {/if}

  {#if data.page.categories?.length}
    <p class="mt-6 text-sm text-gray-500">
      Categories:
      {#each data.page.categories as cat, i}
        <a href={`/${cat.slug}`}>{cat.title}</a>{i < data.page.categories.length - 1 ? ', ' : ''}
      {/each}
    </p>
  {/if}
</article>
