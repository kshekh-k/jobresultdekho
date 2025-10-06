<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard.svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  export let data: { category: any };
  const jobHeader = [{
		id: 'No.',
		department: 'Department',
		label: 'Title',
		date: 'Last Date',
		timeLeft: 'Time Left',
		action: 'Action'
	}];
</script>
<div class="max-w-screen-xl mx-auto px-3">
<div class="space-y-5 py-5">
  <Card.Root  class="overflow-hidden p-0 rounded-md gap-0">
<Card.Header class="flex items-center justify-between py-2 px-4 gap-2">
		<h1 class="text-center text-2xl md:text-4xl xl:text-5xl font-bold text-slate-900">{data.category.title}</h1>	 
	</Card.Header>
	<Card.Content>
    <p class="text-slate-600">{data.category.description}</p>
</Card.Content>
</Card.Root>
{#if data.category.jobs?.length}  
 
<!-- <ArticleCard
articleWrap={""}
				articleId="" 
				headerColor="bg-sky-500"
				headers={jobHeader}
				title="Latest Jobs"
				items={data.category.jobs}
				viewText="See More"
				cat={'/latest-job'}
				buttonLabel="Apply"
 /> -->
 
  <ul>
    {#each data.category.jobs as job}    
      <li>
        <a href={`/${data.category.slug}/jobs/${job.slug}`} class="block">{job.title}
         - {job.last_date} - {job.department.title}</a>
      </li>
    {/each}
  </ul>
{:else}
  <p>No Jobs found.</p>
{/if}

{#if data.category.admit_cards?.length}
<h2>Admit Cards</h2>
  <ul>
    {#each data.category.admit_cards as admit_card}
      <li>
        <a href={`/${data.category.slug}/admit-cards/${admit_card.slug}`} class="block">{admit_card.title}</a>
      </li>
    {/each}
  </ul>
{:else}
  <p>No Admit Card found.</p>
{/if}

{#if data.category.results?.length}
<h2>Results</h2>
  <ul>
    {#each data.category.results as result}
      <li>
        <a href={`/${data.category.slug}/results/${result.slug}`} class="block">{result.title}</a>
      </li>
    {/each}
  </ul>
{:else}
  <p>No Result found.</p>
{/if}

{#if data.category.syllabus?.length}
<h2>Syllabus</h2>
  <ul>
    {#each data.category.syllabus as syllabus}
      <li>
        <a href={`/${data.category.slug}/syllabus/${syllabus.slug}`} class="block">{syllabus.title}</a>
      </li>
    {/each}
  </ul>
{:else}
  <p>No Syllabus found.</p>
{/if}

{#if data.category.admissions?.length}
<h2>Admissions</h2>
  <ul>
    {#each data.category.admissions as admission}
      <li>
        <a href={`/${data.category.slug}/admissions/${admission.slug}`} class="block">{admission.title}</a>
      </li>
    {/each}
  </ul>
{:else}
  <p>No Admission found.</p>
{/if}

{#if data.category.answer_keys?.length}
<h2>Answer Keys</h2>
  <ul>
    {#each data.category.answer_keys as answer}
      <li>
        <a href={`/${data.category.slug}/answer-keys/${answer.slug}`} class="block">{answer.title}</a>
      </li>
    {/each}
  </ul>
{:else}
  <p>No Answer key found.</p>
{/if}

</div>
</div>
