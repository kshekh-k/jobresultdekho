<script lang="ts">
	import ArticleCardList from '$lib/components/ArticleCardList.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	export let data: { category: any };

	// Job, Admit Card & Admission Header
	const commanHeader = [{
		id: 'No.',	department: 'Department', label: 'Title', date: 'Last Date', timeLeft: 'Time Left', action: 'Action'
	}];
  	
 	const resultHeader = [{
		id: 'No.', department: 'Department', label: 'Title', date: 'Result Date', action: 'Action'
	}];

	const answerKeyHeader = [{
		id: 'No.', department: 'Department', label: 'Title', date: 'Release Date', action: 'Action'
	}];

	const syllabusHeader = [{ 
		id: 'No.', department: 'Department', label: 'Title', date: 'Exam Date', action: 'Action'
	}];
	
</script>

<div class="max-w-screen-xl mx-auto px-3">
	<div class="space-y-5 py-5">
		<Card.Root class="overflow-hidden rounded-md gap-5">
			<Card.Header class="flex items-center justify-between gap-2">
				<h1 class="text-center text-2xl md:text-4xl xl:text-5xl font-bold text-slate-900">
					{data.category.title}
				</h1>
			</Card.Header>
			<Card.Content>
				<p class="text-slate-600">{data.category.description}</p>
			</Card.Content>
		</Card.Root>
    	{#if data.category.jobs.length}
			<ArticleCardList
				type="jobs"
				headerColor="bg-sky-500"
				headers={commanHeader}
				title={data.category.title}
				items={data.category.jobs}
				catLabel={data.category.slug}		 
			/>	 
		{/if}

		{#if data.category.results.length}	 
			<ArticleCardList
				type="results"
				headerColor="bg-sky-500"
				headers={resultHeader}
				title={data.category.title}
				items={data.category.results}
				catLabel={data.category.slug}		 
			/>	 
		{/if}

		{#if data.category.admit_cards.length}	 
			<ArticleCardList
				type="admit-cards"
				headerColor="bg-sky-500"
				headers={commanHeader}
				title={data.category.title}
				items={data.category.admit_cards}
				catLabel={data.category.slug}		 
			/>	 
		{/if}		

		{#if data.category.answer_keys.length}	 
			<ArticleCardList
				type="answer-keys"
				headerColor="bg-sky-500"
				headers={answerKeyHeader}
				title={data.category.title}
				items={data.category.answer_keys}
				catLabel={data.category.slug}		 
			/>	 
		{/if}

		{#if data.category.syllabus.length}	 
			<ArticleCardList
				type="syllabus"
				headerColor="bg-sky-500"
				headers={syllabusHeader}
				title={data.category.title}
				items={data.category.syllabus}
				catLabel={data.category.slug}		 
			/>	 
		{/if}

		{#if data.category.admissions.length}	 
			<ArticleCardList
				type="admissions"
				headerColor="bg-sky-500"
				headers={commanHeader}
				title={data.category.title}
				items={data.category.admissions}
				catLabel={data.category.slug}		 
			/>	 
		{/if}
	</div>
</div>
