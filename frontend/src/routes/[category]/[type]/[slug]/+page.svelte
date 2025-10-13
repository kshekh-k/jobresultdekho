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
					<p class="text-gray-700 flex gap-2 items-center">
						<span class="flex gap-1 items-center"
							><Icon name={Landmark} size={20} /> {data.content.department.title}</span
						>
						|
						<span class="flex gap-1 items-center"
							><Icon name={Calendar} size={20} /> {data.content.last_date}</span
						>
						|
						<span
							class="flex gap-1 items-center {daysLeft(data.content.last_date) < 10
								? 'text-rose-700'
								: 'text-green-600'}"
							><Icon name={Clock} size={20} />
							<b class="inline-flex py-1 font-semibold">{daysLeft(data.content.last_date)}</b></span
						>
					</p>
				</div>

				<p class="text-slate-600">
					{data.content.description}
				</p>
			</Card.Header>
			<Card.Content>
				<div class="prose max-w-none">
				{#if data.content.content}
					{#each data.content.content as block}
						{#if block.type === 'heading'}
							{#if block.level === 1}
								<h1>
									{#each block.children as child}
										{child.text}
									{/each}
								</h1>
							{:else if block.level === 2}
								<h2>
									{#each block.children as child}
										{child.text}
									{/each}
								</h2>
							{:else if block.level === 3}
								<h3>
									{#each block.children as child}
										{child.text}
									{/each}
								</h3>
							{:else if block.level === 4}
								<h4>
									{#each block.children as child}
										{child.text}
									{/each}
								</h4>
							{:else if block.level === 5}
								<h5>
									{#each block.children as child}
										{child.text}
									{/each}
								</h5>
							{:else}
								<h6>
									{#each block.children as child}
										{child.text}
									{/each}
								</h6>
							{/if}
						{/if}
						{#if block.type === 'paragraph'}
							<p>
								{#each block.children as child}
									{#if child.bold}<strong>{child.text}</strong>
									{:else if child.italic}<em>{child.text}</em>
									{:else if child.underline}<u>{child.text}</u>
									{:else if child.strikethrough}<s>{child.text}</s>
									{:else}
										{child.text}
									{/if}
								{/each}
							</p>
						{/if}

						{#if block.type === 'text'}
							<div>
								{#if block.bold}<strong>{block.text}</strong>{/if}
								{#if block.italic}<em>{block.text}</em>{/if}
								{#if block.underline}<u>{block.text}</u>{/if}
								{#if block.strikethrough}<s>{block.text}</s>{/if}
							</div>
						{/if}

						{#if block.type === 'list'}
							{#if block.format === 'ordered'}
								<ol class="list-decimal">
									{#each block.children as item}
										<li> 
										{#if item.bold}<strong>{item.children[0].text}</strong>
									{:else if item.italic}<em>{item.children[0].text}</em>
									{:else if item.underline}<u>{item.children[0].text}</u>
									{:else if item.strikethrough}<s>{item.children[0].text}</s>
									{:else}
										{item.children[0].text}
									{/if}</li>
									{/each}
								</ol>
							{:else if block.format === 'unordered'}
								<ul class="list-disc">
									{#each block.children as item}									 
										<li> 
										{#if item.bold}<strong>{item.children[0].text}</strong>
									{:else if item.italic}<em>{item.children[0].text}</em>
									{:else if item.underline}<u>{item.children[0].text}</u>
									{:else if item.strikethrough}<s>{item.children[0].text}</s>
									{:else}
										{item.children[0].text}
									{/if}</li>
									{/each}
								</ul>
							{/if}
						{/if}
					{/each}
				{/if}

<p>{data.content.department.reference_url}</p>

				</div>
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
