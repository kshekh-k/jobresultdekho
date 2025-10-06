<script lang="ts">
  export let data: { category: any };
</script>

<h1>{data.category.title}</h1>
<span>{data.category.description}</span>

{#if data.category.jobs?.length}
<h2>Jobs</h2>
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
