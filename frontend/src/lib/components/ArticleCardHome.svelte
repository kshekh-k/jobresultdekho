<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Calendar, ChevronDown, Clock, Landmark } from 'lucide-svelte';
	import { cn } from '$lib/utils.js';
	import Icon from './ui/Icon.svelte';
	import Button from './ui/button/button.svelte';
	import { daysLeft, daysLeftLabel, formatDate } from '$lib/utils';
	import { getCalendarDaysRemaining } from '$lib/closingSoon';

	export let title: string | undefined;
	export let articleId: any | undefined;
	export let articleWrap: string | undefined;
	export let headerColor: string = '--color-neutral-900';
	export let slug: string = '/latest-job';
	export let viewAllHref: string | undefined = undefined;
	export let sortBy: 'updatedAt' | 'last_date' | 'none' = 'updatedAt';

	$: job = slug === 'latest-job';
	$: isClosingSoon = articleId === 'closing-soon' || viewAllHref === '/closing-soon' || title === 'Closing Soon';
	$: admitcard = slug === 'admit-card';
	$: result = slug === 'result';
	$: answerkey = slug === 'answer-key';
	$: syllabus = slug === 'syllabus';
	$: admission = slug === 'admission';

	$: buttonLabel = (job || isClosingSoon)
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
		category?: any;
		slug?: string;
		title?: string;
		last_date?: any;
		target?: string;
		reference_url?: string;
		Link_not_available?: boolean;
		Start_date?: boolean;
		Apply_date_Start_message?: string;
		createdAt?: string;
		updatedAt?: string;
		created_at?: string;
		updated_at?: string;
	}[] = [];

	export let headers: {
		id?: string;
		department?: string;
		label?: string;
		date?: string;
		closingIn?: string;
		action?: string;
	}[] = [];

	export let viewText: string = 'View All';

	export let open: boolean = true;
	const toggle = () => {
		open = !open;
	};

	$: sortedItems = [...items].sort((a, b) => {
		if (sortBy === 'none') return 0;
		if (sortBy === 'last_date') {
			const aDiff = getCalendarDaysRemaining(a.last_date);
			const bDiff = getCalendarDaysRemaining(b.last_date);
			const aVal = aDiff !== null ? aDiff : Infinity;
			const bVal = bDiff !== null ? bDiff : Infinity;
			if (aVal !== bVal) return aVal - bVal;
			return (a.title || '').localeCompare(b.title || '');
		}

		const aUpdated = new Date(
			a.updatedAt || a.updated_at || a.createdAt || a.created_at || 0
		).getTime();

		const bUpdated = new Date(
			b.updatedAt || b.updated_at || b.createdAt || b.created_at || 0
		).getTime();

		// Latest updated post first
		if (bUpdated !== aUpdated) {
			return bUpdated - aUpdated;
		}

		// If updated time is same, latest created post first
		const aCreated = new Date(a.createdAt || a.created_at || 0).getTime();
		const bCreated = new Date(b.createdAt || b.created_at || 0).getTime();

		if (bCreated !== aCreated) {
			return bCreated - aCreated;
		}

		// Final stable fallback
		return (b.id || 0) - (a.id || 0);
	});
</script>

