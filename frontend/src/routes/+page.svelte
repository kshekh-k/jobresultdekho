<script lang="ts">
	export let data: { 
		latestAdmissions?: any[];
		latestAdmitCards?: any[];
		latestAnswerKeys?: any[];
		hotPosts?: any[];
		highAlertPosts?: any[];
		latestJobs?: any[];
		latestResults?: any[];
		latestSyllabus?: any[];
		categoryTree?: any[];
	};
	const { 
		latestAdmissions = [],
		latestAdmitCards = [],
		latestAnswerKeys = [],
		hotPosts = [],
		highAlertPosts = [],
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
	import { SITE_URL } from '$lib/utils';
 
</script>
<svelte:head>
  <title>Welcome to JobResultDekho.com</title>
  <meta name="description" content="Welecom to JobResultDekho, explore for jobs, results, admit cards and study material for Indian students." />
   <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" sizes="180x180" />
  <link rel="icon" href="/favicon/favicon-32x32.png" sizes="32x32" type="image/png" />
  <link rel="icon" href="/favicon/favicon-16x16.png" sizes="16x16" type="image/png" />
</svelte:head>
<div class="space-y-5">
	<HotPosts {hotPosts} />
	<div class="max-w-screen-xl mx-auto px-3">
		<Card.Root variant="default" class="py-0! rounded-md! sm:rounded-xl!">
			<Card.Content class="flex items-center justify-center text-center p-1!  ">
				<a href="{SITE_URL}/contact" class="block rounded-md! sm:rounded-xl! overflow-hidden">
					<img src="/image/JobResultDekho-Banner-horizontal.png" alt="Job Result Dekho" class="object-cover sm:block hidden" />
					<img src="/image/JobResultDekho-Banner-mobile.png" alt="Job Result Dekho" class="object-cover block sm:hidden" />
				</a>
			</Card.Content>
		</Card.Root>
	</div>
	<HomeContent {latestAdmissions} {latestAdmitCards} {latestAnswerKeys} {latestJobs} {latestResults} {latestSyllabus} {categoryTree} />
	<Stats />
	<Desclaimer />
</div>
 
