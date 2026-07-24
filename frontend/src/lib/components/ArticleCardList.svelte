<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import { Calendar, ChevronDown, Clock, Landmark } from 'lucide-svelte';
	import { cn, SITE_NAME, SITE_URL } from '$lib/utils.js';
	import Icon from './ui/Icon.svelte';
	import Button from './ui/button/button.svelte';
	import { daysLeft, daysLeftLabel, formatDate } from '$lib/utils';
	import DynamicAd from './DynamicAd.svelte';

	export let title: string | undefined;
	export let headerColor: string = 'bg-sky-500';
	export let slug: string = '/latest-job';
	export let open: boolean = true;

	let job = slug === 'latest-job';
	let admitcard = slug === 'admit-card';
	let result = slug === 'result';
	let answerkey = slug === 'answer-key';
	let syllabus = slug === 'syllabus';
	let admission = slug === 'admission';

	export let buttonLabel: string | undefined = job
		? 'Apply'
		: result
			? 'View'
			: admitcard
				? 'Download'
				: admission
					? 'View'
					: answerkey
						? 'Match'
						: syllabus
							? 'Check'
							: 'View';

	export let type: string | undefined;
	export let items: {
		id?: number;
		department?: any;
		slug?: string;
		title?: string;
		last_date?: any;
		target?: string;
		reference_url?: string;
		Link_not_available?: boolean;
		Start_date?: boolean;
		Apply_date_Start_message?: string;
	}[] = [];

	export let headers: {
		id?: string;
		department?: string;
		label?: string;
		date?: string;
		action?: string;
	}[] = [];

	const toggle = () => (open = !open);

	// ✅ Pagination setup
	let perPage = 25;
	let currentPage = 1;

	// ✅ Derived pagination data
	$: totalItems = items.length;
	$: totalPages = Math.ceil(totalItems / perPage);
	$: start = (currentPage - 1) * perPage;
	$: end = start + perPage;
	$: paginatedItems = items.slice(start, end);

	function handlePageChange(page: number) {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
		}
	}
</script>

<Card.Root class="overflow-hidden p-0 rounded-md gap-0" style="--headerColor:var({headerColor})">
	<!-- Collapsible Content -->
	{#if open}
		<Card.Content class="p-0 divide-y">
			<div
				class="flex flex-wrap justify-between gap-2 px-2 sm:px-4 bg-(color:--headerColor) text-sm font-medium py-2 text-white"
			>
				{#each headers as header}
					<div class="hidden md:flex gap-2 flex-1">
						<div class="shrink-0 min-w-6">{header.id}</div>
						<div class="flex-1">{header.label}</div>
					</div>
					<div class="md:w-24 shrink-0">
						<span class="flex gap-1 items-center"
							><span class="md:hidden inline-flex items-center"
								><Icon name={Landmark} size={14} />
							</span>{header.department}</span
						>
					</div>
					{#if type !== 'syllabus'}
						<div class="md:w-24 shrink-0">
							<span class="flex gap-1 items-center"
								><span class="md:hidden inline-flex items-center"
									><Icon name={Calendar} size={14} />
								</span>{header.date}</span
							>
						</div>
					{/if}
					<div class="md:w-48 shrink-0 text-right hidden md:flex justify-end">{header.action}</div>
				{/each}
			</div>

			<!-- ✅ Show only current page items -->
			{#each paginatedItems as item, index}
				<div
					id="{slug}-{item.id}"
					class="flex flex-wrap justify-between gap-2 md:gap-y-2 px-2 sm:px-4 even:bg-white odd:bg-slate-50 py-2 md:py-1 items-start md:items-center text-sm font-medium text-slate-600"
				>
					<div class="flex gap-2 md:flex-1 items-start w-full md:w-auto">
						<div class="shrink-0 md:min-w-6 md:py-2">
							{(currentPage - 1) * perPage + index + 1}.
						</div>
						<div class="flex-1 order-1">
							<a
								rel="nofollow noopener noreferrer external"
								title={item.title}
								href="{slug}/{type}/{item.slug}"
								target={item.target}
								class="text-neutral-700 hover:text-(color:--headerColor) font-medium transition-colors flex-1 md:py-2 line-clamp-2"
							>
								{item.title}
							</a>
						</div>
					</div>
					<div class="w-28 md:w-24 shrink-0 order-2 flex gap-1 items-center">
						<Icon name={Landmark} size={14} className="md:hidden" />
						<span class="max-w-full truncate text-sm">{item.department?.title || '—'}</span>
					</div>
					{#if type !== 'syllabus'}
						<div class="md:w-24 shrink-0 order-3 md:order-4 flex gap-1 items-center">
							<Icon name={Calendar} size={14} className="md:hidden" />
							{#if item.Apply_date_Start_message}
								<span class="text-sm block line-clamp-2">{item.Apply_date_Start_message}</span>
							{:else if formatDate(item.last_date)}
								<span class="text-sm block line-clamp-2">{formatDate(item.last_date)}</span>
							{:else if !item.Apply_date_Start_message && !formatDate(item.last_date)}
								<span class="text-sm block line-clamp-2">—</span>
							{/if}
						</div>
					{/if}

					<div class="w-full md:w-48 gap-1 shrink-0 flex justify-between md:justify-end order-6">
						<Button
							title="Detail"
							href="{slug}/{type}/{item.slug}"
							target={item.target}
							variant="light"
							size="sm"
						>
							Detail
						</Button>
						{#if item.reference_url && !item.Link_not_available}
							<Button
								title={buttonLabel}
								href={item.reference_url}
								rel="nofollow noopener noreferrer external"
								target="_blank"
								size="sm"
								class="bg-(color:--headerColor)"
							>
								{buttonLabel}
							</Button>
						{/if}
					</div>
				</div>
				<!-- ✅ Insert AD after every 10 items -->
				{#if index === 3}
					<div class="p-2 sm:px-4 bg-white text-center">
						<!-- Your Ads Section / Banner / Script Ad for Mobile desktop and Google Adsense-->
						<DynamicAd adSlug="list-mid-ad-1" />
					</div>
				{/if}

				{#if index === 15}
					<div class="p-2 sm:px-4 bg-white text-center">
						<!-- Your Ad / Banner / Script -->
						<DynamicAd adSlug="list-mid-ad-2" />
					</div>
				{/if}
			{/each}
		</Card.Content>

		<!-- ✅ Pagination Footer -->
		{#if totalItems > perPage}
			<div class="p-3 flex justify-center">
				<Pagination.Root count={totalItems} {perPage}>
					{#snippet children({ pages, currentPage })}
						<Pagination.Content>
							<!-- Previous Button -->
							<Pagination.Item>
								<Pagination.PrevButton onclick={() => handlePageChange(currentPage - 1)} />
							</Pagination.Item>
							<!-- 🟢 Page Numbers -->
							{#each pages as page (page.key)}
								{#if page.type === 'ellipsis'}
									<Pagination.Item>
										<Pagination.Ellipsis />
									</Pagination.Item>
								{:else}
									<Pagination.Item>
										<Pagination.Link
											{page}
											isActive={currentPage === page.value}
											onclick={() => handlePageChange(page.value)}
										>
											{page.value}
										</Pagination.Link>
									</Pagination.Item>
								{/if}
							{/each}
							<!-- Next Page Button -->
							<Pagination.Item>
								<Pagination.NextButton onclick={() => handlePageChange(currentPage + 1)} />
							</Pagination.Item>
						</Pagination.Content>
					{/snippet}
				</Pagination.Root>
			</div>
		{/if}
	{/if}
</Card.Root>
