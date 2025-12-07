<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Calendar, ChevronDown, Clock, Landmark } from 'lucide-svelte';
	import { cn } from '$lib/utils.js';
	import Icon from './ui/Icon.svelte';
	import Button from './ui/button/button.svelte';
	import { daysLeft, daysLeftLabel, formatDate } from '$lib/utils';

	export let title: string | undefined;
	export let articleId: any | undefined;
	export let articleWrap: string | undefined; 
	export let headerColor: string = '--color-neutral-900';
	export let slug: string = '/latest-job';

	let job = slug === 'latest-job';
	let admitcard = slug === 'admit-card';
	let result = slug === 'result';
	let answerkey = slug === 'answer-key';
	let syllabus = slug === 'syllabus';
	let admission = slug === 'admission';

	export let buttonLabel: string | undefined =
		job
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
	}[] = [];

	export let headers: {
		id?: string;
		department?: string;
		label?: string;
		date?: string; 
		action?: string;
	}[] = [];

	export let viewText: string = 'View All';

	export let open: boolean = true;
	const toggle = () => {
		open = !open;
	};
</script>

<div id={articleId} class={articleWrap} style="--headerColor:var({headerColor})">
	<Card.Root class="overflow-hidden p-0 rounded-md gap-0">
		<!-- Header -->
		<Card.Header
			class="flex items-center justify-between cursor-pointer py-2 px-4 gap-2 bg-(color:--headerColor)"
		>
			<h3 class="text-lg font-semibold text-white">{title}</h3>
			<div class="flex justify-between items-center gap-1">
				<a href={slug} title={viewText} class="sm:px-3 p-2 bg-white/20 hover:bg-white/10 text-sm rounded text-white no-underline leading-none ease-in-out duration-200">{viewText}</a>
				<button
					onclick={toggle}
					class="p-1 rounded-sm  hover:bg-white/20 focus:outline-none text-white cursor-pointer"
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
						<div class="md:w-20 shrink-0"><span class="flex gap-1 items-center"><span class="md:hidden inline-flex items-center"><Icon name={Landmark} size={14}  /> </span>{header.department}</span></div>
						{#if type !== 'syllabus'}
							<div class="md:w-24 shrink-0"><span class="flex gap-1 items-center"><span class="md:hidden inline-flex items-center"><Icon name={Calendar} size={14}  /> </span>{header.date}</span></div>
						{/if}
					 
						<div class="w-full md:w-48 shrink-0 text-right hidden md:flex justify-end">{header.action}</div>
					{/each}
				</div>
				{#each items.slice(0, 10) as item, index}
					<div
						class="flex flex-wrap justify-between gap-2 md:gap-y-2 px-2 sm:px-4 even:bg-white odd:bg-slate-50 py-2 md:py-1 items-start md:items-center font-medium text-slate-600"
					>
						<div class="flex gap-2 md:flex-1 items-start w-full md:w-auto">
							<div class="shrink-0 md:min-w-6 md:py-1.5">{index + 1}.</div>

							<div class="flex-1">
								<a  
									href="{slug}/{type}/{item.slug}" title={item.title}
								 
									class="text-neutral-700 hover:text-(color:--headerColor) font-medium transition-colors flex-1 md:py-1.5 line-clamp-2"
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
							<div class="md:w-24 shrink-0 order-3 md:order-4 flex gap-1 items-center">
								<Icon name={Calendar} size={14} className="md:hidden" />
								<span class="text-sm">{formatDate(item.last_date)}</span>
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
							<Button href={item.reference_url} title={buttonLabel} rel="nofollow noopener noreferrer external" target="_blank" size="sm" class="bg-(color:--headerColor)">
								{buttonLabel}
							</Button>
						</div>
					</div>
				{/each}
			</Card.Content>
		{/if}
	</Card.Root>
</div>
