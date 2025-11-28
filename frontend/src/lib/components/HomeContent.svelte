<script lang="ts">
	export let latestAdmissions;
	export let latestAdmitCards;
	export let latestAnswerKeys;
	export let latestJobs;
	export let latestResults;
	export let latestSyllabus;
	export let categoryTree;
 
	import ArticleCard from '$lib/components/ArticleCardHome.svelte';
	import { PanelRightDashed } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import Icon from './ui/Icon.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { onMount, onDestroy } from 'svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { SITE_URL } from '$lib/utils';

	// Parent categories
	const parents: { title: string; slug: string }[] = [];
	const children = [];
	for (const cat of categoryTree) {
		if (!cat.parent) parents.push({ title: cat.title, slug: cat.slug });
		if (cat.children?.length) for (const child of cat.children) children.push({ title: child.title, slug: child.slug });
	}

	const excludedSlugs = ['home', 'more'];
	$: filteredParents = parents.filter((p) => !excludedSlugs.includes(p.slug));

	// Sticky nav + state
	let isFixed = false;
	let open: boolean = true;
	let navEl: HTMLElement | null = null;

	// Default active
	let active: string | null = 'latest-job';

	// Colors (CSS variables you already use)
	const headingColor = [
		'--color-sky-900',
		'--color-emerald-900',
		'--color-amber-900',
		'--color-indigo-900',
		'--color-rose-900',
		'--color-yellow-900'
	];

	// Headers
	const commanHeader = [{ id: 'No.', department: 'Dept', label: 'Title', date: 'Last Date', action: 'Action' }];
	const resultHeader = [{ id: 'No.', department: 'Dept', label: 'Title', date: 'Result Date', action: 'Action' }];
	const answerKeyHeader = [{ id: 'No.', department: 'Dept', label: 'Title', date: 'Release Date', action: 'Action' }];
	const syllabusHeader = [{ id: 'No.', department: 'Dept', label: 'Title', date: 'Exam Date', action: 'Action' }];

	// Sections
	const articleSections = [
		{ id: 'latest-job', type: 'jobs', title: 'Latest Jobs', items: latestJobs, viewText: 'View All', catLabel: 'latest-job', headers: commanHeader },
		{ id: 'admit-card', type: 'admit-cards', title: 'Admit Cards', items: latestAdmitCards, viewText: 'View All', catLabel: 'admit-card', headers: commanHeader },
		{ id: 'result', type: 'results', title: 'Results', items: latestResults, viewText: 'View All', catLabel: 'result', headers: resultHeader },
		{ id: 'answer-key', type: 'answer-keys', title: 'Answer Key', items: latestAnswerKeys, viewText: 'View All', catLabel: 'answer-key', headers: answerKeyHeader },
		{ id: 'admission', type: 'admissions', title: 'Admissions', items: latestAdmissions, viewText: 'View All', catLabel: 'admissions', headers: commanHeader },
		{ id: 'syllabus', type: 'syllabus', title: 'Syllabus', items: latestSyllabus, viewText: 'View All', catLabel: 'syllabus', headers: syllabusHeader }
	].map((sec, index) => ({ ...sec, headerColor: headingColor[index] }));

	/* -------------------------
	   Scroll spy (precise)
	   - activates when section's top <= navHeight (touching nav)
	   - picks the first section that matches (top <= navHeight)
	   - if none match, chooses the next visible section by smallest positive distance
	--------------------------*/

	let rafId: number | null = null;

	function updateActiveOnScroll() {
		// cancel pending raf
		if (rafId) cancelAnimationFrame(rafId);

		rafId = requestAnimationFrame(() => {
			if (!navEl) return;
			const navHeight = navEl.offsetHeight || 0;

			let chosenId: string | null = null;
			let closestDistance = Infinity; // for fallback: smallest positive distance from top

			for (const sec of articleSections) {
				const el = document.getElementById(sec.id);
				if (!el) continue;

				const rect = el.getBoundingClientRect();
				const top = rect.top - navHeight; // 0 means the element's top is exactly below nav
				const bottom = rect.bottom - navHeight;

				// If section top is at or above nav and bottom below nav -> it's the active one
				if (top <= 0 && bottom > 0) {
					chosenId = sec.id;
					break; // exact hit — use it
				}

				// Otherwise keep track of nearest upcoming section (top > 0 but closest)
				if (top > 0 && top < closestDistance) {
					closestDistance = top;
					chosenId = sec.id;
				}
			}

			// If we found a candidate, only set active if different to avoid reassigning
			if (chosenId && chosenId !== active) {
				active = chosenId;
			}
		});
	}

	// Smooth scroll to section
	function scrollToSection(id: string) {
		const el = document.getElementById(id);
		if (!el) return;
		const y = el.getBoundingClientRect().top + window.scrollY - (navEl?.offsetHeight || 0);
		window.scrollTo({ top: y, behavior: 'smooth' });
	}

	function handleClick(id: string) {
		// set active immediately for instant UI feedback
		active = id;
		scrollToSection(id);
	}

	function handleWindowScroll() {
		// update sticky
		if (!navEl) return;
		const offsetTop = navEl.offsetTop;
		isFixed = window.scrollY >= offsetTop;
		// update active candidate
		updateActiveOnScroll();
	}

	onMount(() => {
		// set initial active (in case page loaded scrolled)
		updateActiveOnScroll();

		window.addEventListener('scroll', handleWindowScroll, { passive: true });
		window.addEventListener('resize', updateActiveOnScroll);

		// also call once after small delay (ensure content/layout ready)
		const t = setTimeout(() => updateActiveOnScroll(), 200);

		return () => {
			window.removeEventListener('scroll', handleWindowScroll);
			window.removeEventListener('resize', updateActiveOnScroll);
			clearTimeout(t);
			if (rafId) cancelAnimationFrame(rafId);
		};
	});
