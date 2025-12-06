<script lang="ts">
	import Layout from '$lib/components/Layout.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { formatDate, getMediaUrl } from '$lib/utils';
	import { ArrowRight, Calendar, User } from 'lucide-svelte';

	export let data;
  	const { blogs } = data;
	
</script>
<svelte:head>
	<title>Blog | JobResultDekho.com</title>
	<meta
		name="description"
		content="Blog JobResultDekho.com for support, queries, and feedback."
	/>
</svelte:head>
<Layout heading={'Our Blog'} headerBgColor="bg-sky-500">
	<div class="sm:grid sm:grid-cols-2 flex flex-col gap-5">
		{#each blogs as blog}
			<Card.Root
				id="post-{blog.id}"
				class="hover:bg-slate-50 dark:hover:bg-slate-900 transition rounded-xl !p-4"
			>
				<a href={`/blog/${blog.slug}`} class="flex flex-col gap-3 group">
					{#if blog.cover_image}
						<div class="overflow-hidden rounded-xl">
							<img src={getMediaUrl(blog.cover_image?.url)} alt="" class="" />
						</div>
					{/if}
					<Card.Header class="px-0">
						<h2
							class="text-2xl font-semibold text-slate-700 group-hover:text-rose-500 ease-in-out duration-200"
						>
							{blog.title}
						</h2>
						<div class="flex gap-2 divide-x divide-slate-300">
							<p class="text-slate-500 text-sm pr-2 flex gap-1 items-center">
								<Icon name={Calendar} size={14} />{formatDate(blog.publishedAt)}
							</p>
							<p class="text-slate-500 text-sm flex gap-1 items-center">
								<Icon name={User} size={14} />Admin
							</p>
						</div>
					</Card.Header>
					<Card.Content class="flex-1 px-0 gap-2 flex flex-col">
						<p class="max-h-20 line-clamp-2 text-slate-600">{blog?.short_description}</p>
						<div class="flex justify-start">
							<a
								href={`/blog/${blog.slug}`}
								class="text-sky-500 font-medium inline-flex gap-1 items-center hover:text-rose-500 ease-in-out duration-200"
								>Learn More <Icon name={ArrowRight} />
							</a>
						</div>
					</Card.Content>
				</a>
			</Card.Root>
		{/each}
	</div>
</Layout>
