<script lang="ts">
  export let data: { category: any };
</script>

<h1>{data.category.title}</h1>

{#if data.category.children?.length}
  <ul>
    {#each data.category.children as child}
      <li><a href={`/${child.slug}`}>{child.title}</a></li>
    {/each}
  </ul>
{:else}
  <p>No subcategories.</p>
{/if}
