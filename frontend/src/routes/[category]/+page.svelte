<script lang="ts">
	import ArticleCardList from '$lib/components/ArticleCardList.svelte';
	import Layout from '$lib/components/Layout.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { SITE_URL, SITE_NAME, OG_IMAGE } from '$lib/utils';
	export let data: { category: any };

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
			key: 'syllabus',
			type: 'syllabus',
			headers: syllabusHeader,
			color: headingColor[4]
		},
		{
			key: 'admissions',
			type: 'admissions',
			headers: commanHeader,
			color: headingColor[5]
		}
	];
	let job = data.category.slug === 'latest-job';
	let admitcard = data.category.slug === 'admit-card';
	let result = data.category.slug === 'result';
	let answerkey = data.category.slug === 'answer-key';
	let syllabus = data.category.slug === 'syllabus';
	let admission = data.category.slug === 'admission';

	let fullYear = new Date().getFullYear();

// Dynamic SEO Title
	let pageTitle =
		job
			? `Latest Govt Jobs ${fullYear} - All Government Job Notifications`
			: admitcard
			? `Admit Card ${fullYear} - Download Govt Exam Hall Tickets`
			: result
			? `Sarkari Result ${fullYear} - Latest Government Exam Results`
			: answerkey
			? `Answer Key ${fullYear} - Official Govt Exam Solutions`
			: syllabus
			? `Govt Exam Syllabus ${fullYear} - SSC, Railway, Police Syllabus PDF`
			: admission
			? `Admissions in India ${fullYear} – Apply Online for Schools, Colleges & Universities`
			: `Latest Govt Jobs, Results, Admit Cards, Answer Keys, Syllabus & Admission Updates ${fullYear}`;

	// Dynamic Description
	let pageDesc =
		job
			? `Find the latest Govt Jobs ${fullYear} including SSC, Railways, Police, Banking, UPSC, Teaching, PSU & State Government vacancies updated daily.`
			: admitcard
			? `Download Admit Cards ${fullYear} for SSC, Railway, Police, Army, UPSC, Banking & other Govt Exams. Get fast and direct download links.`
			: result
			? `Check the latest Sarkari Result ${fullYear} for SSC, Railway, Police, Army, Bank & all major government exams. Updated instantly.`
			: answerkey
			? `Match official Answer Keys ${fullYear} for SSC, Railway, Police, Army, UPSC & other government exams. Verify your answers using official solutions.`
			: syllabus
			? `Download updated Govt Exam Syllabus ${fullYear} for SSC, Railway, Police, UPSC, Defence, Banking & State Government exams in PDF format.`
			: admission
			? `Get the latest Admission ${fullYear} updates for schools, colleges, universities, entrance exams & govt institutes. Check eligibility, fees & apply online links.`
			: `Get the latest Govt Jobs, Results, Admit Cards, Answer Keys, Syllabus & Admission updates in one place. Daily alerts & official links for ${fullYear}.`;

	// JSON-LD Schema object
	let schemaData = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": pageTitle,
		"url": `${SITE_URL}/${data.category.slug}`,
		"description": pageDesc,
		"potentialAction": {
			"@type": "SearchAction",
			"target": `${SITE_URL}/search?q={query}`,
			"query-input": "required name=query"
		}
	};

console.log(data.category.slug)
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
	headerBgColor={job
		? 'bg-sky-900'
		: admitcard
			? 'bg-emerald-900'
			: result
				? 'bg-amber-900'
				:  answerkey
					? 'bg-indigo-900'
					: syllabus
						? 'bg-rose-900'
						: admission
							? 'bg-yellow-900'
							: 'bg-neutral-900'}
>
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
				slug={data.category.slug}
			/>
		{/if}
	{/each}
</Layout>
