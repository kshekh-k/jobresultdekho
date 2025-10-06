<script lang="ts">
  export let data: { content: any; type: string };
  console.log('Job', data);
</script>

<article class="prose max-w-none">
  <h1 class="text-2xl font-bold">{data.content.title}</h1>
  {#if data.content.description}
    <p class="mt-2 text-gray-700">{data.content.description}</p>
  {/if}
    <p class="mt-2 text-gray-700">{data.content.last_date}</p>
    <p class="mt-2 text-gray-700">{data.content.department.title}</p>
  {#if data.content.content}
    {#each data.content.content as block}
      {#if block.type === "paragraph"}
        <p>
          {#each block.children as child}
            {child.text}
          {/each}
        </p>
      {/if}
    {/each}
  {/if}
</article>