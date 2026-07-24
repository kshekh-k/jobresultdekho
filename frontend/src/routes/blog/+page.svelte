<script lang="ts">
	import Layout from '$lib/components/Layout.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Icon from '$lib/components/ui/Icon.svelte';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import { formatDate, getMediaUrl, OG_IMAGE, SITE_LOGO, SITE_NAME, SITE_URL } from '$lib/utils';
	import { ArrowRight, Calendar, User } from 'lucide-svelte';

	export let data;
	const { blogs } = data;

	// ✅ Pagination state
	const perPage = 10;
	let currentPage = 1;

	$: totalItems = blogs.length;

	// ✅ Paginated blogs
	$: paginatedBlogs = blogs.slice(
		(currentPage - 1) * perPage,
		currentPage * perPage
	);

	function handlePageChange(page: number) {
		if (page < 1 || page > Math.ceil(totalItems / perPage)) return;
		currentPage = page;

		// optional: scroll to top
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	let fullYear = new Date().getFullYear();
	let title = `Sarkari Result ${fullYear}: Latest Govt Jobs, Sarkari Naukri, Admit Card & Results.  - ${SITE_NAME}`
	let description = `Read latest blog posts on sarkari naukri, govt jobs preparation, exam tips, career guidance, admit card, results and admission updates at ${SITE_NAME}`
</script>

<svelte:head>
	 

<title>{title}</title>
 
	<meta
		name="description"
		content={description}
	/>
<meta name="keywords" content="government jobs, sarkari naukri, latest government job updates, job result dekho, recruitment notifications, SSC jobs, UPSC jobs, railway jobs, exam results, admit card updates">
	<meta property="og:site_name" content={SITE_NAME} />
	<link rel="canonical" href={`${SITE_URL}/blog`} />

	<meta property="og:title" content="{title}" />
	<meta
		property="og:description"
		content={description}
	/>
	<meta property="og:url" content="{SITE_URL}/blog" />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:type" content="website" />

	<!-- Schema.org JSON-LD (SEO Boost) -->
	{@html `
<script type="application/ld+json">
${JSON.stringify({
	'@context': 'https://schema.org',
	'@type': 'WebPage',
	'@id': `${SITE_URL}/blog#WebPage`,
	name: `Blog - ${SITE_NAME}`,
	headline: `Blog - ${SITE_NAME}`,
	url: `${SITE_URL}/contact`,
	image: OG_IMAGE,
	description: description,
	isPartOf: {
		'@type': 'WebSite',
		'@id': `${SITE_URL}/#website`,
		inLanguage: 'en-IN',
		name: SITE_NAME,
		url: SITE_NAME
	},
	author: {
		'@type': 'Organization',
		name: SITE_NAME,
		logo: {
			'@type': 'ImageObject',
			url: SITE_LOGO
		}
	},
	potentialAction: {
		'@type': 'SearchAction',
		target: `${SITE_URL}/search?q={search_term_string}`,
		'query-input': 'required name=search_term_string'
	}
})}
</script>
`}



</svelte:head>
<Layout heading={'Our Blog'} headerBgColor="bg-sky-500">
	<div class="sm:grid sm:grid-cols-2 flex flex-col gap-5">
		{#each paginatedBlogs as blog}
			<Card.Root
				id="post-{blog.id}"
				class="hover:bg-slate-50 dark:hover:bg-slate-900 transition rounded-xl !p-4"
			>
				<a href={`/blog/${blog.slug}`} title={blog.title} class="flex flex-col gap-3 group">
					{#if blog.cover_image}
						<div class="overflow-hidden rounded-xl">
							<img src={getMediaUrl(blog.cover_image?.url)} alt={blog.title} title={blog.title} class="" />
						</div>
					{/if}
					<Card.Header class="px-0">
						<h2
							class="text-2xl font-semibold text-slate-700 group-hover:text-rose-500 ease-in-out duration-200"
						>
							{blog.title}
						</h2>
						<div class="flex gap-2 divide-x divide-slate-300">
							<p class="text-slate-500 text-sm pr-2 flex gap-1 items-center">
								<Icon name={Calendar} size={14} />{formatDate(blog.publishedAt)}
							</p>
							<p class="text-slate-500 text-sm flex gap-1 items-center">
								<Icon name={User} size={14} />Admin
							</p>
						</div>
					</Card.Header>
					<Card.Content class="flex-1 px-0 gap-2 flex flex-col">
						<p class="max-h-20 line-clamp-2 text-slate-600">{blog?.short_description}</p>
						<div class="flex justify-start">
							<a
								href={`/blog/${blog.slug}`} title="Learn More"
								class="text-sky-900 font-medium inline-flex gap-1 items-center hover:text-rose-500 ease-in-out duration-200"
								>Learn More <Icon name={ArrowRight} />
							</a>
						</div>
					</Card.Content>
				</a>
			</Card.Root>
		{/each}


{#if totalItems > perPage}
	<div class="p-3 flex justify-center">
		<Pagination.Root count={totalItems} {perPage}>
			{#snippet children({ pages, currentPage })}
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton
							onclick={() => handlePageChange(currentPage - 1)}
						/>
					</Pagination.Item>

					{#each pages as page (page.key)}
						{#if page.type === 'ellipsis'}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item>
								<Pagination.Link
									{page}
									isActive={currentPage === page.value}
									onclick={() => handlePageChange(page.value)}
								>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}

					<Pagination.Item>
						<Pagination.NextButton
							onclick={() => handlePageChange(currentPage + 1)}
						/>
					</Pagination.Item>
				</Pagination.Content>
			{/snippet}
		</Pagination.Root>
	</div>
{/if}


	</div>
</Layout>
