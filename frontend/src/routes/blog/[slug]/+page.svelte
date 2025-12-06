<script lang="ts">
	import Layout from '$lib/components/Layout.svelte';
	import RichTextRenderer from '$lib/components/RichTextRenderer.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { formatDate, getMediaUrl } from '$lib/utils';
	import { ArrowRight, Calendar, User } from 'lucide-svelte';

	export let data;
	let author = 'Admin';
</script>
<svelte:head>
	<title>{data.blog.title} | JobResultDekho.com</title>
	<meta
		name="description"
		content={data.blog?.content}
	/>
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
			{#if data.blog.cover_image}
				<div class="overflow-hidden rounded-xl">
					<img src={getMediaUrl(data.blog.cover_image?.url)} alt="" class="" />
				</div>
			{/if}
			<RichTextRenderer content={data.blog?.content} />
		</Card.Content>
	</Card.Root>
</Layout>
