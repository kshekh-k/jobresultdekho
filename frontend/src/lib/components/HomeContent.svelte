<script lang="ts">
	export let latestAdmissions;
	export let latestAdmitCards;
	export let latestAnswerKeys;
	export let latestJobs;
	export let latestResults;
	export let latestSyllabus;
	export let categoryTree;

	import ArticleCard from '$lib/components/ArticleCardHome.svelte';
	import { PanelRightDashed, Image, FileText,	Calculator,	Signature } from 'lucide-svelte';
	import { CalendarRange, NotepadTextDashed, TypeOutline } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import Icon from './ui/Icon.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { onMount } from 'svelte';
	import Widget from './Widget.svelte';

	// Parent & children category
	const parents: { title: any; slug: any; }[] = [];
	const children = [];
	for (const cat of categoryTree) {
		if (!cat.parent) parents.push({ title: cat.title, slug: cat.slug });
		if (cat.children?.length) {
			for (const child of cat.children) {
				children.push({ title: child.title, slug: child.slug });
			}
		}
	}

	// Slugs to exclude
  	const excludedSlugs = ["home", "more"];

	// Filter out unwanted slugs
	$: filteredParents = parents.filter(
		(p) => !excludedSlugs.includes(p.slug)
	);	

	// Sticky nav state
  	let isFixed = false;
	let open: string | null =null;
	let articleId = '';
  	let navEl: HTMLElement | null = null;
 	let active: string | null = null;

  	onMount(() => {
		open = null;
        if (!navEl) return;
    	const offsetTop = navEl.offsetTop;

    	const handleScroll = () => {
      		if (window.scrollY >= offsetTop) {
				isFixed = true;
			} else {
				isFixed = false;
			}
    	};

    	window.addEventListener("scroll", handleScroll);
    	return () => window.removeEventListener("scroll", handleScroll);
  	});
	
	// Smooth scroll to section and open it
	function handleClick(id: string) {
		// const articleId = document.getElementById(id.replace("#", ""));
		const section = id.replace('#',"");
		open = section;
		scrollToSection(id);
		active = id;
		// alert(open)
	}
	
	// Smooth scroll to section
	function scrollToSection(id: string) {
		const el = document.getElementById(id.replace("#", ""));
		if (el) {
		const y = el.getBoundingClientRect().top + window.scrollY - (navEl?.offsetHeight || 0);
		window.scrollTo({ top: y, behavior: "smooth" });
		}
		active = id; // mark clicked as active
	}	

	const jobHeader = [{
		id: 'No.',
		department: 'Dept',
		label: 'Title',
		date: 'Last Date',
		timeLeft: 'Time Left',
		action: 'Action'
	}];
	
	const resultHeader = [{
		id: 'No.',
		department: 'Dept',
		label: 'Title',
		date: 'Result Date',
		action: 'Action'
	}];	

	const admitCardHeader = [{
		id: 'No.',
		department: 'Dept',
		label: 'Title',
		date: 'Exam Date',
		timeLeft: 'Time Left',
		action: 'Action'
	}];
	
	const answerKeyHeader = [{
		id: 'No.',
		department: 'Dept',
		label: 'Title',
		date: 'Release Date',
		action: 'Action'
	}];	

	const syllabusHeader = [{
		id: 'No.',
		department: 'Dept',
		label: 'Title',
		date: 'Exam Date',
		action: 'Action'
	}];
	
	const admissionHeader = [{
		id: 'No.',
		department: 'Dept',
		label: 'Title',
		date: 'Last Date',
		timeLeft: 'Time Left',
		action: 'Action'
	}];	

	let userMenus = [
    { title: "Image Resizer", slug: "#", icon: Image },
    { title: "JPG to PDF Converter", slug: "#", icon: FileText },
    { title: "Age Calculator", slug: "age-calculator", icon: Calculator },
    { title: "Photo Signature Joiner", slug: "#", icon: Signature },
    { title: "Name & Date on Photo Maker", slug: "/photo-editor", icon: CalendarRange },
    { title: "MPPEB Template", slug: "#", icon: NotepadTextDashed },
    { title: "Typing Test", slug: "#", icon: TypeOutline },
  ];  
  
