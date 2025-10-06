<script lang="ts">
	export let latestAdmissions;
	export let latestAdmitCards;
	export let latestAnswerKeys;
	export let latestJobs;
	export let latestResults;
	export let latestSyllabus;
	
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import { PanelRightDashed, Image, FileText,	Calculator,	Signature } from 'lucide-svelte';
	import { CalendarRange, NotepadTextDashed, TypeOutline } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import Icon from './ui/Icon.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { onMount } from 'svelte';
	import Widget from './Widget.svelte';
	
	// Sticky nav state
  	let isFixed = false;
  	let navEl: HTMLElement | null = null;
 	let active: string | null = null;
  	onMount(() => {
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

	// Smooth scroll to section
	function scrollToSection(id: string) {
		const el = document.getElementById(id.replace("#", ""));
		if (el) {
		const y = el.getBoundingClientRect().top + window.scrollY - (navEl?.offsetHeight || 0);
		window.scrollTo({ top: y, behavior: "smooth" });
		}
		active = id; // mark clicked as active
	}

	const options = [
		{ label: 'Latest Jobs', href: '#latestJobs' },
		{ label: 'Results', href: '#results' },
		{ label: 'Admit Cards', href: '#admitCards' },
		{ label: 'Answer Keys', href: '#answerKey' },
		{ label: 'Syllabus', href: '#syllabus' },
		{ label: 'Admissions', href: '#admission' }
	];
	const sidebarMenu = [
		{ label: 'Latest Jobs', href: '/latest-jobs' },
		{ label: 'Results', href: '/result' },
		{ label: 'Admit Cards', href: '/admit-cards' },
		{ label: 'Answer Keys', href: '/answer=key' },
		{ label: 'Syllabus', href: '/syllabus' },
		{ label: 'Admissions', href: '/admission' }
	];

	const jobHeader = [{
		id: 'No.',
		department: 'Department',
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
    { label: "Image Resizer", href: "#", icon: Image },
    { label: "JPG to PDF Converter", href: "#", icon: FileText },
    { label: "Age Calculator", href: "#", icon: Calculator },
    { label: "Photo Signature Joiner", href: "#", icon: Signature },
    { label: "Name & Date on Photo Maker", href: "#", icon: CalendarRange },
    { label: "MPPEB Template", href: "#", icon: NotepadTextDashed },
    { label: "Typing Test", href: "#", icon: TypeOutline },
  ];
 
</script>

<div class="max-w-screen-xl mx-auto px-3 space-y-5">
	<div class="hidden md:block {isFixed ? "fixed inset-x-0 top-0 py-2 bg-white shadow-md" : "static"}" bind:this={navEl}>
		<div class="flex gap-2 flex-wrap {isFixed ? "max-w-screen-xl mx-auto px-3" : ""}"  >
			<!-- Tab Buttons -->
			{#each options as option}
				<Button onclick={() => scrollToSection(option.href)} 
					variant="light"			
					class="flex-1 !px-2 md:!px-4 min-w-24 sm:min-w-32 rounded-full {active == option.href ? '!bg-emerald-500 text-white' : ''}"
					>{option.label}</Button
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
				articleId="latestJobs"
				headerColor="bg-sky-500"
				headers={jobHeader}
				title="Latest Jobs"
				items={latestJobs}
				viewText="See More"
				cat={'/latest-job'}
				buttonLabel="Apply"
			/>
			<ArticleCard
				articleWrap={isFixed ? "md:pt-5" : "pt-0"}
				open={false}
				articleId="results"
				headerColor="bg-emerald-500"
				headers={resultHeader}
				title="Results"
				items={latestResults}
				viewText="See More"
				cat={'/result'}
				buttonLabel="View"
			/>
			<ArticleCard
				articleWrap={isFixed ? "md:pt-5" : "pt-0"}
				open={false}
				articleId="admitCards"
				headerColor="bg-indigo-500"
				headers={admitCardHeader}
				title="Admit Cards"
				items={latestAdmitCards}
				viewText="See More"
				cat={'/admit-card'}
				buttonLabel="Download"
			/>
			<Card.Root class="" variant={'default'}>
				<Card.Content class="flex-1 flex items-stretch text-center">Ad Place here</Card.Content>
			</Card.Root>
			<ArticleCard
				articleWrap={isFixed ? "md:pt-5" : "pt-0"}
				open={false}
				articleId="answerKey"
				headerColor="bg-pink-500"
				headers={answerKeyHeader}
				title="Answer Key"
				items={latestAnswerKeys}
				viewText="See More"
				cat={'/answer-key'}
				buttonLabel="Check"
			/>
			<ArticleCard
				articleWrap={isFixed ? "md:pt-5" : "pt-0"}
				open={false}
				articleId="syllabus"
				headerColor="bg-teal-500"
				headers={syllabusHeader}
				title="Syllabus"
				items={latestSyllabus}
				viewText="See More"
				cat={'/syllabus'}
				buttonLabel="Check"
			/>
			<ArticleCard
				articleWrap={isFixed ? "md:pt-5" : "pt-0"}
				open={false}
				articleId="admission"
				headerColor="bg-red-800"
				headers={admissionHeader}
				title="Admissions"
				items={latestAdmissions}
				viewText="See More"
				cat={'/admissions'}
				buttonLabel="Check"
			/>
		</div>
		<aside class="lg:col-span-4 space-y-4">
			<Widget title="Helping Tools" menus={userMenus} headerColor="bg-slate-900" />
			<Card.Root class="bg-slate-300" variant={'default'}>
				<Card.Content class="flex items-center justify-center text-center h-60 ">Ad Place here</Card.Content>
			</Card.Root>
			<Widget title="All Categories" menus={sidebarMenu} headerColor="bg-slate-900" />
		</aside>
	</section>
</div>
