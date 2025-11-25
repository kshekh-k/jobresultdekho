<script lang="ts">
	import ArticleCardList from '$lib/components/ArticleCardList.svelte';
	import Layout from '$lib/components/Layout.svelte';
	import * as Card from '$lib/components/ui/card/index.js';

	export let data: { category: any };
const headingColor = [
	"--color-sky-900",
	"--color-emerald-900",
	"--color-amber-900",	
	"--color-indigo-900",
	"--color-rose-900",
	"--color-yellow-900",
];
	// Header configs
	const commanHeader = [{
		id: 'No.',	department: 'Dept', label: 'Title', date: 'Last Date', timeLeft: 'Time Left', action: 'Action'
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

	// ---------------------------------------------
	// 🔥 Dynamic Sections List (Single Loop Source)
	// ---------------------------------------------
	const sections = [
		{
			key: "jobs",
			type: "jobs",
			headers: commanHeader,
		 
		},
		{
			key: "results",
			type: "results",
			headers: resultHeader,
			color: "bg-indigo-500"
		},
		{
			key: "admit_cards",
			type: "admit-cards",
			headers: commanHeader,
		 
		},
		{
			key: "answer_keys",
			type: "answer-keys",
			headers: answerKeyHeader,
			 
		},
		{
			key: "syllabus",
			type: "syllabus",
			headers: syllabusHeader,
			 
		},
		{
			key: "admissions",
			type: "admissions",
			headers: commanHeader,
			 
		}
	].map((sec, index) => ({
	...sec,
	color: headingColor[index], // auto assign color
}));
</script>

<svelte:head>
	<title>{data.category.title} | JobResultDekho.com</title>
	<meta name="description" content={data.category.description} />
</svelte:head>

<Layout heading={data.category.title} headerBgColor="{data.category.title === 'Latest Job' ? 'bg-sky-900' : data.category.title === 'Admit Card' ? 'bg-emerald-900' : data.category.title === 'Result' ? 'bg-amber-900' : data.category.title === 'Syllabus' ? 'bg-indigo-900' : data.category.title === 'Answer Key' ? 'bg-rose-900' : data.category.title === 'Admissions' ? 'bg-yellow-900' : 'bg-neutral-900' }">
	
	{#if data.category.description}
		<Card.Root class="overflow-hidden rounded-md gap-5 ">
			<Card.Content>
				<p class="text-slate-600">{data.category.description}</p>
			</Card.Content>
		</Card.Root>
	{/if}

	<!-- ============================================
	     🔥 Single Loop → Auto Render All Sections 
	     ============================================ -->
	{#each sections as sec}
		{#if data.category[sec.key]?.length}
			<ArticleCardList
				type={sec.type}
				headerColor={sec.color}
				headers={sec.headers}
				title={data.category.title}
				items={data.category[sec.key]}
				catLabel={data.category.slug}
			/>
		{/if}
	{/each}

</Layout>
