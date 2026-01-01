<script lang="ts">
	import { getContext } from 'svelte';
	export let className: string = 'lg:col-span-4 xl:col-span-3 space-y-4';
	import { Image, FileText, Calculator, Signature, Megaphone } from 'lucide-svelte';
	import { CalendarRange, NotepadTextDashed, TypeOutline } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Widget from './Widget.svelte';
	import { SITE_URL } from '$lib/utils';

	let userMenus = [
		{ title: 'Name & DOB on photo', slug: `${SITE_URL}/photo-editor`, icon: CalendarRange },
		{ title: 'Image to PDF Converter', slug: `${SITE_URL}/image-to-pdf`, icon: FileText },
		{ title: 'Age Calculator', slug: `${SITE_URL}/age-calculator`, icon: Calculator },
		{ title: "All Blogs", slug: `${SITE_URL}/blog`, icon: Megaphone  },
		// { title: "Photo Signature", slug:  `${SITE_URL}/`, icon: Signature },
		{
			title: 'Case Converter',
			slug: 'https://techmind.click',
			icon: NotepadTextDashed,
			target: '_blank'
		},
		// { title: 'Typing Test', slug: `${SITE_URL}/#`, icon: TypeOutline }
	];

	// Parent & children category
	const categoryTree = getContext('categoryTree') || [];
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

	// Filter out unwanted slugs
	$: filteredParents = parents.filter((p) => !excludedSlugs.includes(p.slug));
</script>

<aside class={className}>
	<Card.Root class="bg-slate-300 p-0!" variant={'default'}>
		<Card.Content class="flex items-center justify-center text-center p-0! overflow-hidden">
			<div class="overflow-hidden rounded-xl">
				<a
					href="{SITE_URL}/contact" title="Job Result Dekho"
					class="rounded-md! sm:rounded-xl! overflow-hidden block "
				>
					<img
						src="/image/JobResultdekho-square.png"
						alt="Job Result Dekho" title="Job Result Dekho"
						class="object-cover"
					/></a
				>				 
			</div>
		</Card.Content>
	</Card.Root>
	<Widget title="Helping Tools" menus={userMenus} headerColor="bg-slate-900" />
	<!-- <Card.Root class="bg-slate-300 p-0!" variant={'default'}>
		<Card.Content class="flex items-center justify-center text-center p-0! overflow-hidden">
			<div class="overflow-hidden rounded-xl">
				<video controls class="w-full h-auto">
					<source src="/image/sir-video.webm" type="video/webm" />
					<source src="/image/sir-video.mp4" type="video/mp4" />
					<track kind="captions" src="/image/sir-video.vtt" srclang="en" label="English" default />
					Your browser does not support HTML5 video.
				</video>
			</div>
		</Card.Content>
	</Card.Root> -->
	<Widget title="All Categories" menus={filteredParents} headerColor="bg-slate-900" />
</aside>
