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
	//console.log('Category List', data);
	const headingColor = [
		'--color-sky-900',
		'--color-emerald-900',
		'--color-amber-900',
		'--color-indigo-900',
		'--color-rose-900',
		'--color-yellow-900',
		'--color-orange-900',
		'--color-lime-900'
	];
	// Header configs
	const commanHeader = [
		{
			id: 'No.',
			department: 'Dept',
			label: 'Post',
			date: 'Last Date',
			timeLeft: 'Time Left',
			action: 'Action'
		}
	];
	const admitHeader = [
		{
			id: 'No.',
			department: 'Dept',
			label: 'Post',
			date: 'Exam Date',
			timeLeft: 'Time Left',
			action: 'Action'
		}
	];

	const resultHeader = [
		{
			id: 'No.',
			department: 'Dept',
			label: 'Post',
			date: 'Result Date',
			action: 'Action'
		}
	];

	const answerKeyHeader = [
		{
			id: 'No.',
			department: 'Dept',
			label: 'Post',
			date: 'Release Date',
			action: 'Action'
		}
	];

	const syllabusHeader = [
		{
			id: 'No.',
			department: 'Dept',
			label: 'Post',
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
			headers: admitHeader,
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
		},
		{
			key: 'waiting_list',
			type: 'waiting',
			headers: commanHeader,
			color: headingColor[6]
		},
		{
			key: 'archive_jobs',
			type: 'archive',
			headers: commanHeader,
			color: headingColor[7]
		}
	];

	const activeCategory = $derived(data?.category?.slug ?? null);

	const job = $derived(activeCategory === 'latest-job');
	const admitcard = $derived(activeCategory === 'admit-card');
	const result = $derived(activeCategory === 'result');
	const answerkey = $derived(activeCategory === 'answer-key');
	const syllabus = $derived(activeCategory === 'syllabus');
	const admission = $derived(activeCategory === 'admission');
	const waitinglist = $derived(activeCategory === 'waiting-list');
	const archivejob = $derived(activeCategory === 'archive-job');

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
			? `Find the latest Government Jobs ${fullYear} and Sarkari Naukri updates including SSC, Railway, UPSC, Banking, Teaching, Police, Defence, PSU and State Govt Job vacancies. Get official notifications, eligibility details, important dates and apply online links in one place.`
			: admitcard
				? `Download Admit Cards ${fullYear} for SSC, Railway, Banking, Police, Defence, UPSC and other Sarkari Exams. Check exam dates, shift timings, centres, roll number details and access direct official links easily.`
				: result
					? `Check the latest Sarkari Results ${fullYear} for SSC, Railway, Banking, Police, Defence, UPSC and State Govt exams. View result updates, merit lists, scorecards, cut-off marks and official notifications instantly.`
					: answerkey
						? `Get official Answer Keys ${fullYear} for SSC, Railway, Banking, Police, Defence, UPSC and other Sarkari Exams. Download PDFs, verify answers, estimate scores and track objections through official sources.`
						: syllabus
							? `Download updated Sarkari Exam Syllabus ${fullYear} for SSC, Railway, Banking, Police, Defence, UPSC and State-level Govt exams. Access subject-wise syllabus PDFs, exam patterns and preparation guidance.`
							: admission
								? `Get the latest Admission updates ${fullYear} for schools, colleges, universities and Govt institutions. Check entrance exams, eligibility, fees, counselling details, Sarkari forms and online application links.`
								: `Stay updated with the latest Sarkari Naukri, Govt Jobs, Sarkari Result, Admit Cards, Answer Keys, Syllabus and Admission notifications ${fullYear}. Get verified updates, official links and timely information.`
	);

	// Dynamic Description
	const headerBgColor = $derived(
		job
			? 'bg-sky-900'
			: admitcard
				? 'bg-emerald-900'
				: result
					? 'bg-amber-900'
					: answerkey
						? 'bg-indigo-900'
						: admission
							? 'bg-rose-900'
							: syllabus
								? 'bg-yellow-900'
								: waitinglist
									? 'bg-orange-900'
									: archivejob
										? 'bg-lime-900'
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

<Layout heading={data.category.title} {headerBgColor}>
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
		{console.log('sec.key', data.category[sec.key]?.length)}
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
