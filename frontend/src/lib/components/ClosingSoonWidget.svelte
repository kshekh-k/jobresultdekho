<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Icon from './ui/Icon.svelte';
	import { ChevronDown, Clock, ArrowRight } from 'lucide-svelte';
	import { getCalendarDaysRemaining } from '$lib/closingSoon';
	import { formatDate } from '$lib/utils';

	export let jobs: any[] = [];
	export let limit: number = 6;
	export let headerColor: string = 'bg-rose-900';
	export let className: string = '';

	let open = true;
	const toggle = () => {
		open = !open;
	};

	$: displayJobs = jobs.slice(0, limit);
</script>

<Card.Root class="overflow-hidden p-0 rounded-md gap-0 w-full {className}">
	<!-- Header -->
	<Card.Header class="flex items-center justify-between py-2 px-4 gap-2 {headerColor}">
		<div class="flex items-center gap-2">
			<!-- <Icon name={Clock} size={18} className="text-white" /> -->
			<h3 class="text-base sm:text-lg font-semibold text-white">Closing Soon</h3>
		</div>
		<div class="flex items-center gap-2">
			<a
				href="/closing-soon"
				title="View All Closing Soon Jobs"
				class="text-xs bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded transition no-underline"
			>
				View All
			</a>
			<button
				onclick={toggle}
				type="button"
				aria-label="Toggle Closing Soon Widget"
				class="p-1 rounded-sm hover:bg-white/20 focus:outline-none text-white cursor-pointer"
			>
				<Icon name={ChevronDown} className={open ? 'rotate-180' : 'rotate-0'} size={18} />
			</button>
		</div>
	</Card.Header>

	{#if open}
		<Card.Content class="p-0 divide-y divide-gray-100">
			{#if displayJobs.length > 0}
				<ul class="divide-y divide-gray-100 text-sm">
					{#each displayJobs as job}
						{@const days = getCalendarDaysRemaining(job.last_date)}
						<li class="p-3 hover:bg-slate-50 transition">
							<a href={`/latest-job/jobs/${job.slug}`} title={job.title} class="block group">
								<div
									class="text-slate-800 group-hover:text-rose-900 font-medium line-clamp-2 leading-snug transition-colors"
								>
									{job.title}
								</div>
								<div class="mt-1.5 flex items-center justify-between text-xs">
									<span class="text-slate-500 truncate max-w-[55%]">
										{job.department?.title || 'Govt Job'}
									</span>
									{#if days !== null}
										{#if days === 0}
											<span
												class="inline-flex items-center font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded"
											>
												Closes Today
											</span>
										{:else if days === 1}
											<span
												class="inline-flex items-center font-semibold text-rose-700 bg-rose-50 py-0.5 rounded"
											>
												1 Day Left
											</span>
										{:else}
											<span
												class="inline-flex items-center font-medium text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded"
											>
												{days} Days Left
											</span>
										{/if}
									{:else if job.last_date}
										<span class="text-slate-600">
											Ends {formatDate(job.last_date)}
										</span>
									{/if}
								</div>
							</a>
						</li>
					{/each}
				</ul>
			 
			{:else}
				<div class="p-4 text-center text-sm text-slate-500">
					<p>No jobs closing in the next 7 days.</p>
					<a
						href="/latest-job"
						class="mt-2 inline-block text-xs text-sky-800 hover:underline font-medium"
					>
						Explore Latest Jobs &rarr;
					</a>
				</div>
			{/if}
		</Card.Content>
	{/if}
</Card.Root>
