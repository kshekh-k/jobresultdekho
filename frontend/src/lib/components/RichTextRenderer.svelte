<script lang="ts">
  /**
   * Universal renderer for Strapi Rich Text or JSON block content.
   * Supports text formatting, headings, lists, links, and images.
   */
  export let content: any = [];
  export let className: string  | null = null
  import { getMediaUrl } from '$lib/utils';
  
  // Helper to safely extract text from nested children
  function getText(children = []) {
    return children.map((child:any) => child.text || '').join('');
  }

  // Normalize image block and return full URL using getMediaUrl
  function getImageUrl(block:any) {
    if (!block) return '';

    // Common shapes: block.url, block.src, block.data?.target?.attributes?.url
    const path = block.url || block.src || block.data?.target?.attributes?.url || block.attributes?.url || block.attributes?.src || '';
    return path ? getMediaUrl(path) : '';
  }

  // Helper to apply inline text styles
  function renderText(child:any) {
    let text = child.text || '';
    if (child.bold) text = `<strong>${text}</strong>`;
    if (child.italic) text = `<em>${text}</em>`;
    if (child.underline) text = `<u>${text}</u>`;
    if (child.strikethrough) text = `<s>${text}</s>`;
    if (child.code) text = `<code>${text}</code>`;  
    if (child.type === 'link') text = `<a href=${child.url} class="text-rose-700 no-underline hover:text-indigo-600 ease-in-out duration-200" target="_blank">${child.children.map(renderText).join('')}</a>`;     
    return text;
   
  }
  //console.log(content)
</script>

<div class="{className}">
  {#each content as block, i}
    {#if block.type === 'paragraph'}
      <p>{@html block.children.map(renderText).join('')}</p>
    {:else if block.type === 'heading'}
      {#if block.level === 1}
        <h1>{@html block.children.map(renderText).join('')}</h1>
      {:else if block.level === 2}
        <h2>{@html block.children.map(renderText).join('')}</h2>
      {:else if block.level === 3}
        <h3>{@html block.children.map(renderText).join('')}</h3>
      {:else if block.level === 4}
        <h4>{@html block.children.map(renderText).join('')}</h4>
      {:else if block.level === 5}
        <h5>{@html block.children.map(renderText).join('')}</h5>
      {:else}
        <h6>{@html block.children.map(renderText).join('')}</h6>
      {/if}

    {:else if block.type === 'list'}
      {#if block.format === 'ordered'}
        <ol>
          {#each block.children as item, j}
            <li>{@html item.children.map(renderText).join('')}</li>
          {/each}
        </ol>
      {:else}
        <ul>
          {#each block.children as item, j}
            <li>  
              {@html item.children.map(renderText).join('')}
            </li>
          {/each}
        </ul>
      {/if}

    {:else if block.type === 'link'}  
      <a href={block.url} target="_blank" rel="noopener">
        {@html block.children.map(renderText).join('')}
      </a>
    {:else if block.type === 'image'}
      <figure class="my-4">
        <img src={getImageUrl(block)} alt={block.alt || block.caption || ''} class="rounded-md shadow" />
        {#if block.caption}
          <figcaption class="text-sm text-gray-500 mt-1">{block.caption}</figcaption>
        {/if}
      </figure>

    {:else if block.type === 'quote'}
      <blockquote>{@html block.children.map(renderText).join('')}</blockquote>

    {:else}
      <div>{@html block.children?.map(renderText).join('') || ''}</div>
    {/if}
  {/each}
</div>

