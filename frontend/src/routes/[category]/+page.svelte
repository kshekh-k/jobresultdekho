<script lang="ts">
  export let data: { category: any };
</script>

<h1>{data.category.title}</h1>
<span>{data.category.description}</span>

{#if data.category.pages?.length}
  <ul>
    {#each data.category.pages as page}
      <li>
        <a href={`/${data.category.slug}/${page.slug}`}>
          {page.title}
        </a>
      </li>
    {/each}
  </ul>
{:else}
  <p>No Pages.</p>
{/if}
