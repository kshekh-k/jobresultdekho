<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import Icon from '$lib/components/ui/Icon.svelte';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { daysLeft, daysLeftLabel } from '$lib/utils';
	import Layout from '$lib/components/Layout.svelte';

	export let data: { content: any; type: string };
	export let buttonLabel: string | undefined =
		data.type === 'jobs'
			? 'Apply Now'
			: data.type === 'result'
				? 'View Now'
				: data.type === 'admit-cards'
					? 'Download Now'
					: data.type === 'admissions'
						? 'View Now'
						: data.type === 'answer-key'
							? 'Match Now'
							: data.type === 'syllabus'
								? 'Check Now'
								: undefined;
	// console.log('Job', JSON.stringify(data));
</script>

<Layout header={false} heading={''}>
	<Card.Root class="overflow-hidden rounded-md gap-5">
		<Card.Header class="flex flex-col items-start justify-start gap-3 px-3 lg:px-6">
			<h1 class="text-center text-2xl md:text-4xl font-bold text-indigo-700">
				<a href={data.content.reference_url} class="hover:text-rose-700" target="_blank">{data.content.title}</a>
			</h1>

			<div class="prose max-w-none w-full">
				<p class="text-slate-600">
					{data.content.description}
				</p>
				
				
			</div>
		</Card.Header>
		<Card.Content class="px-3 lg:px-6">
			<div class="prose max-w-none">
				<div class="overflow-auto max-w-full pb-1 mb-5">
					<div class="min-w-sm pb-1">
						<table class="min-w-full border border-slate-300 border-collapse table-auto !m-0">
							<thead>
								<tr class="bg-indigo-600 text-white">
									<th class="px-4 py-2 text-left text-sm font-medium border text-white">Department</th>
									<th class="px-4 py-2 text-left text-sm font-medium border whitespace-nowrap text-white"
										>Last Date</th
									>
									<!-- {#if data.content.last_date && (data.content.category === 'latest-job' || data.content.category === 'admit-cards' || data.content.category === 'admissions')} -->
									<th class="px-4 py-2 text-left text-sm font-medium border whitespace-nowrap text-white"
										>Time Left</th
									>
									<!-- {/if} -->
									<th class="px-4 py-2 text-left text-sm font-medium border whitespace-nowrap text-white"
										>Total Posts</th
									>
									<th class="px-4 py-2 text-left text-sm font-medium border whitespace-nowrap text-white"
										>Action</th
									>
								</tr>
							</thead>
							<tbody class="divide-y">
								<tr>
									<td class="px-4 py-3 text-sm border">{data.content.department?.title || '—'}</td>
									<td class="px-4 py-3 text-sm border whitespace-nowrap"
										>{new Date(data.content.last_date)
											.toLocaleDateString('en-GB')
											.replaceAll('/', '-')}</td
									>
									<!-- {#if data.content.last_date && (data.content.category === 'latest-job' || data.content.category === 'admit-cards' || data.content.category === 'admissions')} -->
									<td
										class="px-4 py-3 text-sm border font-semibold {daysLeft(
											data.content.last_date
										) < 10
											? 'text-rose-700 bg-rose-50'
											: 'text-green-600'}"
										>{daysLeftLabel(data.content.last_date)}
									</td>
									<!-- {/if} -->
									<td class="px-4 py-3 text-sm border font-semibold"></td>
									<td class="px-4 py-3 text-sm border font-semibold">
										<Button href={data.content.reference_url} target="_blank" variant="success" size="sm" class={'no-underline'}>
							{buttonLabel}
						</Button> </td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="grid grid-cols-12 gap-5 xl:gap-10">
					<!-- Important Dates -->
					<div class="col-span-12 md:col-span-6 flex flex-col">
						<div class="bg-indigo-600 py-2 px-3">
							<h3 class="text-xl font-semibold text-white !m-0 p-0">Important Dates</h3>
						</div>
						<div class="max-w-full overflow-auto m-0">
							<table class="w-full border border-gray-300 !m-0">
								<tbody>
									<tr class="border-b">
										<td class="p-2 font-medium">Application start date</td>
										<td class="p-2">21 October 2025</td>
									</tr>
									<tr class="border-b">
										<td class="p-2 font-medium">Last date to apply</td>
										<td class="p-2">21 October 2025</td>
									</tr>
									<tr class="border-b">
										<td class="p-2 font-medium">Last date for fee payment</td>
										<td class="p-2">21 October 2025</td>
									</tr>
									<tr class="border-b">
										<td class="p-2 font-medium">Form correction window</td>
										<td class="p-2">21 October 2025</td>
									</tr>
									<tr>
										<td class="p-2 font-medium">Exam date</td>
										<td class="p-2">21 October 2025</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<!-- Application Fee -->
					<div class="col-span-12 md:col-span-6 flex flex-col">
						<div class="bg-indigo-600 py-2 px-3">
							<h3 class="text-xl font-semibold text-white !m-0 p-0">Application Fee</h3>
						</div>
						<div class="max-w-full overflow-auto m-0">
							<table class="w-full border border-gray-300 !m-0">
								<tbody>
									<tr class="border-b">
										<td class="p-2 font-medium">General / OBC / EWS</td>
										<td class="p-2">Update Here</td>
									</tr>
									<tr class="border-b">
										<td class="p-2 font-medium">SC / ST / EBC</td>
										<td class="p-2">Update Here</td>
									</tr>
									<tr class="border-b">
										<td class="p-2 font-medium">All Category Female</td>
										<td class="p-2">Update Here</td>
									</tr>
									<tr class="border-b">
										<td class="p-2 font-medium">Fee Refund</td>
										<td class="p-2">Update Here</td>
									</tr>
									<tr>
										<td class="p-2 font-medium">Payment Mode</td>
										<td class="p-2">Online Only</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<!-- Eligibility Criteria -->
				<div class="flex flex-col mt-5">
					<div class="bg-indigo-600 py-2 px-3">
							<h3 class="text-xl font-semibold text-white !m-0 p-0"> Eligibility Criteria</h3>
								</div>
					<ul class="py-2 px-10 border border-slate-200 !mt-0">
						<li>Age Limit: 18 Years to 33 Years</li>
						<li>Education: Graduion</li>
						<li>
							RRB provides age relaxation for the NTPC Graduate Level position as per their
							regulations.
						</li>
					</ul>
				</div>

				<div class="flex justify-end pb-5 lg:pb-0">
					<Button
						href={data.content.reference_url}
						variant="success"
						target="_blank"
						class="no-underline w-40"
						size="lg">{buttonLabel}</Button
					>
				</div>

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

	<Card.Root class="overflow-hidden rounded-md gap-0">
		<Card.Content class="px-3 lg:px-6">
			<div class="flex flex-col-reverse md:grid md:grid-cols-12 gap-5">
				<!-- Ad Places -->
				<div class="flex justify-center items-center rounded-sm bg-gray-100 p-5 col-span-5">
					Ad Place here
				</div>
				{#if data.content.important_links}
					<div class="prose max-w-none bg-indigo-50 rounded-sm p-3 col-span-7">
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
										<th class="sm:px-4 p-2 text-xs sm:text-sm border w-full">{link.Label}</th>
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
				{/if}
			</div>
		</Card.Content>
	</Card.Root>

	{#if data.content.FAQs}
		<div class="flex flex-col gap-3 max-w-none prose mt-10">
			<h3 class="text-rose-700 text-center md:text-left">
				<span class="block">FAQs: </span>{data.content.title}
			</h3>
			<Accordion.Root type="single" class="gap-2">
				<!-- <div class="grid grid-cols-2 gap-5"> -->
				<div class="flex flex-col gap-2">
					{#each data.content.FAQs as question, index}
						<!-- {#if index % 2 === 0}
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
							{:else} -->
						<Accordion.Item value="item-{index}" class="mb-2 border-0">
							<Card.Root class="overflow-hidden rounded-md gap-0 p-2"
								><Card.Header class="flex flex-col items-start justify-start gap-3 px-2 sm:px-4">
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
						<!-- {/if} -->
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
</Layout>
