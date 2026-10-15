<script lang="ts">
	import ArticleCardList from '$lib/components/ArticleCardList.svelte';
	import Layout from '$lib/components/Layout.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { Clock } from 'lucide-svelte';
	import { SITE_URL, SITE_NAME, OG_IMAGE, SITE_LOGO } from '$lib/utils';
	import type { Job } from '$lib/api/job';

	export let data: { jobs: Job[] };
	const { jobs = [] } = data;

	const commanHeader = [
		{
			id: 'No.',
			department: 'Dept',
			label: 'Post',
			date: 'Last Date',
			action: 'Action'
		}
	];

	let fullYear = new Date().getFullYear();

	const pageTitle = `Jobs Closing Soon — Last Date to Apply | ${SITE_NAME}`;
	const pageHeading = 'Government Jobs Closing Soon';
	const pageDesc =
		'Find government jobs with application deadlines in the next 7 days. Check application deadlines and apply before the last date.';
	const canonicalUrl = `${SITE_URL}/closing-soon`;

	// JSON-LD Schema
	let schemaData = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': `${canonicalUrl}#webpage`,
		name: pageTitle,
		url: canonicalUrl,
		description: pageDesc,
		publisher: {
			'@type': 'Organization',
			name: SITE_NAME,
			logo: {
				'@type': 'ImageObject',
				url: SITE_LOGO
			}
		},
		author: {
			'@type': 'Organization',
			name: SITE_NAME
		},
		isPartOf: {
			'@type': 'WebSite',
			'@id': `${SITE_URL}/#website`,
			name: SITE_NAME,
			url: SITE_URL
		},
		inLanguage: 'en-IN',
		potentialAction: {
			'@type': 'SearchAction',
			target: `${SITE_URL}/search?q={search_term_string}`,
			'query-input': 'required name=search_term_string'
		}
	};
</script>

<svelte:head>
	<title>{pageTitle}</title>

	<meta name="description" content={pageDesc} />
	<link rel="canonical" href={canonicalUrl} />

	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDesc} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:type" content="website" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDesc} />
	<meta name="twitter:image" content={OG_IMAGE} />

	<meta name="apple-mobile-web-app-title" content={SITE_NAME} />
	<meta name="application-name" content={SITE_NAME} />
	<meta name="theme-color" content="#881337" />

	<!-- JSON-LD Output -->
	{@html `
	<script type="application/ld+json">
	${JSON.stringify(schemaData)}
	</script>
	`}
</svelte:head>

<Layout heading={pageHeading} headerBgColor="bg-rose-900">
	<Card.Root class="overflow-hidden rounded-md gap-5">
		<Card.Content>
			<h2 class="text-xl font-bold text-slate-800">{pageHeading} {fullYear}</h2>
			<p class="text-slate-600 mt-1">{pageDesc}</p>
		</Card.Content>
	</Card.Root>

	{#if jobs.length > 0}
		<ArticleCardList
			type="jobs"
			headerColor="--color-rose-900"
			headers={commanHeader}
			title={pageHeading}
			items={jobs}
			slug="/latest-job"
			sortBy="last_date"
		/>
	{:else}
		<Card.Root class="overflow-hidden rounded-md p-8 text-center bg-white border border-slate-200">
			<Card.Content class="space-y-4">
				<div
					class="mx-auto w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center"
				>
					<Icon name={Clock} size={24} />
				</div>
				<h3 class="text-xl font-semibold text-slate-800">No Jobs Closing Soon</h3>
				<p class="text-slate-600 max-w-md mx-auto text-sm">
					There are currently no government jobs with application deadlines in the next 7 days.
					Please explore all open vacancies in Latest Jobs.
				</p>
				<div>
					<Button
						href="/latest-job"
						variant="default"
						size="sm"
						class="bg-sky-900 hover:bg-sky-800 text-white"
					>
						Explore Latest Jobs
					</Button>
				</div>
			</Card.Content>
		</Card.Root>
	{/if}
</Layout>
