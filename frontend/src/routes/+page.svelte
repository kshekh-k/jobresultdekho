<script lang="ts">
	export let data: { 
		latestAdmissions?: any[];
		latestAdmitCards?: any[];
		latestAnswerKeys?: any[];
		latestJobs?: any[];
		latestResults?: any[];
		latestSyllabus?: any[];
	};
	const { 
		latestAdmissions = [],
		latestAdmitCards = [],
		latestAnswerKeys = [],
		latestJobs = [],
		latestResults = [],
		latestSyllabus = []
	} = data;

	console.log("latestJobs in +page.svelte:", latestAdmissions, latestAdmitCards, latestJobs, latestAnswerKeys, latestResults, latestSyllabus );

	import * as Card from '$lib/components/ui/card/index.js';
	import HotPosts from '$lib/components/HotPosts.svelte';
	import HomeContent from '$lib/components/HomeContent.svelte';
	import Stats from '$lib/components/Stats.svelte';	
	import Desclaimer from '$lib/components/Desclaimer.svelte';
</script>

<div class="space-y-5 py-5">
	<HotPosts />
	<div class="max-w-screen-xl mx-auto px-3">
	<Card.Root class="" variant={'default'}>
		<Card.Content class="flex-1 flex items-stretch text-center">Ad Place here</Card.Content>
	</Card.Root>
</div>
	<HomeContent {latestAdmissions} {latestAdmitCards} {latestAnswerKeys} {latestJobs} {latestResults} {latestSyllabus} />
	<Stats />
	<Desclaimer />
</div>
 
