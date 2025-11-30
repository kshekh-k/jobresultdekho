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
 
	import ArchiveWatintingContent from '$lib/components/ArchiveWatintingContent.svelte'; 
 
</script>
<svelte:head>
  <title>Waiting | JobResultDekho.com</title>
  <meta name="description" content="Welecom to JobResultDekho, explore for jobs, results, admit cards and study material for Indian students." />
</svelte:head>
<ArchiveWatintingContent heading="Waiting" headerBgColor="bg-emerald-900" {latestAdmissions} {latestAdmitCards} {latestAnswerKeys} {latestJobs} {latestResults} {latestSyllabus} {categoryTree} />
 
 
 