</script>

<!-- PAGE LAYOUT -->
<div class="max-w-screen-xl mx-auto px-3 space-y-5">

	<!-- Sticky Tabs -->
	<div class="hidden md:block {isFixed ? 'h-16' : 'h-auto'}" bind:this={navEl}>
		<div class="{isFixed ? 'fixed inset-x-0 top-0 z-20 ' : ''}">
			<div class="{isFixed ? 'max-w-screen-xl mx-auto px-3' : ''}">
				<div class="flex gap-2 flex-wrap p-3  bg-white shadow-sm {isFixed ? 'rounded-b-md' : 'rounded-md'}">
				{#each articleSections as parent}
					<Button
						onclick={() => handleClick(parent.id)}
						style="--btnColor:var({active === parent.id ? parent.headerColor : '--color-neutral-300'}); --btnHover:var({parent.headerColor})"
						variant="light"
						class="flex-1 !px-2 md:!px-4 rounded-md 
							hover:bg-(color:--btnHover)! 
							{active === parent.id 
								? 'text-white bg-(color:--btnColor)' 
								: 'text-neutral-600'}"
					>
						{parent.title}
					</Button>
				{/each}

				<Button variant="bordered" class="lg:!hidden">
					<Icon name={PanelRightDashed} size={20} />
				</Button>
			</div>
		</div>
		</div>
	</div>

	<!-- Content + Sidebar -->
	<section class="lg:grid lg:grid-cols-12 flex flex-col gap-6">
		<div class="lg:col-span-8 xl:col-span-9 space-y-5">
			{#each articleSections as sec, i}
				<ArticleCard
					articleWrap=""
					{open}
					articleId={sec.id}
					type={sec.type}
					headerColor={sec.headerColor}
					headers={sec.headers}
					title={sec.title}
					items={sec.items}
					viewText={sec.viewText}
					catLabel={sec.catLabel}
				/>

				{#if i === 2}
					<Card.Root variant="default" class="py-0! rounded-md! sm:rounded-xl!">
						<Card.Content class="flex items-center justify-center text-center p-1!  ">
							<a href="{SITE_URL}/contact" class="block rounded-md! sm:rounded-xl! overflow-hidden">
								<img src="/image/JobResultDekho-Banner-horizontal.png" alt="Job Result Dekho" class="object-cover sm:block hidden" />
								<img src="/image/JobResultDekho-Banner-mobile.png" alt="Job Result Dekho" class="object-cover block sm:hidden" />
							</a>
						</Card.Content>
					</Card.Root>
				{/if}
			{/each}
		</div>

		<Sidebar />
	</section>
</div>
