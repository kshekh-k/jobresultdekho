<script lang="ts">
	import Layout from '$lib/components/Layout.svelte';
	import RichTextRenderer from '$lib/components/RichTextRenderer.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { marked } from 'marked'
	import {
		formatDate,
		getMediaUrl,
		SITE_URL,
		SITE_NAME,
		SITE_LOGO,
		OG_IMAGE
	} from '$lib/utils';
	import { Calendar, User } from 'lucide-svelte';
	import DOMPurify from 'dompurify'
	import { page } from '$app/stores';
	export let data;
	let author = 'Admin';
	console.log("blog data", data);
	$: currentUrl = $page.url.href;
	const BLOG_OG_IMAGE = data.blog?.cover_image?.url ? getMediaUrl(data.blog?.cover_image?.url) : OG_IMAGE;
$: html = DOMPurify.sanitize(marked.parse(data.blog?.content))
</script>

<svelte:head>
	<title>{data.blog?.title} - {data.blog.SEO?.title}</title>
	<meta name="description" content={data.blog.SEO?.description} />
	<meta name="keywords" content={data.blog.SEO?.tags} />
	<meta property="og:site_name" content={SITE_NAME} />
	<link rel="canonical" href={currentUrl} />
	<meta property="og:title" content="{data.blog.SEO?.title} - {SITE_NAME}" />
	<meta property="og:description" content={data.blog.SEO?.description} />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:image" content={BLOG_OG_IMAGE} />
	<meta property="og:type" content="website" />

	<!-- Schema.org JSON-LD (SEO Boost) -->
	{@html `
	<script type="application/ld+json">
	${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': `${currentUrl}/#WebPage`,
		name: `Blog - ${SITE_NAME}`,
		headline: `Blog - ${SITE_NAME}`,
		url: `${SITE_URL}/contact`,
		image: BLOG_OG_IMAGE,
		description: `${data.blog.SEO?.description}`,
		isPartOf: {
			'@type': 'WebSite',
			'@id': `${currentUrl}/#website`,
			inLanguage: 'en-IN',
			name: SITE_NAME,
			url: SITE_NAME
		},
		author: {
			'@type': 'Organization',
			name: author,
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
<Layout header={false} heading={'Our Blog'}>
	<Card.Root class="">
		<Card.Header>
			<h2
				class="text-2xl font-semibold text-slate-700 group-hover:text-rose-500 ease-in-out duration-200"
			>
				{data.blog?.title}
			</h2>
			<div class="flex gap-2 divide-x divide-slate-300">
				<p class="text-slate-500 text-sm pr-2 flex gap-1 items-center">
					<Icon name={Calendar} size={14} />{formatDate(data.blog.publishedAt)}
				</p>
				<p class="text-slate-500 text-sm flex gap-1 items-center">
					<Icon name={User} size={14} />{author}
				</p>
			</div>
		</Card.Header>
		<Card.Content>
			{#if data.blog?.cover_image}
				<div class="overflow-hidden rounded-xl mb-5">
					<img src={getMediaUrl(data.blog?.cover_image?.url)} alt={data.blog?.title} title={data.blog?.title} class="" />
				</div>
			{/if}
			
			 <div
				class="prose prose-slate max-w-none
					prose-headings:font-semibold
					prose-a:text-rose-500
					prose-pre:bg-slate-900
					prose-pre:text-slate-100
					prose-code:text-rose-500"
					
			>
			<div {@html html}></div>
			<!-- <RichTextRenderer content={data.blog?.content} /> -->
			</div>
		</Card.Content>
	</Card.Root>
</Layout>