</script>

<div class="max-w-screen-xl mx-auto px-3 space-y-5">
	<div class="hidden md:block {isFixed ? "fixed inset-x-0 top-0 py-2 bg-white shadow-md" : "static"}" bind:this={navEl}>
		<div class="flex gap-2 flex-wrap {isFixed ? "max-w-screen-xl mx-auto px-3" : ""}"  >
			<!-- Tab Buttons -->
			{#each filteredParents as parent}
				<Button onclick={() => handleClick(parent.slug)} 
					variant="light"			
					class="flex-1 !px-2 md:!px-4 min-w-24 sm:min-w-32 rounded-full {active == parent.slug ? '!bg-emerald-500 text-white' : ''}"
					>{parent.title}</Button
				>
			{/each}
			<Button variant="bordered" class="lg:!hidden">
				<Icon name={PanelRightDashed} className="" size={20} />
			</Button>
		</div>
	</div>
	<section class="lg:grid lg:grid-cols-12 flex flex-col gap-6">
		<div class="lg:col-span-8 space-y-4 ">
			<ArticleCard
				articleWrap={isFixed ? "md:pt-20" : "pt-0"}
				open={open==='latest-job'}
				articleId={'latest-job'}
				type='jobs'
				headerColor="bg-sky-500"
				headers={jobHeader}
				title="Latest Jobs"
				items={latestJobs}
				viewText="See More"
				catLabel={'latest-job'}
			/>
			<ArticleCard
				articleWrap={isFixed ? "md:pt-5" : "pt-0"}
				type='admit-card'
				open={open==='admit-card'}
				articleId="admit-card"
				headerColor="bg-indigo-500"
				headers={admitCardHeader}
				title="Admit Cards"
				items={latestAdmitCards}
				viewText="See More"
				catLabel={'admit-card'}			 
			/>
			<ArticleCard
				articleWrap={isFixed ? "md:pt-5" : "pt-0"}
				type='results'
				open={open==='result'}
				articleId={'result'}
				headerColor="bg-emerald-500"
				headers={resultHeader}
				title="Results"
				items={latestResults}
				viewText="See More"
				catLabel={'result'}
			/>			
			<Card.Root class="" variant={'default'}>
				<Card.Content class="flex-1 flex items-stretch text-center">Ad Place here</Card.Content>
			</Card.Root>
			<ArticleCard
				articleWrap={isFixed ? "md:pt-5" : "pt-0"}
				type='answer-key'
				open={open==='answer-key'}
				articleId="answer-key"
				headerColor="bg-pink-500"
				headers={answerKeyHeader}
				title="Answer Key"
				items={latestAnswerKeys}
				viewText="See More"
				catLabel={'answer-key'}
			/>
			<ArticleCard
				articleWrap={isFixed ? "md:pt-5" : "pt-0"}
				type='syllabus'
				open={open==='syllabus'}
				articleId="syllabus"
				headerColor="bg-teal-500"
				headers={syllabusHeader}
				title="Syllabus"
				items={latestSyllabus}
				viewText="See More"
				catLabel={'syllabus'}
			/>
			<ArticleCard
				articleWrap={isFixed ? "md:pt-5" : "pt-0"}
				type='admission'
				open={open==='admission'}
				articleId="admission"
				headerColor="bg-red-800"
				headers={admissionHeader}
				title="Admissions"
				items={latestAdmissions}
				viewText="See More"
				catLabel={'admissions'}
			/>
		</div>
		<aside class="lg:col-span-4 space-y-4">
			<Widget title="Helping Tools" menus={userMenus} headerColor="bg-slate-900" />
			<Card.Root class="bg-slate-300" variant={'default'}>
				<Card.Content class="flex items-center justify-center text-center h-60 ">Ad Place here</Card.Content>
			</Card.Root>
			<Widget title="All Categories" menus={filteredParents} headerColor="bg-slate-900" />
		</aside>
	</section>
</div>
