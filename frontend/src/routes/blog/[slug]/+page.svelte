<script lang="ts">
	import Layout from '$lib/components/Layout.svelte';
	import RichTextRenderer from '$lib/components/RichTextRenderer.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { formatDate } from '$lib/utils';
	import { ArrowRight, Calendar, User } from 'lucide-svelte';
	let title = 'Job Result Dekho first blog';
	let publishedAt = new Date().toDateString();
	let author = 'Admin';
	let featuredImage = '/image/RRB-NTPC-Vacancy-1.png';
	let summary = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
</script>
<svelte:head>
	<title>{title} — JobResultDekho</title>
	<meta
		name="description"
		content={summary}
	/>
</svelte:head>
<Layout header={false} heading={'Our Blog'}>
	<Card.Root class="">
		<Card.Header>
			<h2
				class="text-2xl font-semibold text-slate-700 group-hover:text-rose-500 ease-in-out duration-200"
			>
				{title}
			</h2>
			<div class="flex gap-2 divide-x divide-slate-300">
				<p class="text-slate-500 text-sm pr-2 flex gap-1 items-center">
					<Icon name={Calendar} size={14} />{formatDate(publishedAt)}
				</p>
				<p class="text-slate-500 text-sm flex gap-1 items-center">
					<Icon name={User} size={14} />{author}
				</p>
			</div>
		</Card.Header>
		<Card.Content>
			{#if featuredImage}
				<div class="overflow-hidden rounded-xl">
					<img src={featuredImage} alt="" class="" />
				</div>
			{/if}
			<RichTextRenderer content={summary} />
		</Card.Content>
	</Card.Root>
</Layout>
