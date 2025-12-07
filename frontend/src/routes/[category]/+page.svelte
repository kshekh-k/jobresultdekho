<script lang="ts">
	import ArticleCardList from '$lib/components/ArticleCardList.svelte';
	import Layout from '$lib/components/Layout.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { SITE_URL, SITE_NAME, OG_IMAGE, SITE_LOGO } from '$lib/utils';
	import { page } from '$app/stores';
	const { data } = $props<{
		data: {
			category?: {
				slug: string;
			};
		};
	}>();

	const headingColor = [
		'--color-sky-900',
		'--color-emerald-900',
		'--color-amber-900',
		'--color-indigo-900',
		'--color-rose-900',
		'--color-yellow-900'
	];
	// Header configs
	const commanHeader = [
		{
			id: 'No.',
			department: 'Dept',
			label: 'Title',
			date: 'Last Date',
			timeLeft: 'Time Left',
			action: 'Action'
		}
	];

	const resultHeader = [
		{
			id: 'No.',
			department: 'Dept',
			label: 'Title',
			date: 'Result Date',
			action: 'Action'
		}
	];

	const answerKeyHeader = [
		{
			id: 'No.',
			department: 'Dept',
			label: 'Title',
			date: 'Release Date',
			action: 'Action'
		}
	];

	const syllabusHeader = [
		{
			id: 'No.',
			department: 'Dept',
			label: 'Title',
			date: 'Exam Date',
			action: 'Action'
		}
	];

	// ---------------------------------------------
	// 🔥 Dynamic Sections List (Single Loop Source)
	// ---------------------------------------------
	const sections = [
		{
			key: 'jobs',
			type: 'jobs',
			headers: commanHeader,
			color: headingColor[0]
		},
		{
			key: 'admit_cards',
			type: 'admit-cards',
			headers: commanHeader,
			color: headingColor[1]
		},
		{
			key: 'results',
			type: 'results',
			headers: resultHeader,
			color: headingColor[2]
		},
		{
			key: 'answer_keys',
			type: 'answer-keys',
			headers: answerKeyHeader,
			color: headingColor[3]
		},

		{
			key: 'admissions',
			type: 'admissions',
			headers: commanHeader,
			color: headingColor[4]
		},
		{
			key: 'syllabus',
			type: 'syllabus',
			headers: syllabusHeader,
			color: headingColor[5]
		}
	];
	// let job = data.category.slug === 'latest-job';
	// let admitcard = data.category.slug === 'admit-card';
	// let result = data.category.slug === 'result';
	// let answerkey = data.category.slug === 'answer-key';
	// let syllabus = data.category.slug === 'syllabus';
	// let admission = data.category.slug === 'admission';

	const activeCategory = $derived(data?.category?.slug ?? null);

	const job = $derived(activeCategory === 'latest-job');
	const admitcard = $derived(activeCategory === 'admit-card');
	const result = $derived(activeCategory === 'result');
	const answerkey = $derived(activeCategory === 'answer-key');
	const syllabus = $derived(activeCategory === 'syllabus');
	const admission = $derived(activeCategory === 'admission');

	let fullYear = new Date().getFullYear();

	// Dynamic SEO Title
const pageTitle = $derived(
	job
		? `Latest Govt Jobs ${fullYear} - All Government Job Notifications`
		: admitcard
			? `Admit Card ${fullYear} - Download Govt Exam Hall Tickets`
			: result
				? `Sarkari Result ${fullYear} - Latest Government Exam Results`
				: answerkey
					? `Answer Key ${fullYear} - Official Govt Exam Solutions`
					: syllabus
						? `Govt Exam Syllabus ${fullYear} - SSC, Railway, Police`
						: admission
							? `Admissions in India ${fullYear} - Apply Online`
							: `Latest Govt Updates ${fullYear}`
);


	// Dynamic Description
	const pageDesc = $derived(
	job
		? `Find the latest Govt Jobs ${fullYear} including SSC, Railway, UPSC & State vacancies.`
		: admitcard
			? `Download Admit Cards ${fullYear} for SSC, Railway & other Govt exams.`
			: result
				? `Check the latest Sarkari Results ${fullYear} updated instantly.`
				: answerkey
					? `Official Answer Keys ${fullYear} for all major Govt exams.`
					: syllabus
						? `Download updated Govt Exam Syllabus ${fullYear} PDFs.`
						: admission
							? `Latest Admission updates ${fullYear} for schools & universities.`
							: `Latest Govt Jobs, Results, Admit Cards & Exam Updates ${fullYear}.`
);

console.log(pageDesc);
	// Dynamic Description
	const headerBgColor = $derived(job
		? 'bg-sky-900'
		: admitcard
			? 'bg-emerald-900'
			: result
				? 'bg-amber-900'
				: answerkey
					? 'bg-indigo-900' : admission ? 'bg-rose-900'
					: syllabus
						? 'bg-yellow-900'
						: 'bg-neutral-900'
);


 

	// JSON-LD Schema object
	let schemaData = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': `${SITE_URL}/${data.category.slug}#webpage`,
		name: pageTitle,
		url: `${SITE_URL}/${data.category.slug}`,
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
			'@id': `${SITE_URL}/${data.category.slug}/#website`,
			name: SITE_NAME,
			url: SITE_URL
		},
		inLanguage: 'en-IN',
		potentialAction: {
			'@type': 'SearchAction',
			target: `${SITE_URL}/search?q={search_term_string}`,
			'query-input': 'required name=search_term_string'
		}
});

	console.log(data.category.slug);
</script>

<svelte:head>
	<title>{pageTitle}</title>

	<meta name="description" content={pageDesc} />
	<link rel="canonical" href={`${SITE_URL}/${data.category.slug}`} />

	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDesc} />
	<meta property="og:url" content={`${SITE_URL}/${data.category.slug}`} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:site_name" content={SITE_NAME} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDesc} />
	<meta name="twitter:image" content={OG_IMAGE} />

	<meta name="apple-mobile-web-app-title" content={SITE_NAME} />
	<meta name="application-name" content={SITE_NAME} />
	<meta name="theme-color" content="#0c4a6e" />

	<!-- JSON-LD Output -->
	{@html `
	<script type="application/ld+json">
	${JSON.stringify(schemaData)}
	</script>
	`}
</svelte:head>

<Layout
	heading={data.category.title}
	headerBgColor={headerBgColor}
>
	{#if data.category.description}
		<Card.Root class="overflow-hidden rounded-md gap-5 ">
			<Card.Content>
				<p class="text-slate-600">{data.category.description}</p>
				<p>pageTitle: {pageTitle}</p>		
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
				slug={data.category.slug}
			/>
		{/if}
	{/each}
</Layout>
