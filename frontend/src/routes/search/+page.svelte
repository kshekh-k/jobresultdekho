<script lang="ts">
  import ArticleCardList from '$lib/components/ArticleCardList.svelte';
  import Layout from '$lib/components/Layout.svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import SearchBox from '$lib/components/SearchBox.svelte';

  export let data: { category: any };

  // Header config for search
  const searchHeader = [{
    id: 'No.',	department: 'Department', label: 'Title', date: 'Last Date', timeLeft: 'Time Left', action: 'Action'
  }];

  // Section config (only search here, but same pattern as categories)
  const sections = [
    {
      key: "search",
      type: "jobs",
      headers: searchHeader,
      color: "--color-blue-900"
    }
  ];
</script>

<svelte:head>
  <title>{data.category.title} | JobResultDekho.com</title>
  <meta name="description" content={data.category.description} />
</svelte:head>

<Layout heading={data.category.title} headerBgColor="bg-blue-900">
  {#if data.category.description}
    <Card.Root class="overflow-hidden rounded-md gap-5">
      <Card.Content>
	  	<SearchBox placeholder="Search Jobs, Admit Card, Answer key & Results..." boxSize="w-full" />
        <p class="text-slate-600 mt-5 font-semibold">{data.category.description}</p>
      </Card.Content>
    </Card.Root>
  {/if}

  <!-- Auto Render Search Section -->
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
