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
	import HomeContent from '$lib/components/HomeContent.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import Desclaimer from '$lib/components/Desclaimer.svelte';
	import { SITE_URL, SITE_NAME, OG_IMAGE, SITE_LOGO } from '$lib/utils';
	let fullYear = new Date().getFullYear();
</script>

<svelte:head>
	<title>Latest Govt Jobs & Sarkari Result Today</title>

	<meta
		name="description"
		content="Get the latest Sarkari Naukri & Govt Jobs {fullYear} updates with Sarkari Result Today, Govt Exam notifications, Admit Card, Answer Key, Syllabus, and Admission forms. {fullYear} govt job alerts updated daily."
	/>

	<meta
		name="keywords"
		content="sarkari naukri, latest sarkari naukri, govt jobs, latest govt jobs, government jobs notification, sarkari jobs in india, sarkari result, sarkari result today, govt exam result, exam result {fullYear}, sarkari exam, govt exam, government competitive exams, admit card, exam admit card, govt exam admit card, sarkari admit card, answer key, official answer key, govt exam answer key, syllabus, exam syllabus pdf, govt exam syllabus, sarkari syllabus, admission, admission form {fullYear}, college admission, university admission, entrance exam admission, sarkari bharti, govt job apply online, sarkari naukri {fullYear}, govt jobs {fullYear}, exam notifications, job alerts india"
	/>

	<!-- Open Graph -->
	<meta property="og:title" content="Latest Govt Jobs & Sarkari Result Today" />
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
	<meta name="twitter:title" content="Latest Govt Jobs & Sarkari Result Today" />
	<meta
		name="twitter:description"
		content="Stay updated with daily Govt Job alerts and Sarkari Results."
	/>
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
	"@context": "https://schema.org",
	"@type": "WebSite",
	"name": "Latest Govt Jobs & Sarkari Result Today",
	"headline":"Latest Govt Jobs & Sarkari Result Today",
	"url": SITE_URL,
	"image": OG_IMAGE,
	"description": `sarkari naukri, latest sarkari naukri, govt jobs, latest govt jobs, government jobs notification, sarkari jobs in india, sarkari result, sarkari result today, govt exam result, exam result ${fullYear}, sarkari exam, govt exam, government competitive exams, admit card, exam admit card, govt exam admit card, sarkari admit card, answer key, official answer key, govt exam answer key, syllabus, exam syllabus pdf, govt exam syllabus, sarkari syllabus, admission, admission form ${fullYear}, college admission, university admission, entrance exam admission, sarkari bharti, govt job apply online, sarkari naukri ${fullYear}, govt jobs ${fullYear}, exam notifications, job alerts india`,
	"publisher": {
			"@type": "Organization",
			"name": SITE_NAME,
			"logo": {
				"@type": "ImageObject",
				"url": SITE_LOGO
			}
		},
	"potentialAction": {
		"@type": "SearchAction",
		"target": `${SITE_URL}/search?q={query}`,
		"query-input": "required name=query"
	},
 
})}
</script>
`}

</svelte:head>
<div class="space-y-5">
	<HotPosts {hotPosts} />
	<div class="max-w-screen-xl mx-auto px-3">
		<Card.Root variant="default" class="py-0! rounded-md! sm:rounded-xl!">
			<Card.Content class="flex items-center justify-center text-center p-1!  ">
				<a href="{SITE_URL}/contact" class="block rounded-md! sm:rounded-xl! overflow-hidden">
					<img
						src="/image/JobResultDekho-Banner-horizontal.png"
						alt="Job Result Dekho"
						class="object-cover sm:block hidden"
					/>
					<img
						src="/image/JobResultDekho-Banner-mobile.png"
						alt="Job Result Dekho"
						class="object-cover block sm:hidden"
					/>
				</a>
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
	<Desclaimer />
</div>
