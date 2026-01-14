<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import Icon from '$lib/components/ui/Icon.svelte';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import {
		formatDate,
		getMediaUrl,
		SITE_URL,
		SITE_NAME,
		SITE_LOGO,
		OG_IMAGE,
		richTextToPlainText,
		extractTextFromRichText
	} from '$lib/utils';
	import Layout from '$lib/components/Layout.svelte';
	import ImportantDates from '$lib/components/job/Dates.svelte';
	import ApplicationFees from '$lib/components/job/Fee.svelte';
	import RichTextRenderer from '$lib/components/RichTextRenderer.svelte';
	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import { page } from '$app/stores';

	$: currentUrl = $page.url.href;

	export let data: { content: any; type: string };
	console.log(data.content);

	let job = data.type === 'jobs';
	let admitcard = data.type === 'admit-cards';
	let result = data.type === 'results';
	let answerkey = data.type === 'answer-keys';
	let syllabus = data.type === 'syllabus';
	let admission = data.type === 'admissions';

	export let buttonLabel: string | undefined = job
		? 'Apply Now'
		: result
			? 'View Now'
			: admitcard
				? 'Download Now'
				: admission
					? 'View Now'
					: answerkey
						? 'Match Now'
						: syllabus
							? 'Check Now'
							: 'View Now';
	let metaShorDescipt = Array.isArray(data.content.short_description)
		? richTextToPlainText(data.content.short_description, 160)
		: extractTextFromRichText(data.content.short_description, 160);
	const pageTitle = data.content.SEO?.title ? data.content.SEO?.title : data.content.title;
	const pageDesc = data.content.SEO?.description
		? data.content.SEO?.description
		: `${metaShorDescipt} 
		 Get complete details for ${data.content.title}`;

	const POST_OG_IMAGE = data.content.banner_image?.url
		? getMediaUrl(data.content.banner_image?.url)
		: OG_IMAGE;
</script>

