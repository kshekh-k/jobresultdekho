<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';

	const hotPosts = [
		{
			title: 'DDA Online Form 2025 (1732 Posts)',
			slug: 'dda-online-forms-2025-1732-posts',
            variant:'success',
		},
		{
			title: 'IBPS RRB 14th Form (13217 Posts)',
			slug: 'ibps-rrb-14th-form-13217-posts',
            variant:'pink',
		},
		{
			title: 'BSF HC RO / RM Form (1121 Posts)',
			slug: 'bsf-hc-ro-rm-form-1121-posts',
            variant:'indigo',
		},
		{
			title: 'BSF HC RO / RM Form (1121 Posts)',
			slug: 'bsf-hc-ro-rm-form-1121-posts',
            variant:'cyan',
		},
		{
			title: 'BSSC Office Attendant Form (3727 Posts)',
			slug: 'bssc-office-attendant-form-3727 posts',
            variant:'red',
		},
		{
			title: 'UP Police Constable Form (19,220 Post)',
			slug: 'up-police-constable-form-19220 post',
            variant:'orange',
		}
	];
 
</script>

<section class="relative">	
		<div class="grid md:grid-cols-3 grid-cols-2 gap-4">
			{#each hotPosts as item}
				<Card.Root class="p-0 ease-in-out duration-200 hover:-translate-y-1" variant={item.variant}>
					<Card.Content class="p-0 flex-1 flex items-stretch">
						<a href={item.slug} class="p-5 py-3 flex-1 flex justify-center items-center text-center font-semibold text-2xl"><span class="max-w-sm">{item.title}</span></a>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>	 
</section>
 