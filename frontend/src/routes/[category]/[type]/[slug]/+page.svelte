<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import Icon from '$lib/components/ui/Icon.svelte';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { daysLeft, daysLeftLabel, formatDate, getMediaUrl ,SITE_URL } from '$lib/utils';
	import Layout from '$lib/components/Layout.svelte';
	import ImportantDates from '$lib/components/job/Dates.svelte';
	import ApplicationFees from '$lib/components/job/Fee.svelte';
	import RichTextRenderer from '$lib/components/RichTextRenderer.svelte';
	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import { page } from '$app/stores';
	
	$: currentUrl = $page.url.href;
	$: {
		console.log("URL:", currentUrl);
	}

	export let data: { content: any; type: string };
	export let buttonLabel: string | undefined =
		data.type === 'jobs'
			? 'Apply Now'
			: data.type === 'results'
				? 'View Now'
				: data.type === 'admit-cards'
					? 'Download Now'
					: data.type === 'admissions'
						? 'View Now'
						: data.type === 'answer-key'
							? 'Match Now'
							: data.type === 'syllabus'
								? 'Check Now'
								: undefined;

	//console.log('Job', data.content.banner_image.url);
	//console.log('Media URL', getMediaUrl(data.content.banner_image.url));
	let seo_defulat_img = 'image/jobresultdekho-og-image.png';

</script>