<svelte:head>
	<title>{pageTitle} - {SITE_NAME}</title>
	<!-- META DESCRIPTION -->
	<meta name="description" content={pageDesc} />

	<!-- META KEYWORDS -->
	<meta
		name="keywords"
		content={data.content.SEO?.tags
			? data.content.SEO?.tags
			: 'govt jobs, sarkari result, admit card'}
	/>

	<meta name="author" content={SITE_NAME} />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="en" />

	<!-- CANONICAL -->
	<link rel="canonical" href={currentUrl} />

	<!-- OG META -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDesc} />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:image" content={POST_OG_IMAGE} />
	<meta property="og:site_name" content={SITE_NAME} />

	<!-- TWITTER -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDesc} />
	<meta name="twitter:image" content={POST_OG_IMAGE} />

	<!-- PWA -->
	<meta name="apple-mobile-web-app-title" content={SITE_NAME} />
	<meta name="application-name" content={SITE_NAME} />
	<meta name="theme-color" content="#0c4a6e" />
	<meta name="mobile-web-app-capable" content="yes" />

	<!-- JSON-LD ARTICLE SCHEMA (RAW INJECTION) -->
	{@html `
	<script type="application/ld+json">
	${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': `${currentUrl}#webpage`,
		headline: pageTitle,
		description: pageDesc,
		url: currentUrl,
		image: POST_OG_IMAGE,
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
		},
		datePublished: data.content.createdAt,
		dateModified: data.content.updatedAt
	})}
	</script>
	`}
</svelte:head>
<Layout header={false} heading={''}>
	<Card.Root class="overflow-hidden rounded-md gap-0">
		<Card.Header class="flex flex-col items-start justify-start px-3 gap-0 lg:px-6">
			<h1 class="text-center md:text-left text-2xl md:text-4xl font-bold text-sky-700">
				{data.content.title}
			</h1>
			<div class="prose max-w-none w-full">
				<RichTextRenderer content={data.content.short_description} className="" />
				<div class="hidden sm:block pb-1">
					<table class="min-w-full border border-slate-300 border-collapse table-auto !m-0">
						<thead>
							<tr class="bg-sky-800 text-white">
								<th class="sm:px-4 p-2 text-left text-sm font-medium border text-white"
									>Department</th
								>
								{#if data.type !== 'syllabus'}
									<th
										class="sm:px-4 p-2 text-left text-sm font-medium border whitespace-nowrap text-white"
										>{data.type === 'jobs'
											? 'Last Date'
											: data.type === 'admit-cards'
												? 'Exam Date'
												: data.type === 'answer-key'
													? 'Release Date'
													: data.type === 'results'
														? 'Result Date'
														: 'Last Date'}</th
									>
								{/if}

								<th
									class="sm:px-4 p-2 text-left text-sm font-medium border whitespace-nowrap text-white"
									>Total Posts</th
								>

								<th
									class="sm:px-4 p-2 text-left text-sm font-medium border whitespace-nowrap text-white"
									>Action</th
								>
							</tr>
						</thead>
						<tbody class="divide-y">
							<tr>
								<td class="sm:px-4 p-2 text-sm border font-semibold"
									>{data.content.department?.title || '—'}</td
								>
								{#if data.type !== 'syllabus'}
									<td class="sm:px-4 p-2 text-sm border whitespace-nowrap font-semibold">
										{#if data.content.Start_date === false && data.content.Apply_date_Start_message}
											<span class="text-sm text-gray-600 italic"
												>{data.content.Apply_date_Start_message}</span
											>
										{:else}
											{formatDate(data.content.last_date)}
										{/if}
									</td>
								{/if}

								<td class="sm:px-4 p-2 text-sm border font-semibold text-green-600"
									>{data.content.total_posts}</td
								>

								<td class="sm:px-4 p-2 text-sm border font-semibold">
									{#if data.content.Link_not_available == false}
										<Button
											href={data.content.reference_url}
											target="_blank"
											title={buttonLabel}
											rel="nofollow noopener noreferrer external"
											variant="success"
											size="sm"
											class={'no-underline !w-full'}
										>
											{buttonLabel}
										</Button>{/if}
									{#if data.content.Link_not_available == true}
										<div class="flex flex-col">
											<p class="text-neutral-600 text-sm m-0!">
												{data.content.Link_Activate_Message}
											</p>
											<a
												href="https://www.instagram.com/job_resultdekho/"
												rel="nofollow noopener noreferrer external"
												target="_blank"
												title={'Join our Instagram'}
												class="text-rose-600 hover:text-indigo-600 font-semibold no-underline text-nowrap"
												>Click Here</a
											>
										</div>
									{/if}
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="flex flex-col gap-5 pb-1 sm:hidden">
					<table class="min-w-full border border-slate-300 border-collapse table-auto !m-0">
						<thead>
							<tr class="bg-sky-800 text-white">
								<th class="sm:px-4 p-2 text-left text-sm font-medium border text-white w-1/2"
									>Department</th
								>
								{#if data.type !== 'syllabus'}
									<th
										class="sm:px-4 p-2 text-left text-sm font-medium border whitespace-nowrap text-white w-1/2"
										>{data.type === 'jobs'
											? 'Last Date'
											: data.type === 'admit-cards'
												? 'Exam Date'
												: data.type === 'answer-key'
													? 'Release Date'
													: data.type === 'result'
														? 'Result Date'
														: 'Last Date'}</th
									>
								{/if}
							</tr>
						</thead>
						<tbody class="divide-y">
							<tr>
								<td class="sm:px-4 p-2 text-sm border font-semibold"
									>{data.content.department?.title || '—'}</td
								>
								{#if data.type !== 'syllabus'}
									<td class="sm:px-4 p-2 text-sm border whitespace-nowrap font-semibold">
										{#if data.content.Start_date === false && data.content.Apply_date_Start_message}
											<span class="text-sm text-gray-600 italic"
												>{data.content.Apply_date_Start_message}</span
											>
										{:else}
											{formatDate(data.content.last_date)}
										{/if}
									</td>
								{/if}
							</tr>
						</tbody>
					</table>
					<table class="min-w-full border border-slate-300 border-collapse table-auto !m-0">
						<thead>
							<tr class="bg-sky-800 text-white">
								<th
									class="sm:px-4 p-2 text-left text-sm font-medium border whitespace-nowrap text-white w-1/2"
									>Total Posts</th
								>
								<th
									class="sm:px-4 p-2 text-left text-sm font-medium border whitespace-nowrap text-white"
									>Action</th
								>
							</tr>
						</thead>
						<tbody class="divide-y">
							<tr>
								<td class="sm:px-4 p-2 text-sm border font-semibold text-green-600"
									>{data.content.total_posts}</td
								>
								<td class="sm:px-4 p-2 text-sm border font-semibold">
									{#if data.content.Link_not_available == false}
										<Button
											href={data.content.reference_url}
											target="_blank"
											title={buttonLabel}
											rel="nofollow noopener noreferrer external"
											variant="success"
											size="sm"
											class={'no-underline !w-full'}
										>
											{buttonLabel}
										</Button>
									{/if}
									{#if data.content.Link_not_available == true}
										<div class="flex flex-col">
											<p class="text-neutral-600 text-sm m-0!">
												{data.content.Link_Activate_Message}
											</p>
											<a
												href="https://www.instagram.com/job_resultdekho/"
												rel="nofollow noopener noreferrer external"
												target="_blank"
												title={'Join our Instagram'}
												class="text-rose-600 hover:text-indigo-600 font-semibold no-underline text-nowrap"
												>Click Here</a
											>
										</div>
									{/if}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</Card.Header>
		<Card.Content class="px-3 lg:px-6">
			<div class="prose max-w-none pt-5">
				<div class="grid grid-cols-12 gap-5">
					<!-- Important Dates -->
					<ImportantDates dates={data.content.important_dates} />
					<!-- Application Fee -->
					<!-- <ApplicationFees fees={data.content.application_fee} /> -->
					<ApplicationFees fees={data.content.application_fee} />
				</div>
				<!-- Eligibility Criteria -->
				<div class="flex flex-col mt-5">
					<div class="bg-sky-800 py-2 px-3">
						<h3 class="text-xl font-semibold text-white !m-0 p-0">Eligibility Criteria</h3>
					</div>
					<div class="border border-slate-200 !mt-0 px-3 sm:px-5">
						<RichTextRenderer content={data.content.eligiblity_criterea?.content} />
					</div>
				</div>
				<div class="flex flex-col mt-5">
					<h2 class="!m-0 text-sky-800 text-3xl">Overview & Vacancy Details</h2>
					<RichTextRenderer content={data.content?.content} />
					<!-- This is job banner -->
					{#if data.content.banner_image?.url}
						<div class="flex justify-center items-center">
							<img
								src={getMediaUrl(data.content.banner_image?.url)}
								alt={data.content.title}
								title={data.content.title}
								class="object-cover !mt-0"
							/>
						</div>
					{/if}
					<h4 class="font-semibold">NOTE</h4>
					<p class="italic">
						छात्रों को सलाह दी जाती है कि फॉर्म भरने से पहले आधिकारिक सूचना में दी गई सभी शर्तों
						(अंतिम तिथि, आयु सीमा, योग्यता आदि) की जांच अवश्य कर लें। सभी बिंदु पढ़ने के बाद ही
						आवेदन करें।
					</p>
					<p class="italic mt-0!">
						Students are advised to carefully review all the details mentioned in the official
						notification (such as the last date, age limit, qualifications, etc.) before filling out
						the form. Please submit your application only after thoroughly reading all the points.
					</p>
				</div>
			</div>
		</Card.Content>
	</Card.Root>

	<Card.Root class="overflow-hidden rounded-md gap-0">
		<Card.Content class="px-3 lg:px-6">
			<div class="flex flex-col-reverse md:grid md:grid-cols-12 gap-5">
				<!-- Ad Places -->
				<div class="flex justify-center items-center rounded-sm bg-gray-100 col-span-5">
					<a href="{SITE_URL}/contact" title={SITE_NAME} class="block rounded-sm overflow-hidden">
						<img
							src="/image/JobResultdekho.png"
							alt={SITE_NAME}
							title={SITE_NAME}
							class="object-cover block"
						/>
					</a>
				</div>
				{#if data.content.important_links}
					<div class="prose max-w-none bg-sky-900 rounded-sm p-3 col-span-7 flex flex-col">
						<h3 class="text-white text-center uppercase">Important Links</h3>

						<table class="min-w-full border border-sky-900 border-collapse table-fixed">
							<thead>
								<tr class="bg-rose-500 text-white">
									<th
										class="sm:px-4 p-2 text-left text-xs sm:text-sm font-medium border border-sky-900 text-white"
										>Title</th
									>
									<th
										class="sm:px-4 p-2 text-left text-xs sm:text-sm font-medium border border-sky-900 text-white"
										>Link</th
									>
								</tr>
							</thead>
							<tbody class="divide-y">
								{#each data.content.important_links as link, index}
									<tr class="odd:bg-white even:bg-slate-50">
										<th class="sm:px-4 p-2 text-xs sm:text-sm border border-sky-900 w-full"
											>{link.Label}</th
										>
										<td class="sm:px-4 p-2 text-xs sm:text-sm border border-sky-900">
											{#if link.Need_PDF_upload && link.Upload_PDF}
												<a
													href={getMediaUrl(link.Upload_PDF.url)}
													rel="nofollow noopener noreferrer external"
													target="_blank"
													title={link.Label}
													class="text-rose-600 hover:text-indigo-600 font-semibold no-underline text-nowrap"
													>Click Here
												</a>
											{:else if link.Link_message_require == false}
												<a
													href={link.URL}
													rel="nofollow noopener noreferrer external"
													target="_blank"
													title={link.Label}
													class="text-rose-600 hover:text-indigo-600 font-semibold no-underline text-nowrap"
													>Click Here
												</a>
											{:else}
												<div class="flex flex-col">
													<p class="text-neutral-600 text-sm m-0!">{link.Link_message}</p>
													<a
														class="text-red-600 hover:text-indigo-600 font-semibold no-underline text-nowrap"
														href="https://www.instagram.com/job_resultdekho/"
														rel="nofollow noopener noreferrer external"
														target="_blank"
														title="Join our Instagram">Click Here</a
													>
												</div>
											{/if}
										</td>
									</tr>
								{/each}

								<tr class="odd:bg-white even:bg-slate-50">
									<th class="sm:px-4 p-2 text-xs sm:text-sm border border-sky-900 w-full"
										>Join Whatsapp Channel</th
									>
									<td class="sm:px-4 p-2 text-xs sm:text-sm border border-sky-900"
										><a
											href="https://whatsapp.com/channel/0029VbBRYR7BA1f2coUANV3b"
											target="_blank"
											title="Join WhatsApp Channel"
											rel="nofollow noopener noreferrer external"
											class="text-rose-600 hover:text-indigo-600 font-semibold no-underline text-nowrap m-0"
											>Click Here
										</a></td
									></tr
								>
								<tr class="odd:bg-white even:bg-slate-50">
									<th class="sm:px-4 p-2 text-xs sm:text-sm border border-sky-900 w-full"
										>Join Telegram Channel</th
									>
									<td class="sm:px-4 p-2 text-xs sm:text-sm border border-sky-900"
										><a
											href="https://t.me/sarkari_jobresultdekho"
											target="_blank"
											title="Join WhatsApp Channel"
											rel="nofollow noopener noreferrer external"
											class="text-rose-600 hover:text-indigo-600 font-semibold no-underline text-nowrap m-0"
											>Click Here
										</a></td
									></tr
								>
							</tbody>
						</table>
					</div>
				{/if}
			</div>
		</Card.Content>
	</Card.Root>

	{#if data.content.FAQs}
		<div class="flex flex-col gap-3 max-w-none prose mt-10">
			<h3 class="text-sky-800 text-center md:text-left">
				<span class="block">FAQs: {data.content.title}</span>
			</h3>
			<Accordion.Root type="single" class="gap-2">
				{#each data.content.FAQs as question, index}
					<Accordion.Item value="item-{index}" class="mb-2 border-0">
						<Card.Root class="overflow-hidden rounded-md gap-0 p-2">
							<Card.Header class="flex flex-col items-start justify-start gap-3 px-2 sm:px-4">
								<Accordion.Trigger class="lg:text-lg hover:no-underline"
									>{question.Question}</Accordion.Trigger
								>
							</Card.Header>
							<Card.Content class="px-2 sm:px-4">
								<Accordion.Content class="lg:text-lg">{question.Answer}</Accordion.Content>
							</Card.Content>
						</Card.Root>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</div>
	{/if}

	<!-- Education Criterea -->
	<Card.Root class="overflow-hidden rounded-md gap-0 p-2">
		<Card.Header class="flex flex-col items-start justify-start gap-3 px-2 sm:px-4">
			<h3 class="text-sky-800 text-center uppercase font-semibold">Disclaimer</h3>
		</Card.Header>
		<Card.Content class="p-2 sm:px-4 ">
			<RichTextRenderer content={data.content.job_disclaimer?.content} />
		</Card.Content>
	</Card.Root>
	<div class="flex justify-center pt-5">
		<Button
			href={data.content.reference_url}
			variant="success"
			target="_blank"
			rel="nofollow noopener noreferrer external"
			title={buttonLabel}
			class="no-underline w-60"
			size="xl">{buttonLabel}</Button
		>
	</div>

	<ShareButtons url={currentUrl} title={data.content.title} />
</Layout>
