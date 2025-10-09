<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import { Calendar, ChevronDown, Clock, Landmark } from 'lucide-svelte';
	import { cn } from '$lib/utils.js';
	import Icon from './ui/Icon.svelte';
	import Button from './ui/button/button.svelte';
	import { daysLeft } from '$lib/utils';

	export let title: string | undefined;
	export let headerColor: string = 'bg-sky-500';
	export let catLabel: string = '/latest-job';
	export let open: boolean = true;
	export let buttonLabel: string | undefined = catLabel === 'latest-job' ? 'Apply' : catLabel === 'result' ? 'View' : catLabel === 'admit-card' ? 'Download' : catLabel === 'admission' ? 'View' : catLabel === 'answer-key' ? 'Match' : catLabel === 'syllabus' ? 'Check' : undefined;
	export let sourceUrl: string | undefined;
	export let type: string | undefined;
	export let items: {
		id?: number;
		department?: any;
		slug?: string;
		title?: string;
		last_date?: string;
		timeLeft?: string;
		target?: string;
	}[] = [];

	export let headers: {
		id?: string;
		department?: string;
		label?: string;
		date?: string;
		timeLeft?: string;
		action?: string;
	}[] = [];

	const toggle = () => (open = !open);

	// ✅ Pagination setup
	let perPage = 50;
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

<Card.Root class="overflow-hidden p-0 rounded-md gap-0">
	<!-- Header -->
	<Card.Header
		class="flex items-center justify-between cursor-pointer py-2 px-4 gap-2 {headerColor}"
	>
		<h3 class="text-lg font-semibold text-white">{title}</h3>
	</Card.Header>

	<!-- Collapsible Content -->
	{#if open}
		<Card.Content class="p-0 divide-y">
			<div
				class="hidden md:flex flex-wrap gap-2 px-4 bg-slate-100 text-sm font-medium py-2 text-slate-800"
			>
				{#each headers as header}
					<div class="w-8 shrink-0">{header.id}</div>
					<div class="w-24 shrink-0">{header.department}</div>
					<div class="flex-1">{header.label}</div>
					<div class="w-24 shrink-0">{header.date}</div>
					{#if header.timeLeft}
						<div class="w-20 shrink-0">{header.timeLeft}</div>
					{/if}
					<div class="md:w-28 shrink-0 text-right">{header.action}</div>
				{/each}
			</div>

			<!-- ✅ Show only current page items -->
			{#each paginatedItems as item}
				<div
					class="flex flex-wrap justify-between gap-2 md:gap-y-2 px-2 sm:px-4 even:bg-white odd:bg-slate-50 py-2 md:py-1 items-start md:items-center text-sm font-medium text-slate-600"
				>
					<div class="w-8 shrink-0 order-0 hidden md:block">{item.id}.</div>
					<div class="w-28 md:w-24 shrink-0 order-2 md:order-1 flex gap-1 text-xs">
						<Icon name={Landmark} size={24} className="md:hidden" />
						{item.department.title}
					</div>
					<div class="md:flex-1 w-[calc(100%-32px)] md:w-auto order-1 md:order-2">
						<a
							href="{catLabel}/{type}/{item.slug}"
							target={item.target}
							class="block hover:text-sky-700 text-sky-600 font-medium transition-colors flex-1 hover:underline md:py-1 text-sm"
						>
							{item.title}
						</a>
					</div>
					<div class="md:w-24 shrink-0 order-3 md:order-4 flex gap-1 text-xs">
						<Icon name={Calendar} size={24} className="md:hidden" />
						{item.last_date}
					</div>
					{#if item.last_date}
						<div class="md:w-20 shrink-0 order-4 md:order-5 flex gap-1 text-xs">
							<Icon name={Clock} size={24} className="md:hidden" />
							<b class="inline-flex py-1 px-2 font-semibold {daysLeft(item.last_date) < 10
									? 'text-rose-700 bg-rose-100'
									: 'text-green-600 bg-green-100'}"
							>
								{daysLeft(item.last_date)}
							</b>
						</div>
					{/if}
					<div class="w-full md:w-28 gap-1 shrink-0 flex justify-end order-6">
						<Button href="{catLabel}/{type}/{item.slug}" target={item.target} variant="light" size="xs">
							Detail
						</Button>
						<Button href={sourceUrl} target={item.target} variant="success" size="xs">
							{buttonLabel}
						</Button>
					</div>
				</div>
			{/each}
		</Card.Content>

		<!-- ✅ Pagination Footer -->
		{#if totalItems > perPage}
			<div class="p-3 flex justify-center">
				<Pagination.Root count={totalItems} {perPage}>
					{#snippet children({ pages, currentPage })}
						<Pagination.Content>
							<Pagination.Item>
								<Pagination.PrevButton onclick={() => handlePageChange(currentPage - 1)} />
							</Pagination.Item>

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
