<script lang="ts">
  export let data: { category: any };
</script>

<h1>{data.category.name}</h1>

{#if data.category.children?.length}
  <ul>
    {#each data.category.children as child}
      <li><a href={`/categories/${child.slug}`}>{child.name}</a></li>
    {/each}
  </ul>
{:else}
  <p>No subcategories.</p>
{/if}
