<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	export let hotJobs;

	const colorVariants = [
		'success', 'pink', 'indigo', 'cyan', 'red', 'orange'
	];

	const hotJobsWithVariants = hotJobs.map((job, index) => ({
		...job,
		variant: colorVariants[index % colorVariants.length]
	}));	 
</script>
<div class="max-w-screen-xl mx-auto px-3">
<section class="relative">	
	<div class="overflow-x-auto max-w-full py-2 -my-2">
		<div class="flex justify-between md:grid md:grid-cols-3 gap-4 min-w-[1024px] md:min-w-min">
			{#each hotJobsWithVariants as item}
				<Card.Root class="p-0 ease-in-out duration-200 hover:-translate-y-1 min-w-60" variant={item.variant}>
					<Card.Content class="p-0 flex-1 flex items-stretch">
						<a href={'/latest-job/jobs/' + item.slug} rel="external" class="p-5 py-3 flex-1 flex justify-center items-center text-center font-semibold text-lg lg:text-xl xl:text-2xl">
							<span class="max-w-sm">{item.title} ({item.total_posts ?? 'N/A' } Posts)</span>
						</a>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>	
	</div> 
</section>
 </div>