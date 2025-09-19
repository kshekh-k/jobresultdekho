<script lang="ts">
  export let categories: any[] = [];
</script>

<nav>
  {#each categories as cat}
    {#if cat.title.toLowerCase() === 'home'}
      <a href="/">{cat.title}</a>

    {:else if cat.children?.length}
      <div class="dropdown">
        <span>{cat.title}</span>
        <div class="dropdown-menu">
          {#each cat.children as child}
            <a href={`/categories/${child.slug}`}>{child.title}</a>
          {/each}
        </div>
      </div>

    {:else}
      <a href={`/categories/${cat.slug}`}>{cat.title}</a>
    {/if}
  {/each}
</nav>
