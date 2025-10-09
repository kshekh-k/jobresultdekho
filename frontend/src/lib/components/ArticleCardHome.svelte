<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Calendar, ChevronDown, Clock, Landmark } from 'lucide-svelte';
	import { cn } from '$lib/utils.js';
	import Icon from './ui/Icon.svelte';
	import Button from './ui/button/button.svelte';
	import { daysLeft } from '$lib/utils';

	export let title: string | undefined;
	export let articleId: string | undefined;
	export let articleWrap: string | undefined;
	export let headerColor: string = 'bg-sky-500';
	export let catLabel: string = '/latest-job';
	export let buttonLabel: string | undefined =
		catLabel === 'latest-job'
			? 'Apply'
			: catLabel === 'result'
				? 'View'
				: catLabel === 'admit-card'
					? 'Download'
					: catLabel === 'admission'
						? 'View'
						: catLabel === 'answer-key'
							? 'Match'
							: catLabel === 'syllabus'
								? 'Check'
								: undefined;
	export let sourceUrl: string | undefined;
	export let type: string | undefined;
	export let items: {
		id?: number;
		department?: any;
		category?: any;
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

	export let viewText: string = 'View All';

	export let open: boolean = true;
	const toggle = () => {
		open = !open;
	};
</script>

<div id={articleId} class={articleWrap}>
	<Card.Root class="overflow-hidden p-0 rounded-md gap-0">
		<!-- Header -->
		<Card.Header
			class="flex items-center justify-between cursor-pointer py-2 px-4 gap-2 {headerColor}"
			onclick={toggle}
			role="button"
		>
			<h3 class="text-lg font-semibold text-white">{title}</h3>
			<span class="p-1 rounded-sm hover:bg-white/20 focus:outline-none text-white">
				<Icon name={ChevronDown} className={open ? 'rotate-180' : 'rotate-0'} size={20} />
			</span>
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
						<div class="w-full md:w-28 shrink-0 text-right">{header.action}</div>
					{/each}
				</div>
				{#each items as item}
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
								href="{item.category.slug}/{type}/{item.slug}"
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
								<b
									class="inline-flex py-1 px-2 font-semibold {daysLeft(item.last_date) < 10
										? 'text-rose-700 bg-rose-100'
										: 'text-green-600 bg-green-100'}">{daysLeft(item.last_date)}</b
								>
							</div>
						{/if}
						<div class="w-full md:w-28 gap-1 shrink-0 flex justify-end order-6">
							<Button
								href="{catLabel}/{type}/{item.slug}"
								target={item.target}
								variant="light"
								size="xs"
							>
								Detail
							</Button>
							<Button href={sourceUrl} target={item.target} variant="success" size="xs">
								{buttonLabel}
							</Button>
						</div>
					</div>
				{/each}
			</Card.Content>
			<!-- Footer -->
			{#if viewText && items.length > 10}
				<Card.Footer class="flex !p-3 border-t justify-end">
					<Button href={catLabel} variant="success">{viewText}</Button>
				</Card.Footer>
			{/if}
		{/if}
	</Card.Root>
</div>
