<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Icon from '$lib/components/ui/Icon.svelte';
  	import { daysLeft } from '$lib/utils';
	import { Calendar, Clock, Landmark } from 'lucide-svelte';
	export let data: { content: any; type: string };
	console.log('Job', data);
  
</script>

<div class="max-w-screen-xl mx-auto px-3">
	<div class="py-5">
		<Card.Root class="overflow-hidden p-0 rounded-md gap-0">
			<Card.Header class="flex flex-col items-start justify-start p-4 gap-3">
				<h1 class="text-center text-2xl md:text-4xl font-bold text-slate-900">
					{data.content.title}
				</h1>

        <div class="flex flex-warp gap-3">
          <p class="text-gray-700"><Icon name={Landmark} size={24} /> {data.content.department.title} | <Icon name={Calendar} size={24} /> {data.content.last_date} | <Icon name={Clock} size={24} /> <b
										class="inline-flex py-1 px-2 font-semibold {daysLeft(data.content.last_date) < 10
											? 'text-rose-700 bg-rose-100'
											: 'text-green-600 bg-green-100'}">{daysLeft(data.content.last_date)}</b
									></p>
 
        </div>

				{#if data.content.description}
					<p class="text-gray-700">{data.content.description}</p>
				{/if}
				
			</Card.Header>
			<Card.Content>
				{#if data.content.content}
					{#each data.content.content as block}
						{#if block.type === 'paragraph'}
							<p class="text-slate-600">
								{#each block.children as child}
									{child.text}
								{/each}
							</p>
						{/if}
					{/each}
				{/if}
			</Card.Content>
		</Card.Root>
	</div>

	<!--   
<article class="prose max-w-none py-5">
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
</article> -->
</div>
