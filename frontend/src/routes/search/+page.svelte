<script lang="ts">
  import ArticleCardList from '$lib/components/ArticleCardList.svelte';
  import Layout from '$lib/components/Layout.svelte';
  import * as Card from '$lib/components/ui/card/index.js';

  export let data: { category: any };

  // Header config for search
  const searchHeader = [{
    id: 'No.',	department: 'Dept', label: 'Title', date: 'Last Date', timeLeft: 'Time Left', action: 'Action'
  }];

  // Section config (only search here, but same pattern as categories)
  const sections = [
    {
      key: "search",
      type: "jobs",
      headers: searchHeader,
      color: "bg-blue-900"
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
        <p class="text-slate-600">{data.category.description}</p>
      </Card.Content>
    </Card.Root>
  {/if}

  <!-- 🔥 Auto Render Search Section -->
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