<svelte:head>
	<title>{data.content.title} | JobResultDekho.com</title>
	<meta name="description" content={data.content.SEO?.title} />
	<meta name="keywords" content={data.content.SEO?.tags} />
	<meta name="author" content="JobResultDekho.com" />
	<meta property="og:title" content={data.content.SEO?.title} />
	<meta property="og:description" content={data.content.SEO?.description} />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="en" />
	<meta name="classification" content="Job Updates, Results, Admit Cards, Govt Jobs" />

	<!-- Canonical URL -->
	<link rel="canonical" href={'page url goes here'}>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.content.SEO?.title} />
	<meta property="og:description" content={data.content.SEO?.description} />
	<meta property="og:url" content={'page url goes here'} />
	<meta property="og:site_name" content="JobResultDekho.com" />
	<meta property="og:image" content="https://jobresultdekho.com/{seo_defulat_img}" />
	<meta property="og:image:alt" content={data.content.SEO?.title} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.content.SEO?.title} />
	<meta name="twitter:description" content={data.content.SEO?.description} />
	<meta name="twitter:image" content="https://jobresultdekho.com/{seo_defulat_img}" />
	<meta name="twitter:site" content="@JobResultDekho" />

	<!-- Apple / Android PWA -->
	<meta name="apple-mobile-web-app-title" content="JobResultDekho" />
	<meta name="application-name" content="JobResultDekho" />
	<meta name="theme-color" content="#0c4a6e" />
	<meta name="mobile-web-app-capable" content="yes" />

    <!-- Article Structured Data (JSON-LD) -->
  	<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "{data.content.SEO?.title}",
      "description": "{data.content.SEO?.description}",
      "url": "{page url goes here}",
      "image": "https://jobresultdekho.com/{seo_defulat_img}",
      "publisher": {
        "@type": "Organization",
        "name": "JobResultDekho.com",
        "logo": {
          "@type": "ImageObject",
          "url": "/image/jobresultdekho-logo-white.svg"
        }
      },
      "author": {
        "@type": "Organization",
        "name": "JobResultDekho.com"
      },
      "datePublished": "{data.content.createdAt}",
      "dateModified": "{data.content.updatedAt}"
    }
  	</script>

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
										{formatDate(data.content.last_date)}
									</td>
								{/if}

								<td class="sm:px-4 p-2 text-sm border font-semibold text-green-600"
									>{data.content.total_posts}</td
								>
								<td class="sm:px-4 p-2 text-sm border font-semibold">
									<Button
										href={data.content.reference_url}
										target="_blank"
										variant="success"
										size="sm"
										class={'no-underline !w-full'}
									>
										{buttonLabel}
									</Button>
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
									<td class="sm:px-4 p-2 text-sm border whitespace-nowrap font-semibold"
										>{formatDate(data.content.last_date)}</td
									>
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
									<Button
										href={data.content.reference_url}
										target="_blank"
										variant="success"
										size="sm"
										class={'no-underline !w-full'}
									>
										{buttonLabel}
									</Button>
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
					<div class="flex justify-center items-center">
						<img src="{getMediaUrl(data.content.banner_image?.url)}" alt="" class="object-cover !mt-0" />
					</div>
					<div class="flex flex-col gap-2">
						<h3 class="!my-0">NOTE:</h3>
						<p class="italic !my-0">
							छात्रों को सलाह दी जाती है कि फॉर्म भरने से पहले आधिकारिक सूचना में दी गई सभी शर्तों
							(अंतिम तिथि, आयु सीमा, योग्यता आदि) की जांच अवश्य कर लें। सभी बिंदु पढ़ने के बाद ही
							आवेदन करें।
						</p>
						<p class="italic !my-0">
							Students are advised to carefully review all the details mentioned in the official
							notification (such as the last date, age limit, qualifications, etc.) before filling
							out the form. Please submit your application only after thoroughly reading all the
							points.
						</p>
					</div>
				</div>
			</div>
		</Card.Content>
	</Card.Root>

	<Card.Root class="overflow-hidden rounded-md gap-0">
		<Card.Content class="px-3 lg:px-6">
			<div class="flex flex-col-reverse md:grid md:grid-cols-12 gap-5">
				<!-- Ad Places -->
				<div class="flex justify-center items-center rounded-sm bg-gray-100 col-span-5">
					<a href="{SITE_URL}/contact" class="block rounded-sm overflow-hidden">								 
						<img src="/image/JobResultdekho-square.png" alt="Job Result Dekho" class="object-cover block " />
					</a>
				</div>
				{#if data.content.important_links}
					<div class="prose max-w-none bg-indigo-50 rounded-sm p-3 col-span-7">
						<h3 class="text-sky-800 text-center uppercase">Important Links</h3>
						<table class="min-w-full border border-collapse table-auto">
							<thead>
								<tr class="bg-sky-800 text-white">
									<th
										class="sm:px-4 p-2 text-left text-xs sm:text-sm font-medium border text-nowrap text-white hidden sm:table-cell"
										>Sr. No.</th
									>
									<th class="sm:px-4 p-2 text-left text-xs sm:text-sm font-medium border text-white"
										>Title</th
									>
									<th class="sm:px-4 p-2 text-left text-xs sm:text-sm font-medium border text-white"
										>Link</th
									>
								</tr>
							</thead>
							<tbody class="divide-y">
								{#each data.content.important_links as link, index}
									<tr class="odd:bg-white even:bg-slate-50">
										<td
											class="sm:px-4 p-2 text-xs sm:text-sm border hidden sm:table-cell"
											valign="middle">{index + 1}.</td
										>
										<th class="sm:px-4 p-2 text-xs sm:text-sm border w-full">{link.Label}</th>
										<td class="sm:px-4 p-2 text-xs sm:text-sm border">
											{#if link.URL}
												<a
													href={link.URL}
													target="_blank"
													class="text-rose-600 hover:text-indigo-600 font-semibold no-underline text-nowrap"
													>Click Here
												</a>
											{:else}
												<a
													href="https://whatsapp.com/channel/0029VbBRYR7BA1f2coUANV3b"
													target="_blank"
													class="text-rose-600 hover:text-indigo-600 font-semibold no-underline text-nowrap m-0"
													>Click Here
												</a>
												<p class="whitespace-nowrap !m-0 text-semibold italic">
													Link activate soon
												</p>
											{/if}
										</td>
									</tr>
								{/each}
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
			class="no-underline w-60"
			size="xl">{buttonLabel}</Button
		>
	</div>

	<ShareButtons url={currentUrl} title={data.content.title} />
</Layout>
