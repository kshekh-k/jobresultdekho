<script lang="ts">
	export let data: {
		latestAdmissions?: any[];
		latestAdmitCards?: any[];
		latestAnswerKeys?: any[];
		hotPosts?: any[];
		highAlertPosts?: any[];
		latestJobs?: any[];
		latestResults?: any[];
		latestSyllabus?: any[];
		categoryTree?: any[];
	};
	const {
		latestAdmissions = [],
		latestAdmitCards = [],
		latestAnswerKeys = [],
		hotPosts = [],
		highAlertPosts = [],
		latestJobs = [],
		latestResults = [],
		latestSyllabus = [],
		categoryTree = []
	} = data;

	import * as Card from '$lib/components/ui/card/index.js';
	import HotPosts from '$lib/components/HotPosts.svelte';
	import DynamicAd from '$lib/components/DynamicAd.svelte';
	import HomeContent from '$lib/components/HomeContent.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import Desclaimer from '$lib/components/Desclaimer.svelte';
	import { SITE_URL, SITE_NAME, OG_IMAGE, SITE_LOGO } from '$lib/utils';
	let title = `Sarkari Result 2026: Latest Govt Jobs, Sarkari Naukri, Admit Card & Results - ${SITE_NAME}`;
	let title_og = `"Sarkari Result 2026 – Latest Govt Jobs & Results`;
	let fullYear = new Date().getFullYear();
</script>

<svelte:head>
	<title>{title}</title>

	<meta
		name="description"
		content="Check Sarkari Result {fullYear}, latest govt jobs, sarkari naukri, admit card, answer key and exam results. Get fast updates on all government jobs in India."
	/>

	<meta
		name="keywords"
		content="sarkari naukri, latest sarkari naukri, govt jobs,  latest govt jobs, government jobs notification, sarkari jobs in india, sarkari result, sarkari result today, govt exam result,  exam result {fullYear}, sarkari exam, govt exam, government competitive exams, admit card,  exam admit card,  govt exam admit card,  sarkari admit card, answer key,  official answer key,  govt exam answer key, Syllabus, exam syllabus pdf, govt exam syllabus, sarkari syllabus, Admission, admission form {fullYear}, college admission, university admission, entrance exam admission, sarkari bharti, govt job apply online, sarkari naukri {fullYear}, govt jobs {fullYear}"
	/>

	<!-- Open Graph -->
	<meta property="og:title" content={title_og} />
	<meta
		property="og:description"
		content="sarkari naukri, latest sarkari naukri, govt jobs, latest govt jobs, government jobs notification, sarkari jobs in india, sarkari result, sarkari result today, govt exam result, exam result {fullYear}, sarkari exam, govt exam, government competitive exams, admit card, exam admit card, govt exam admit card, sarkari admit card, answer key, official answer key, govt exam answer key, syllabus, exam syllabus pdf, govt exam syllabus, sarkari syllabus, admission, admission form {fullYear}, college admission, university admission, entrance exam admission, sarkari bharti, govt job apply online, sarkari naukri {fullYear}, govt jobs {fullYear}, exam notifications, job alerts india"
	/>
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:type" content="website" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Sarkari Result {fullYear} Updates" />
	<meta name="twitter:description" content="Latest govt jobs, admit card and results updates." />
	<meta name="twitter:image" content={OG_IMAGE} />

	<!-- Mobile Tags -->
	<meta name="theme-color" content="#0B5ED7" />
	<meta name="format-detection" content="telephone=no" />

	<link rel="canonical" href={SITE_URL} />
	<link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" sizes="180x180" />
	<link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" href="/favicon/favicon-32x32.png" sizes="32x32" type="image/png" />
	<link rel="icon" href="/favicon/favicon-16x16.png" sizes="16x16" type="image/png" />
	<link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
	<link rel="manifest" href="/favicon/site.webmanifest" />

	<!-- Schema.org JSON-LD (SEO Boost) -->
	{@html `
<script type="application/ld+json">
${JSON.stringify({
	'@context': 'https://schema.org',
	'@type': 'webpage',
	'@id': `${SITE_URL}/#webpage`,
	name: title,
	headline: title,
	url: SITE_URL,
	image: OG_IMAGE,
	logo: SITE_LOGO,
	description: `Check Sarkari Result ${fullYear}, latest govt jobs, sarkari naukri, admit card, answer key and exam results.`,
	publisher: {
		'@type': 'Organization',
		name: SITE_NAME,
		logo: {
			'@type': 'ImageObject',
			url: SITE_LOGO
		}
	},
	isPartOf: {
		'@type': 'WebSite',
		'@id': `${SITE_URL}/#website`,
		name: SITE_NAME,
		url: SITE_URL
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
<h1 class="sr-only">Sarkari Result {fullYear} - {SITE_NAME}</h1>

<div class="space-y-5">
	<HotPosts {hotPosts} />
	<div class="max-w-screen-xl mx-auto px-3">
		<!-- Home Page top Area for Ads Section for Mobile desktop and Google Adsense -->
		<Card.Root variant="default" class="py-0! rounded-md! sm:rounded-xl!">
			<Card.Content class="flex items-center justify-center text-center p-1!">
				<DynamicAd adSlug="home-top-ad" />
			</Card.Content>
		</Card.Root>
	</div>
	<HomeContent
		{latestAdmissions}
		{latestAdmitCards}
		{latestAnswerKeys}
		{latestJobs}
		{latestResults}
		{latestSyllabus}
		{categoryTree}
	/>
	<Stats />
<div class="max-w-screen-xl mx-auto px-3 space-y-5">
	<Card.Root variant="default" class="py-0! rounded-md! sm:rounded-xl!">
		<Card.Content class="flex items-center justify-center p-1!">
			<div class="prose max-w-none p-3">
				<h2 class="mb-0!">All Sarkari Results {fullYear} in One Place</h2>

				<p>
					Sarkari Result {fullYear} par aapko milti hai latest govt jobs, sarkari naukri updates, admit
					card, answer key aur exam results ki fast aur accurate jankari. Yahan aap daily new vacancy
					aur recruitment notification check kar sakte hain.
				</p>
			</div>
		</Card.Content>

	</Card.Root>
</div>
	<Desclaimer />
</div>
