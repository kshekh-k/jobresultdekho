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
	export let type: string | undefined;
	export let items: {
		id?: number;
		department?: any;
		category?: any;
		slug?: string;
		title?: string;
		last_date?: any;
		timeLeft?: string;
		target?: string;
		reference_url?: string;
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
					<div class="flex gap-2 flex-1">
						<div class="shrink-0 md:min-w-6">{header.id}</div>
						<div class="flex-1">{header.label}</div>						
					</div>
						<div class="w-20 shrink-0">{header.department}</div>
						<div class="w-24 shrink-0">{header.date}</div>					 
						<div class="w-20 shrink-0">{header.timeLeft}</div>					 
						<div class="w-full md:w-48 shrink-0 text-right">{header.action}</div>
					{/each}
				</div>
				{#each items.slice(0, 10) as item, index}
					<div
						class="flex flex-wrap justify-between gap-2 md:gap-y-2 px-2 sm:px-4 even:bg-white odd:bg-slate-50 py-2 md:py-1 items-start md:items-center  font-medium text-slate-600"
					>
					<div class="flex gap-2 md:flex-1 items-center w-full md:w-auto">
						<div class="shrink-0 md:min-w-6">{index+1}.</div>
						
						<div class="flex-1">
							<a
								href="{catLabel}/{type}/{item.slug}"
								target={item.target}
								class="hover:text-sky-700 text-sky-600 font-medium transition-colors flex-1 hover:underline md:py-1.5 line-clamp-2 "
							>
								{item.title} 
							</a>
						</div>
					</div>
					<div class="w-28 md:w-20 shrink-0 order-2 flex gap-1 items-center ">
							<Icon name={Landmark} size={16} className="md:hidden" />
							{item.department?.title || '—'}
						</div>
						<div class="md:w-24 shrink-0 order-3 md:order-4 flex gap-1 items-center ">
							<Icon name={Calendar} size={16} className="md:hidden" />
							{formatDate(item.last_date)}
						</div>
						{#if item.last_date}
							<div class="md:w-20 shrink-0 order-4 md:order-5 flex gap-1 items-center {daysLeft(item.last_date) < 10
										? 'text-rose-700' : 'text-green-600'}">
								<Icon name={Clock} size={16} className="md:hidden" />
								<b class="inline-flex py-1 font-semibold ">{daysLeftLabel(item.last_date)}</b>
							</div>
							{:else}
							<div class="md:w-20 shrink-0 order-4 md:order-5 flex gap-1 items-center">
								<Icon name={Clock} size={16} className="md:hidden" />
								<a href="https://whatsapp.com/channel/0029VbBRYR7BA1f2coUANV3b" class="inline-flex py-1 font-semibold no-underline text-indigo-500 hover:text-rose-500" target="_blank">Be Alert</a>
							</div>
						{/if}
						<div class="w-full md:w-48 gap-1 shrink-0 flex justify-between md:justify-end order-6">
							<Button
								href="{catLabel}/{type}/{item.slug}"
								target={item.target}
								variant="light"
								size="sm"
							>
								View Detail
							</Button>
							<Button href={item.reference_url} target="_blank" variant="success" size="sm">
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
