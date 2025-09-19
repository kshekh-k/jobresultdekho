<script lang="ts">
  export let categories: any[] = [];
</script>

<nav>
  {#each categories as cat}
    {#if cat.children?.length}
      <details>
        <summary>{cat.name}</summary>
        <ul>
          {#each cat.children as child}
            <li><a href={`/categories/${child.slug}`}>{child.name}</a></li>
          {/each}
        </ul>
      </details>
    {:else}
      <a href={`/categories/${cat.slug}`}>{cat.name}</a>
    {/if}
  {/each}
</nav>
