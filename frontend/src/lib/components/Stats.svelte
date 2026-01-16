<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { BriefcaseBusiness, History, School, UsersRound } from 'lucide-svelte';
	import Icon from './ui/Icon.svelte';
	import { onMount } from 'svelte';
	import { API_URL, formatShortNumber } from '$lib/utils';

	let totalPosts: number | string = 0;
	let departmentCount: number | string = 0;

	onMount(async () => {
		try {
			const response = await fetch(`${API_URL}/jobs/stats`);
			const data = await response.json();
			console.log(data);
			totalPosts = data.total || 20000;
			departmentCount = data.departments || 500;
		} catch (error) {
			console.error('Error fetching stats:', error);
			totalPosts = 20000;
			departmentCount = 500;
		}
	});

	$: stats = [
		{
			label: 'Job Posted',
			stat: totalPosts,
			icon: BriefcaseBusiness
		},
		{
			label: 'Real Time Update',
			stat: 100,
			icon: History
		},
		{
			label: 'Your visit number',
			stat: 10000,
			icon: UsersRound
		},
		{
			label: 'Departments Covered',
			stat: departmentCount,
			icon: School
		}
	];
</script>

<div class="bg-white py-10">
	<div class="max-w-screen-xl mx-auto px-3">
		<div class="flex flex-col md:grid md:grid-cols-12 gap-6">
			<div class="col-span-6">
				<div class="space-y-5 max-w-lg">
					<h2 class="text-4xl text-left text-slate-900 font-bold">We are most trusted</h2>
					<p class="text-slate-500">
						<b>JobResultWale.com </b> – also known as Job Result Wale – is not just a website, it’s a
						trusted platform for millions of students and job seekers across the country. Since its inception,
						JobResultWale has earned the confidence of countless aspirants by providing timely, accurate,
						and reliable updates on government exams, results, admit cards, and career opportunities.
						Today, it stands as a dependable source for crores of youth preparing for their future in
						the public sector.
					</p>
				</div>
			</div>
			<div class="col-span-6 grid grid-cols-2 gap-5">
				{#each stats as item}
					<Card.Root class="overflow-hidden rounded-md bg-slate-50">
						<Card.Content class="flex flex-col md:flex-row gap-5 items-center">
							<Icon name={item.icon} size={44} className="shrink-0 text-slate-800" />
							<div class="space-y-1">
								<h4 class="text-2xl text-slate-800 text-center md:text-left font-bold leading-snug">
									{#if item.label === 'Real Time Update'}
										{item.stat}%
									{:else}
										{formatShortNumber(item.stat)}
									{/if}
								</h4>
								<p class="text-center md:text-left font-medium text-slate-600 leading-snug">
									{item.label}
								</p>
							</div>
						</Card.Content>
					</Card.Root>
				{/each}
			</div>
		</div>
	</div>
</div>