<div id={articleId} class={articleWrap} style="--headerColor:var({headerColor})">
	<Card.Root class="overflow-hidden p-0 rounded-md gap-0">
		<!-- Header -->
		<Card.Header
			class="flex items-center justify-between cursor-pointer py-2 px-4 gap-2 bg-(--headerColor)"
		>
			<div class="flex items-center gap-2">
				{#if isClosingSoon}
					<Icon name={Clock} size={20} className="text-white" />
				{/if}
				<h3 class="text-lg font-semibold text-white">{title}</h3>
			</div>
			<div class="flex justify-between items-center gap-1">
				<a
					href={viewAllHref || slug}
					title={viewText}
					class="sm:px-3 p-2 bg-white/20 hover:bg-white/10 text-sm rounded text-white no-underline leading-none ease-in-out duration-200"
					>{viewText}</a
				>
				<button
					onclick={toggle}
					class="p-1 rounded-sm hover:bg-white/20 focus:outline-none text-white cursor-pointer"
				>
					<Icon name={ChevronDown} className={open ? 'rotate-180' : 'rotate-0'} size={20} />
				</button>
			</div>
		</Card.Header>

		<!-- Collapsible Content -->
		{#if open}
			<Card.Content class="p-0 divide-y">
				<div
					class="flex flex-wrap gap-2 justify-between px-2 sm:px-4 bg-slate-100 text-sm font-medium py-2 text-slate-800"
				>
					{#each headers as header}
						<div class="hidden md:flex gap-2 flex-1">
							<div class="shrink-0 md:min-w-6">{header.id}</div>
							<div class="flex-1">{header.label}</div>
						</div>
						<div class="md:w-20 shrink-0">
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
						{#if isClosingSoon}
							<div class="md:w-24 shrink-0 text-center">
								<span class="flex gap-1 items-center justify-center">
									<span class="md:hidden inline-flex items-center"
										><Icon name={Clock} size={14} />
									</span>{header.closingIn || 'Closing In'}</span
								>
							</div>
						{/if}

						<div class="w-full md:w-48 shrink-0 text-right hidden md:flex justify-end">
							{header.action}
						</div>
					{/each}
				</div>
				{#each sortedItems.slice(0, 10) as item, index}
					<div
						class="flex flex-wrap justify-between gap-2 md:gap-y-2 px-2 sm:px-4 even:bg-white odd:bg-slate-50 py-2 md:py-1 items-start md:items-center font-medium text-slate-600"
					>
						<div class="flex gap-2 md:flex-1 items-start w-full md:w-auto">
							<div class="shrink-0 md:min-w-6 md:py-1.5">{index + 1}.</div>

							<div class="flex-1">
								<a
									href="{slug}/{type}/{item.slug}"
									title={item.title}
									class="text-neutral-700 hover:text-(--headerColor) font-medium transition-colors flex-1 md:py-1.5 line-clamp-2"
								>
									{item.title}
								</a>
							</div>
						</div>
						<div class="w-28 md:w-20 shrink-0 order-2 flex gap-1 items-center">
							<Icon name={Landmark} size={14} className="md:hidden" />
							<span class="max-w-full truncate text-sm">{item.department?.title || '—'}</span>
						</div>
						{#if type !== 'syllabus'}
							<div class="md:w-24 shrink-0 order-3 md:order-4 flex flex-col gap-0.5 justify-center">
								<div class="flex gap-1 items-center">
									<Icon name={Calendar} size={14} className="md:hidden" />
									{#if item.Apply_date_Start_message}
										<span class="text-sm block line-clamp-2">{item.Apply_date_Start_message}</span>
									{:else if formatDate(item.last_date)}
										<span class="text-sm block line-clamp-2">{formatDate(item.last_date)}</span>
									{:else}
										<span class="text-sm block line-clamp-2">—</span>
									{/if}
								</div>
							</div>
						{/if}
						{#if isClosingSoon}
							{@const days = getCalendarDaysRemaining(item.last_date)}
							<div class="md:w-24 shrink-0 order-4 md:order-5 flex items-center md:justify-center">
								{#if days !== null && days >= 0 && days <= 7}
									<span
										class="text-sm inline-block text-center w-fit {days <=
										1
											? 'bg-rose-50 text-rose-700'
											: 'bg-amber-50 text-amber-700'}"
									>
										{#if days === 0}
											End Today
										{:else}
											{days} days left
										{/if}
									</span>
								{/if}
							</div>
						{/if}

						<div class="w-full md:w-48 gap-1 shrink-0 flex justify-between md:justify-end order-6">
							<Button
								href="{slug}/{type}/{item.slug}"
								title={'View Detail'}
								variant="light"
								size="sm"
							>
								View Detail
							</Button>
							{#if item.reference_url && !item.Link_not_available}
								<Button
									href={item.reference_url}
									title={buttonLabel}
									rel="nofollow noopener noreferrer external"
									target="_blank"
									size="sm"
									class="bg-(--headerColor)"
								>
									{buttonLabel}
								</Button>
							{/if}
						</div>
					</div>
				{/each}
				{#if sortedItems.length === 0}
					<div class="p-6 text-center text-sm text-slate-500 bg-white">
						<p class="font-medium text-slate-700">No updates available currently.</p>
					</div>
				{/if}
			</Card.Content>
		{/if}
	</Card.Root>
</div>
