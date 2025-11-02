<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import Icon from '$lib/components/ui/Icon.svelte';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { daysLeft, daysLeftLabel, formatDate } from '$lib/utils';
	import Layout from '$lib/components/Layout.svelte';
	import ImportantDates from '$lib/components/job/Dates.svelte';
	import ApplicationFees from '$lib/components/job/Fee.svelte';
	import RichTextRenderer from '$lib/components/RichTextRenderer.svelte';

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
	//console.log('Job full page', data);
</script>

<Layout header={false} heading={''}>
	<Card.Root class="overflow-hidden rounded-md gap-0">
		<Card.Header class="flex flex-col items-start justify-start gap-3 px-3 lg:px-6">
			<h1 class="text-center text-2xl md:text-4xl font-bold text-rose-700">
				{data.content.title}
			</h1>
			<div class="prose max-w-none w-full">
				<RichTextRenderer content={data.content.short_description} />
				<div class="hidden sm:block pb-1">
					<table class="min-w-full border border-collapse table-auto !m-0">
						<thead>
							<tr class="bg-sky-800 text-white">
								<th class="sm:px-4 p-2 text-left text-sm font-medium border text-white"
									>Department</th
								>
								<th
									class="sm:px-4 p-2 text-left text-sm font-medium border whitespace-nowrap text-white"
									>Last Date</th
								>
								<!-- {#if data.content.last_date && (data.content.category === 'latest-job' || data.content.category === 'admit-cards' || data.content.category === 'admissions')} -->
								<th
									class="sm:px-4 p-2 text-left text-sm font-medium border whitespace-nowrap text-white"
									>Time Left</th
								>
								<!-- {/if} -->
								<th
									class="sm:px-4 p-2 text-left text-sm font-medium border whitespace-nowrap text-white"
									>Total Posts</th
								>
								<th
									class="sm:px-4 p-2 text-left text-sm font-medium border whitespace-nowrap text-white"
									>Action</th
								>
							</tr>
						</thead>
						<tbody class="divide-y">
							<tr>
								<td class="sm:px-4 p-2 text-sm border">{data.content.department?.title || '—'}</td>
								<td class="sm:px-4 p-2 text-sm border whitespace-nowrap">
									{formatDate(data.content.last_date)}
								</td>
								<!-- {#if data.content.last_date && (data.content.category === 'latest-job' || data.content.category === 'admit-cards' || data.content.category === 'admissions')} -->
								<td
									class="sm:px-4 p-2 text-sm border font-semibold {daysLeft(
										data.content.last_date
									) < 10
										? 'text-rose-700 bg-rose-50'
										: 'text-green-600'}"
									>{daysLeftLabel(data.content.last_date)}
								</td>
								<!-- {/if} -->
								<td class="sm:px-4 p-2 text-sm border font-semibold text-green-600">{data.content.total_posts}</td>
								<td class="sm:px-4 p-2 text-sm border font-semibold">
									<Button
										href={data.content.reference_url}
										target="_blank"
										variant="success"
										size="sm"
										class={'no-underline !w-full'}
									>
										{buttonLabel}
									</Button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="flex flex-col gap-5 pb-1 sm:hidden">
					<table class="min-w-full border border-collapse table-auto !m-0">
						<thead>
							<tr class="bg-sky-800 text-white">
								<th class="sm:px-4 p-2 text-left text-sm font-medium border text-white w-1/2"
									>Department</th
								>
								<th
									class="sm:px-4 p-2 text-left text-sm font-medium border whitespace-nowrap text-white w-1/2"
									>Last Date</th
								>
								<!-- {#if data.content.last_date && (data.content.category === 'latest-job' || data.content.category === 'admit-cards' || data.content.category === 'admissions')} -->
								<th
									class="sm:px-4 p-2 text-left text-sm font-medium border whitespace-nowrap text-white w-1/2"
									>Time Left</th
								>
								<!-- {/if} -->
							</tr>
						</thead>
						<tbody class="divide-y">
							<tr>
								<td class="sm:px-4 p-2 text-sm border">{data.content.department?.title || '—'}</td>
								<td class="sm:px-4 p-2 text-sm border whitespace-nowrap {daysLeft(data.content.last_date) < 10 ? 'text-rose-700' : 'text-slate-600'}"
									>{new Date(data.content.last_date)
										.toLocaleDateString('en-GB')
										.replaceAll('/', '-')}</td
								>
								<!-- {#if data.content.last_date && (data.content.category === 'latest-job' || data.content.category === 'admit-cards' || data.content.category === 'admissions')} -->
								<td
									class="sm:px-4 p-2 text-sm border font-semibold {daysLeft(
										data.content.last_date
									) < 10
										? 'text-rose-700 bg-rose-50'
										: 'text-green-600'}"
									>{daysLeftLabel(data.content.last_date)}
								</td>
								<!-- {/if} -->
							</tr>
						</tbody>
					</table>
					<table class="min-w-full border border-collapse table-auto !m-0">
						<thead>
							<tr class="bg-sky-800 text-white">
								<th
									class="sm:px-4 p-2 text-left text-sm font-medium border whitespace-nowrap text-white w-1/2"
									>Total Posts</th
								>
								<th
									class="sm:px-4 p-2 text-left text-sm font-medium border whitespace-nowrap text-white"
									>Action</th
								>
							</tr>
						</thead>
						<tbody class="divide-y">
							<tr>
								<td class="sm:px-4 p-2 text-sm border font-semibold text-green-600">{data.content.total_posts}</td>
								<td class="sm:px-4 p-2 text-sm border font-semibold">
									<Button
										href={data.content.reference_url}
										target="_blank"
										variant="success"
										size="sm"
										class={'no-underline !w-full'}
									>
										{buttonLabel}
									</Button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</Card.Header>
		<Card.Content class="px-3 lg:px-6">
			<div class="prose max-w-none pt-5">
				<div class="grid grid-cols-12 gap-5">
					<!-- Important Dates -->
					<ImportantDates dates={data.content.important_dates} />

					<!-- Application Fee -->
					<ApplicationFees fees={data.content.application_fee} />
				</div>
				 
					<!-- Eligibility Criteria -->
					<div class="flex flex-col mt-5">
						<div class="bg-sky-800 py-2 px-3">
							<h3 class="text-xl font-semibold text-white !m-0 p-0">Eligibility Criteria</h3>
						</div>
						<div class="border border-slate-200 !mt-0 px-3 sm:px-5">
							<RichTextRenderer content={data.content.eligiblity_criterea?.content} />
						</div>
					</div>
				 

				<div class="flex flex-col mt-5">
					<h2 class="!m-0 text-sky-800">Detailed Overview & Vacancy Details</h2>
					<RichTextRenderer content={data.content?.content} />
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
						<h3 class="text-sky-800 text-center uppercase">Important Links</h3>
						<table class="min-w-full border border-collapse table-auto">
							<thead>
								<tr class="bg-sky-800 text-white">
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
										<td class="sm:px-4 p-2 text-xs sm:text-sm border">
											<a
												href={link.URL}
												target="_blank"
												class="text-rose-600 hover:text-indigo-600 font-semibold no-underline text-nowrap"
												>Click Here
											</a>
										</td>
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
			<h3 class="text-sky-800 text-center md:text-left">
				<span class="block">FAQs: {data.content.title}</span>
			</h3>
			<Accordion.Root type="single" class="gap-2">
				{#each data.content.FAQs as question, index}
					<Accordion.Item value="item-{index}" class="mb-2 border-0">
						<Card.Root class="overflow-hidden rounded-md gap-0 p-2">
							<Card.Header class="flex flex-col items-start justify-start gap-3 px-2 sm:px-4">
								<Accordion.Trigger class="lg:text-lg hover:no-underline"
									>{question.Question}</Accordion.Trigger
								>
							</Card.Header>
							<Card.Content class="px-2 sm:px-4">
								<Accordion.Content class="lg:text-lg">{question.Answer}</Accordion.Content>
							</Card.Content>
						</Card.Root>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</div>
	{/if}

	<!-- Education Criterea -->
	<Card.Root class="overflow-hidden rounded-md gap-0 p-2">
		<Card.Header class="flex flex-col items-start justify-start gap-3 px-2 sm:px-4">
			<h3 class="text-sky-800 text-center uppercase font-semibold">Disclaimer</h3>
		</Card.Header>
		<Card.Content class="p-2 sm:px-4 ">
			<RichTextRenderer content={data.content.job_disclaimer?.content} />
		</Card.Content>
	</Card.Root>
	<div class="flex justify-center py-5">
		<Button
			href={data.content.reference_url}
			variant="success"
			target="_blank"
			class="no-underline w-60"
			size="xl">{buttonLabel}</Button
		>
	</div>
</Layout>
