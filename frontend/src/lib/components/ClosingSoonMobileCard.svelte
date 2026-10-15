<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Calendar, ChevronDown, Clock, Landmark } from 'lucide-svelte';
	import Icon from './ui/Icon.svelte';
	import Button from './ui/button/button.svelte';
	import { formatDate } from '$lib/utils';
	import { getCalendarDaysRemaining } from '$lib/closingSoon';

	export let items: any[] = [];
	export let open: boolean = true;
	export let limit: number = 10;

	const toggle = () => {
		open = !open;
	};

	$: displayItems = items.slice(0, limit);
</script>

<div id="closing-soon-mobile" class="w-full">
	<Card.Root class="overflow-hidden p-0 rounded-md gap-0">
		<!-- Header -->
		<Card.Header
			class="flex items-center justify-between cursor-pointer py-2 px-4 gap-2 bg-rose-900"
		>
			<div class="flex items-center gap-2">
				<Icon name={Clock} size={20} className="text-white" />
				<h3 class="text-lg font-semibold text-white">Closing Soon (Next 7 Days)</h3>
			</div>
			<div class="flex justify-between items-center gap-1">
				<a
					href="/closing-soon"
					title="View All Closing Soon Jobs"
					class="sm:px-3 p-2 bg-white/20 hover:bg-white/10 text-sm rounded text-white no-underline leading-none ease-in-out duration-200"
				>
					View All
				</a>
				<button
					onclick={toggle}
					type="button"
					aria-label="Toggle Closing Soon Section"
					class="p-1 rounded-sm hover:bg-white/20 focus:outline-none text-white cursor-pointer"
				>
					<Icon name={ChevronDown} className={open ? 'rotate-180' : 'rotate-0'} size={20} />
				</button>
			</div>
		</Card.Header>

		<!-- Collapsible Content -->
		{#if open}
			<Card.Content class="p-0 divide-y">
				{#if displayItems.length > 0}
					<!-- Table Header -->
					<div
						class="flex flex-wrap gap-2 justify-between px-2 sm:px-4 bg-slate-100 text-sm font-medium py-2 text-slate-800"
					>
						<div class="flex gap-2 flex-1">
							<div class="shrink-0 min-w-6">No.</div>
							<div class="flex-1">Post</div>
						</div>
						<div class="w-20 shrink-0">
							<span class="flex gap-1 items-center">
								<Icon name={Landmark} size={14} /> Dept
							</span>
						</div>
						<div class="w-24 shrink-0">
							<span class="flex gap-1 items-center">
								<Icon name={Calendar} size={14} /> Last Date
							</span>
						</div>
						<div class="w-full md:w-48 shrink-0 text-right hidden md:flex justify-end">Action</div>
					</div>

					<!-- Job Rows -->
					{#each displayItems as item, index}
						{@const days = getCalendarDaysRemaining(item.last_date)}
						<div
							class="flex flex-wrap justify-between gap-2 md:gap-y-2 px-2 sm:px-4 even:bg-white odd:bg-slate-50 py-2.5 items-start font-medium text-slate-600"
						>
							<div class="flex gap-2 flex-1 items-start w-full">
								<div class="shrink-0 min-w-6 pt-0.5">{index + 1}.</div>
								<div class="flex-1">
									<a
										href={`/latest-job/jobs/${item.slug}`}
										title={item.title}
										class="text-neutral-800 hover:text-rose-900 font-medium transition-colors line-clamp-2"
									>
										{item.title}
									</a>
								</div>
							</div>

							<div class="w-28 shrink-0 order-2 flex gap-1 items-center text-xs">
								<Icon name={Landmark} size={14} className="text-slate-400" />
								<span class="max-w-full truncate">{item.department?.title || 'Govt Job'}</span>
							</div>

							<div class="w-28 shrink-0 order-3 flex flex-col gap-0.5">
								<div class="flex gap-1 items-center text-xs">
									<Icon name={Calendar} size={14} className="text-slate-400" />
									<span>{formatDate(item.last_date)}</span>
								</div>
								{#if days !== null}
									<span
										class="text-[10px] font-semibold rounded px-1 py-0.2 inline-block w-fit {days <=
										1
											? 'text-rose-700 bg-rose-50 border border-rose-200'
											: 'text-amber-800 bg-amber-50 border border-amber-200'}"
									>
										{days === 0 ? 'Closes Today' : `${days} ${days === 1 ? 'day' : 'days'} left`}
									</span>
								{/if}
							</div>

							<div class="w-full gap-2 shrink-0 flex justify-end order-4 pt-1">
								<Button
									href={`/latest-job/jobs/${item.slug}`}
									title="View Detail"
									variant="light"
									size="sm"
									class="text-xs"
								>
									View Detail
								</Button>
								{#if item.reference_url && !item.Link_not_available}
									<Button
										href={item.reference_url}
										title="Apply Online"
										rel="nofollow noopener noreferrer external"
										target="_blank"
										size="sm"
										class="bg-rose-900 hover:bg-rose-800 text-white text-xs"
									>
										Apply
									</Button>
								{/if}
							</div>
						</div>
					{/each}
				{:else}
					<div class="p-6 text-center text-sm text-slate-500 bg-white">
						<p class="font-medium text-slate-700">No jobs closing in the next 7 days.</p>
						<p class="text-xs text-slate-500 mt-1">Check back daily for newly updated deadlines.</p>
						<a
							href="/latest-job"
							class="mt-3 inline-block text-xs text-sky-800 hover:underline font-semibold"
						>
							Explore All Latest Jobs &rarr;
						</a>
					</div>
				{/if}
			</Card.Content>
		{/if}
	</Card.Root>
</div>
