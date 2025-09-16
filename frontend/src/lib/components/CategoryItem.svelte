<script lang="ts">
  export let category;
</script>

<div class="bg-white shadow-md rounded-lg overflow-hidden">
  <div class="p-6">
    <h2 class="text-xl font-semibold mb-2">{category.attributes.title}</h2>
    
    {#if category.attributes.link}
      <a href={category.attributes.link} target="_blank" class="text-blue-600 hover:underline mb-4 inline-block">
        Visit Link
      </a>
    {/if}
    
    {#if category.attributes.children && category.attributes.children.data.length > 0}
      <div class="mt-4">
        <h3 class="text-lg font-medium mb-2">Subcategories:</h3>
        <ul class="space-y-2 pl-4">
          {#each category.attributes.children.data as child}
            <li class="border-l-2 border-gray-200 pl-3">
              <span class="font-medium">{child.attributes.title}</span>
              {#if child.attributes.link}
                <a href={child.attributes.link} target="_blank" class="text-blue-600 hover:underline ml-2 text-sm">
                  (Visit)
                </a>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</div>