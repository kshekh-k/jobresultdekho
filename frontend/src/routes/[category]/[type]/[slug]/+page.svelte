<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import Icon from '$lib/components/ui/Icon.svelte';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { daysLeft } from '$lib/utils';
	import { Calendar, Clock, Landmark } from 'lucide-svelte';
	export let data: { content: any; type: string };
	export let buttonLabel: string | undefined =
		data.content.type === 'job'
			? 'Apply Now'
			: data.content.type === 'result'
				? 'View Now'
				: data.content.type === 'admit-cards'
					? 'Download Now'
					: data.content.type === 'admissions'
						? 'View Now'
						: data.content.type === 'answer-key'
							? 'Match Now'
							: data.content.type === 'syllabus'
								? 'Check Now'
								: undefined;
	// console.log('Job', JSON.stringify(data));
	console.log('Job', data)
</script>

<div class="max-w-screen-xl mx-auto px-3">
	<div class="py-5 space-y-5">
		<Card.Root class="overflow-hidden rounded-md gap-0">
			<Card.Header class="flex flex-col items-start justify-start gap-3 px-3 lg:px-6">
				<h1 class="text-center text-2xl md:text-4xl font-bold text-rose-700">
					{data.content.title}
				</h1>

				<div class="flex flex-warp gap-3">
					<p class="text-gray-700 flex flex-wrap gap-2 items-center">
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
				<div class="prose max-w-none w-full">
					<p class="text-slate-600">
						{data.content.description}
					</p>

					<table class="min-w-full border border-collapse table-auto">
						<thead>
							<tr class="bg-slate-100">
								<th class="px-4 py-2 text-left text-sm font-medium border">Department:</th>
								<th class="px-4 py-2 text-left text-sm font-medium border">Last Date</th>
								<!-- {#if data.content.last_date && (data.content.category === 'latest-job' || data.content.category === 'admit-cards' || data.content.category === 'admissions')} -->
								<th class="px-4 py-2 text-left text-sm font-medium border">Time Left</th>
								<!-- {/if} -->
							</tr>
						</thead>
						<tbody class="divide-y">
							<tr>
								<td class="px-4 py-3 text-sm border">{data.content.department.title}</td>
								<td class="px-4 py-3 text-sm border"
									>{new Date(data.content.last_date)
										.toLocaleDateString('en-GB')
										.replaceAll('/', '-')}</td
								>
								<!-- {#if data.content.last_date && (data.content.category === 'latest-job' || data.content.category === 'admit-cards' || data.content.category === 'admissions')} -->
								<td
									class="px-4 py-3 text-sm border font-semibold {daysLeft(data.content.last_date) <
									10
										? 'text-rose-700'
										: 'text-green-600'}"
									>{daysLeft(data.content.last_date)}
								</td>
								<!-- {/if} -->
							</tr>
						</tbody>
					</table>

					<div class="flex justify-end pb-5 lg:pb-0">
						<Button
							href={data.content.reference_url}
							variant="success"
							target="_blank"
							class="no-underline w-40"
							size="lg">{buttonLabel}</Button
						>
					</div>
				</div>
			</Card.Header>
			<Card.Content class="px-3 lg:px-6">
				<div class="prose max-w-none">
					{#if data.content.content}
						{#each data.content.content as block}
							{#if block.type === 'paragraph'}
								<p class="text-slate-600">
									{#each block.children as paragraph}
										{#if paragraph.bold}<strong>{paragraph.text}</strong>
										{:else if paragraph.italic}<em>{paragraph.text}</em>
										{:else if paragraph.underline}<u>{paragraph.text}</u>
										{:else if paragraph.strikethrough}<s>{paragraph.text}</s>
										{:else}
											{paragraph.text}
										{/if}
									{/each}
								</p>
								<!-- heading logic here -->
							{:else if block.type === 'heading'}
								{#if block.level === 1}
									<h1>
										{#each block.children as child}
											{#if child.italic}<em>{child.text}</em>
											{:else if child.underline}<u>{child.text}</u>
											{:else if child.strikethrough}<s>{child.text}</s>
											{:else}
												{child.text}
											{/if}
										{/each}
									</h1>
								{:else if block.level === 2}
									<h2>
										{#each block.children as child}
											{#if child.italic}<em>{child.text}</em>
											{:else if child.underline}<u>{child.text}</u>
											{:else if child.strikethrough}<s>{child.text}</s>
											{:else}
												{child.text}
											{/if}
										{/each}
									</h2>
								{:else if block.level === 3}
									<h3>
										{#each block.children as child}
											{#if child.italic}<em>{child.text}</em>
											{:else if child.underline}<u>{child.text}</u>
											{:else if child.strikethrough}<s>{child.text}</s>
											{:else}
												{child.text}
											{/if}
										{/each}
									</h3>
								{:else if block.level === 4}
									<h4>
										{#each block.children as child}
											{#if child.italic}<em>{child.text}</em>
											{:else if child.underline}<u>{child.text}</u>
											{:else if child.strikethrough}<s>{child.text}</s>
											{:else}
												{child.text}
											{/if}
										{/each}
									</h4>
								{:else if block.level === 5}
									<h5>
										{#each block.children as child}
											{#if child.italic}<em>{child.text}</em>
											{:else if child.underline}<u>{child.text}</u>
											{:else if child.strikethrough}<s>{child.text}</s>
											{:else}
												{child.text}
											{/if}
										{/each}
									</h5>
								{:else}
									<h6>
										{#each block.children as child}
											{#if child.italic}<em>{child.text}</em>
											{:else if child.underline}<u>{child.text}</u>
											{:else if child.strikethrough}<s>{child.text}</s>
											{:else}
												{child.text}
											{/if}
										{/each}
									</h6>
								{/if}
							{:else if block.type === 'list'}
								<!-- list logic here -->
								{#if block.format === 'ordered'}
									<ol class="list-decimal">
										{#each block.children as item}
											<li>
												{#each item.children as child}
													{#if child.bold}<strong>{child.text}</strong>
													{:else if child.italic}<em>{child.text}</em>
													{:else if child.underline}<u>{child.text}</u>
													{:else if child.strikethrough}<s>{child.text}</s>
													{:else}
														{child.text}
													{/if}
												{/each}
											</li>
										{/each}
									</ol>
								{:else if block.format === 'unordered'}
									<ul class="list-disc">
										{#each block.children as item}
											<li>
												{#each item.children as child}
													{#if child.bold}<strong>{child.text}</strong>
													{:else if child.italic}<em>{child.text}</em>
													{:else if child.underline}<u>{child.text}</u>
													{:else if child.strikethrough}<s>{child.text}</s>
													{:else}
														{child.text}
													{/if}
												{/each}
											</li>
										{/each}
									</ul>
								{/if}
							{:else if block.type === 'image'}
								<img src={block.url} alt={block.alternativeText} />
							{:else if block.type === 'code'}
								<pre><code>{block.children[0].text}</code></pre>
							{:else if block.type === 'quote'}
								<blockquote>{block.children[0].text}</blockquote>
							{/if}
						{/each}
					{/if}

					<div class="flex justify-center py-5">
						<Button
							href={data.content.reference_url}
							variant="success"
							target="_blank"
							class="no-underline w-40"
							size="lg">{buttonLabel}</Button
						>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
		{#if data.content.important_links}
			<Card.Root class="overflow-hidden rounded-md gap-0"
				><Card.Content class="px-3 lg:px-6">
					<div class="prose max-w-none">
						<h3 class="text-rose-700 text-center uppercase">Important Links</h3>
						<table class="min-w-full border border-collapse table-auto">
							<thead>
								<tr class="bg-indigo-600 text-white">
									<th
										class="sm:px-4 p-2 text-left text-xs sm:text-sm font-medium border text-nowrap text-white hidden sm:table-cell"
										>Sr. No.</th
									>
									<th class="sm:px-4 p-2 text-left text-xs sm:text-sm font-medium border text-white"
										>Title</th
									>
									<th class="sm:px-4 p-2 text-left text-xs sm:text-sm font-medium border text-white"
										>Link</th
									>
								</tr>
							</thead>

							<tbody class="divide-y">
								{#each data.content.important_links as link, index}
									<tr class="odd:bg-white even:bg-slate-50">
										<td class="sm:px-4 p-2 text-xs sm:text-sm border hidden sm:table-cell"
											>{index + 1}.</td
										>
										<th class="sm:px-4 p-2 text-xs sm:text-sm border">{link.Label}</th>
										<td class="sm:px-4 p-2 text-xs sm:text-sm border"
											><a
												href={link.URL}
												target="_blank"
												class="text-rose-600 hover:text-indigo-600 font-semibold no-underline text-nowrap"
												>Click Here</a
											></td
										>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</Card.Content></Card.Root
			>
		{/if}
		{#if data.content.FAQs}
			<div class="flex flex-col gap-3 max-w-none prose mt-10">
				<h3 class="text-rose-700 text-center">
					{data.content.title}: <span class="block uppercase">Important Question</span>
				</h3>
				<Accordion.Root type="single" class="gap-2">
					<div class="grid grid-cols-2 gap-5">
						{#each data.content.FAQs as question, index}
							{#if index % 2 === 0}
								<Accordion.Item value="item-{index}" class="mb-5 border-0">
									<Card.Root class="overflow-hidden rounded-md gap-0 p-2"
										><Card.Header
											class="flex flex-col items-start justify-start gap-3 px-2 sm:px-4"
										>
											<Accordion.Trigger class="lg:text-lg hover:no-underline"
												>{question.Question}</Accordion.Trigger
											></Card.Header
										>
										<Card.Content class="px-2 sm:px-4">
											<Accordion.Content class="lg:text-lg">
												{question.Answer}
											</Accordion.Content>
										</Card.Content></Card.Root
									>
								</Accordion.Item>
							{:else}
								<Accordion.Item value="item-{index}" class="mb-5 border-0">
									<Card.Root class="overflow-hidden rounded-md gap-0 p-2"
										><Card.Header
											class="flex flex-col items-start justify-start gap-3 px-2 sm:px-4"
										>
											<Accordion.Trigger class="lg:text-lg hover:no-underline"
												>{question.Question}</Accordion.Trigger
											></Card.Header
										>
										<Card.Content class="px-2 sm:px-4">
											<Accordion.Content class="lg:text-lg">
												{question.Answer}
											</Accordion.Content>
										</Card.Content></Card.Root
									>
								</Accordion.Item>
							{/if}
						{/each}
					</div>
				</Accordion.Root>
				<div class="flex justify-center py-5">
					<Button
						href={data.content.reference_url}
						variant="success"
						target="_blank"
						class="no-underline w-40"
						size="lg">{buttonLabel}</Button
					>
				</div>
			</div>
		{/if}
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
