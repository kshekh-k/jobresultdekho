<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import HotPosts from '$lib/components/Hot-posts.svelte';
	import HomeContent from '$lib/components/Home-content.svelte';
	import Stats from '$lib/components/stats.svelte';
</script>


	<div class="space-y-5 py-5">
		<HotPosts />
		<div class="max-w-screen-xl mx-auto px-3">
		<Card.Root class="" variant={'default'}>
			<Card.Content class="flex-1 flex items-stretch text-center">Ad Place here</Card.Content>
		</Card.Root>
	</div>
        <HomeContent />
		<Stats />
	</div>
 
