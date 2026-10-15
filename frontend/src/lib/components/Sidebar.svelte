<script lang="ts">
	import { getContext } from 'svelte';
	export let className: string = 'lg:col-span-4 xl:col-span-3 space-y-4';
	export let closingSoonJobs: any[] | undefined = undefined;
	import { Image, FileText, Calculator, Signature, Megaphone } from 'lucide-svelte';
	import { CalendarRange, NotepadTextDashed, TypeOutline } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Widget from './Widget.svelte';
	import ClosingSoonWidget from './ClosingSoonWidget.svelte';
	import { SITE_URL } from '$lib/utils';
	import DynamicAd from './DynamicAd.svelte';

	let userMenus = [
		{ title: 'Name & DOB on photo', slug: `${SITE_URL}/photo-editor`, icon: CalendarRange },
		{ title: 'Image to PDF Converter', slug: `${SITE_URL}/image-to-pdf`, icon: FileText },
		{ title: 'Age Calculator', slug: `${SITE_URL}/age-calculator`, icon: Calculator },
		{ title: 'All Blogs', slug: `${SITE_URL}/blog`, icon: Megaphone },
		// { title: "Photo Signature", slug:  `${SITE_URL}/`, icon: Signature },
		{
			title: 'Case Converter',
			slug: 'https://techmind.click',
			icon: NotepadTextDashed,
			target: '_blank'
		}
		// { title: 'Typing Test', slug: `${SITE_URL}/#`, icon: TypeOutline }
	];

	// Parent & children category
	const categoryTree: any[] = (getContext('categoryTree') as any[]) || [];
	const parents: { title: any; slug: any }[] = [];
	const children = [];
	if (categoryTree.length > 0) {
		for (const cat of categoryTree) {
			if (!cat.parent) parents.push({ title: cat.title, slug: cat.slug });
			if (cat.children?.length) {
				for (const child of cat.children) {
					children.push({ title: child.title, slug: child.slug });
				}
			}
		}
	}

	// Slugs to exclude
	const excludedSlugs = ['more'];

	// Filter out unwanted slugs and ensure Closing Soon is included
	$: baseParents = parents.filter((p) => !excludedSlugs.includes(p.slug));
	$: filteredParents = (() => {
		if (baseParents.length === 0) return baseParents;
		if (baseParents.some((p) => p.slug === 'closing-soon')) return baseParents;
		const list = [...baseParents];
		const jobIdx = list.findIndex((p) => p.slug === 'latest-job');
		const closingSoonCat = { title: 'Closing Soon', slug: 'closing-soon' };
		if (jobIdx !== -1) {
			list.splice(jobIdx + 1, 0, closingSoonCat);
		} else {
			list.push(closingSoonCat);
		}
		return list;
	})();
</script>

<aside class={className} translate="no">
	<!-- {#if closingSoonJobs !== undefined}
		<ClosingSoonWidget jobs={closingSoonJobs} className="hidden lg:block" />
	{/if} -->
	<!-- Ads Section Banner -->
	<Card.Root class="bg-slate-300 p-0!" variant={'default'}>
		<Card.Content class="flex items-center justify-center text-center p-0! overflow-hidden">
			<div class="overflow-hidden rounded-xl w-full">
				<DynamicAd adSlug="sidebar-ad" />
			</div>
		</Card.Content>
	</Card.Root>
	<Widget title="Helping Tools" menus={userMenus} headerColor="bg-slate-900" />
	
	<!-- Special Promotion Area -->
	<Card.Root class="bg-slate-300 p-0!" variant={'default'}>
		<Card.Content class="flex items-center justify-center text-center p-0! overflow-hidden">
			<div class="overflow-hidden rounded-xl w-full">
				<DynamicAd adSlug="sidebar-video-ad" />
			</div>
		</Card.Content>
	</Card.Root>
	<Widget title="All Categories" menus={filteredParents} headerColor="bg-slate-900" />
</aside>
