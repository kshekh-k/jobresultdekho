<script lang="ts">
	export let data: { 
		latestAdmissions?: any[];
		latestAdmitCards?: any[];
		latestAnswerKeys?: any[];
		hotJobs?: any[];
		latestJobs?: any[];
		latestResults?: any[];
		latestSyllabus?: any[];
		categoryTree?: any[];
	};
	const { 
		latestAdmissions = [],
		latestAdmitCards = [],
		latestAnswerKeys = [],
		hotJobs = [],
		latestJobs = [],
		latestResults = [],
		latestSyllabus = [],
		categoryTree = [],
	} = data;

	import * as Card from '$lib/components/ui/card/index.js';
	import HotPosts from '$lib/components/HotPosts.svelte';
	import HomeContent from '$lib/components/HomeContent.svelte';
	import Stats from '$lib/components/Stats.svelte';	
	import Desclaimer from '$lib/components/Desclaimer.svelte';
</script>
<svelte:head>
  <title>Welcome to JobResultDekho.com</title>
  <meta name="description" content="Welecom to JobResultDekho, explore for jobs, results, admit cards and study material for Indian students." />
</svelte:head>
<div class="space-y-5">
	<HotPosts {hotJobs} />
	<div class="max-w-screen-xl mx-auto px-3">
		<Card.Root class="" variant={'default'}>
			<Card.Content class="flex-1 flex items-stretch text-center">Ad Place here</Card.Content>
		</Card.Root>
	</div>
	<HomeContent {latestAdmissions} {latestAdmitCards} {latestAnswerKeys} {latestJobs} {latestResults} {latestSyllabus} {categoryTree} />
	<Stats />
	<Desclaimer />
</div>
 
