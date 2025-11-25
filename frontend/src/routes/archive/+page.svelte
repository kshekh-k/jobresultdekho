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

	 
 
	import ArchiveWatintingContent from '$lib/components/ArchiveWatintingContent.svelte';
 
 
 
</script>
<svelte:head>
  <title>Archive | JobResultDekho.com</title>
  <meta name="description" content="Welecom to JobResultDekho, explore for jobs, results, admit cards and study material for Indian students." />
</svelte:head>
 <ArchiveWatintingContent heading="Archive" headerBgColor="bg-sky-900" {latestAdmissions} {latestAdmitCards} {latestAnswerKeys} {latestJobs} {latestResults} {latestSyllabus} {categoryTree} />
 
 
 
