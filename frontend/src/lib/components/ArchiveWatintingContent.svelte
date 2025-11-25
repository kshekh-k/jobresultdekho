<script lang="ts">
	export let latestAdmissions;
	export let latestAdmitCards;
	export let latestAnswerKeys;
	export let latestJobs;
	export let latestResults;
	export let latestSyllabus;
	export let categoryTree;
	export let heading;
	export let headerBgColor;

	import ArticleCard from '$lib/components/ArticleCardList.svelte';
	import Button from './ui/button/button.svelte';	 
	import Layout from './Layout.svelte';
 

	// ACTIVE TAB (default = Latest Job)
	let activeTab: string = "job";

	// Colors
	const headingColor = [
		'--color-sky-900',
		'--color-emerald-900',
		'--color-amber-900',
		'--color-indigo-900',
		'--color-rose-900',
		'--color-yellow-900'
	];
	// Header configs
	const commanHeader = [{
		id: 'No.',	department: 'Dept', label: 'Title', date: 'Last Date',  action: 'Action'
	}];
  
	const resultHeader = [{
		id: 'No.', department: 'Dept', label: 'Title', date: 'Result Date', action: 'Action'
	}];

	const answerKeyHeader = [{
		id: 'No.', department: 'Dept', label: 'Title', date: 'Release Date', action: 'Action'
	}];

	const syllabusHeader = [{
		id: 'No.', department: 'Dept', label: 'Title', date: 'Exam Date', action: 'Action'
	}];

	/* ----------------------------------------------
	   ARTICLE CARD CONFIG (Single Loop Generator)
	----------------------------------------------- */
	const articleSections = [
		{
			id: "job",
			type: "jobs",
			title: "Jobs",
			items: latestJobs,
			viewText: "View All",
			catLabel: "latest-job",
			headers: commanHeader
		},
		{
			id: "admit-card",
			type: "admit-cards", 
			title: "Admit Cards",
			items: latestAdmitCards,
			viewText: "View All",
			catLabel: "admit-card",
			headers: commanHeader
		},
		{
			id: "result",
			type: "results",
			title: "Results",
			items: latestResults,
			viewText: "View All",
			catLabel: "result",
			headers: resultHeader
		},
		{
			id: "answer-key",
			type: "answer-keys", 
			title: "Answer Key",
			items: latestAnswerKeys,
			viewText: "View All",
			catLabel: "answer-key",
			headers: answerKeyHeader
		},
		{
			id: "admission",
			type: "admissions", 
			title: "Admissions",
			items: latestAdmissions,
			viewText: "View All",
			catLabel: "admissions",
			headers: commanHeader 
		},
		{
			id: "syllabus",
			type: "syllabus", 
			title: "Syllabus",
			items: latestSyllabus,
			viewText: "View All",
			catLabel: "syllabus",
			headers: syllabusHeader
		}
	].map((sec, index) => ({
		...sec,
		headerColor: headingColor[index] // auto assign color
	}));
</script>

<Layout heading={heading} headerBgColor={headerBgColor}>

	<!-- BUTTONS AS TABS -->
	 
		<div class="flex gap-2 flex-wrap p-3 bg-white shadow-sm rounded-md">

			{#each articleSections as sec}
				<Button
					onclick={() => (activeTab = sec.id)}
					variant="light"
					class="flex-1 !px-2 md:!px-4 rounded-md transition 
						hover:bg-(color:--btnHover)! {activeTab ===
						sec.id
							? 'text-white bg-(color:--btnColor)'
							: 'text-neutral-600 '}"
							style="--btnColor:var({activeTab === sec.id
							? sec.headerColor
							: '--color-neutral-300'}); --btnHover:var({sec.headerColor})"
				>
					{sec.title}
				</Button>
			{/each}

		 
	 
	</div>

	<!-- TAB PANELS -->
	<div class="relative">
		{#each articleSections as sec}
			{#if activeTab === sec.id}
				<div class="relative" id={sec.id}>
					<ArticleCard	 
						type={sec.type}
						headerColor={sec.headerColor}
						headers={sec.headers}
						title={sec.title}
						items={sec.items}
						catLabel={sec.catLabel}
					/>
				</div>
			{/if}
		{/each}
	</div>

</Layout>
