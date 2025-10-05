<script lang="ts">
	export let latestJobs;
	
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import {
		PanelRightDashed,
		Image,
		FileText,
		Calculator,
		Signature,
		CalendarRange,
		NotepadTextDashed,
		TypeOutline
	} from 'lucide-svelte';
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

	const jobsHeaders = [
		{
			id: 'No.',
			department: 'Department',
			label: 'Title',
			date: 'Last Date',
			timeLeft: 'Time Left',
			action: 'Action'
		}
	];
	/*const latestJobss = [
		{
			id: 1,
			department: 'SSC',
			label: 'SSC CPO SI Online Form 2025 – Start',
			date: '15/10/2025',
			timeLeft: '15 days',
			href: '/post/one',
			target: '_blank'
		},
		{
			id: 2,
			department: 'BPSC',
			label: 'BPSC AEDO Online Form 2025 – Last Date Today',
			date: '15/10/2025',
			timeLeft: '15 days',
			href: '/post/one',
			target: '_blank'
		}
	];*/

	const resultsHeaders = [
		{
			id: 'No.',
			department: 'Dept',
			label: 'Title',
			date: 'Result Date',
			action: 'Action'
		}
	];

	const results = [
		{
			id: 1,
			department: 'Bihar Police',
			label: 'Bihar Police CSBC Constable Result 2025 – Out',
			date: '15/10/2025',
			href: '/post/one',
			target: '_blank'
		},
		{
			id: 2,
			department: 'IBPS',
			label: 'IBPS PO MT XV 15 Pre Result 2025 – Out',
			date: '15/10/2025',
			href: '/post/one',
			target: '_blank'
		},
		{
			id: 3,
			department: 'MP ESB',
			label: 'MP ESB Middle and Primary Teacher Result 2025 – Out',
			date: '15/10/2025',
			href: '/post/one',
			target: '_blank'
		}
	];	

	const admitCardHeaders = [
		{
			id: 'No.',
			department: 'Dept',
			label: 'Title',
			date: 'Exam Date',
			timeLeft: 'Time Left',
			action: 'Action'
		}
	];

	const admitCards = [
		{
			id: 1,
			department: 'IB',
			label: 'IB Security Assistant/ Executive Admit Card 2025 – Out',
			date: '15/10/2025',
			timeLeft: '15 days',
			href: '/post/one',
			target: '_blank'
		},
		{
			id: 2,
			department: 'LIC',
			label: 'LIC AAO / AE Pre Admit Card 2025 – Out',
			date: '15/10/2025',
			timeLeft: '15 days',
			href: '/post/one',
			target: '_blank'
		},
		{
			id: 3,
			department: 'RPSC',
			label: 'RPSC Assistant Engineer Pre Admit Card 2025 – Out',
			date: '15/10/2025',
			timeLeft: '15 days',
			href: '/post/one',
			target: '_blank'
		}
	];

	const answerKeyHeaders = [
		{
			id: 'No.',
			department: 'Dept',
			label: 'Title',
			date: 'Release Date',
			action: 'Action'
		}
	];

	const answerKey = [
		{
			id: 1,
			department: 'MPESB',
			label: 'MPESB Excise Constable Answer Key 2025 – Out',
			date: '15/10/2025',
			href: '/post/one',
			target: '_blank'
		},
		{
			id: 2,
			department: 'BPSC',
			label: 'Bihar BPSC Assistant Engineer AE Final Answer Key 2025 – Out',
			date: '15/10/2025',
			href: '/post/one',
			target: '_blank'
		},
		{
			id: 3,
			department: 'RPSC',
			label: 'RPSC Assistant Professor Answer Key 2025 – Out',
			date: '15/10/2025',
			href: '/post/one',
			target: '_blank'
		}
	];

	const syllabusHeaders = [
		{
			id: 'No.',
			department: 'Dept',
			label: 'Title',
			date: 'Exam Date',
			action: 'Action'
		}
	];

	const syllabus = [
		{
			id: 1,
			department: 'SSC',
			label: 'SSC Delhi Police Constable Syllabus & Exam Pattern 2025',
			date: 'Not declare',
			href: '/post/one',
			target: '_blank'
		},
		{
			id: 2,
			department: 'Raj. Govt.',
			label: 'Rajasthan Scholarship & Scooty Yojana 2025-26 – Start',
			date: 'Not declare',
			href: '/post/one',
			target: '_blank'
		},
		{
			id: 3,
			department: 'UP Police',
			label: 'UP Police Recruitment Calendar 2025-26',
			date: 'Not declare',
			href: '/post/one',
			target: '_blank'
		}
	];

	const admissionHeaders = [
		{
			id: 'No.',
			department: 'Dept',
			label: 'Title',
			date: 'Last Date',
			timeLeft: 'Time Left',
			action: 'Action'
		}
	];

	const admission = [
		{
			id: 1,
			department: 'NVS',
			label: 'NVS Class 9 Admission Online Form 2026 – Date Extended',
			date: '15/10/2025',
			timeLeft: '15 Days',
			href: '/post/one',
			target: '_blank'
		},
		{
			id: 2,
			department: 'JET',
			label: 'Jharkhand Eligibility Test JET Online Form 2025 – Start',
			date: '15/10/2025',
			timeLeft: '15 Days',
			href: '/post/one',
			target: '_blank'
		},
		{
			id: 3,
			department: 'BCECE',
			label: 'BCECE Mop-Up Revised Counselling Schedule 2025',
			date: '15/10/2025',
			timeLeft: '15 Days',
			href: '/post/one',
			target: '_blank'
		}
	];

	let userMenus = [
    { label: "Image Resizer", href: "/image-resizer", icon: Image },
    { label: "JPG to PDF Converter", href: "/jpg-to-pdf-Converter", icon: FileText },
    { label: "Age Calculator", href: "/age-calculator", icon: Calculator },
    { label: "Photo Signature Joiner", href: "/photo-signature-joiner", icon: Signature },
    { label: "Name & Date on Photo Maker", href: "/name-date-on-photo-maker", icon: CalendarRange },
    { label: "MPPEB Template", href: "/mppeb-template", icon: NotepadTextDashed },
    { label: "Typing Test", href: "/typing-test", icon: TypeOutline },
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
				headers={jobsHeaders}
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
				headers={resultsHeaders}
				title="Results"
				items={results}
				viewText="See More"
				cat={'/result'}
				buttonLabel="View"
			/>
			<ArticleCard
				articleWrap={isFixed ? "md:pt-5" : "pt-0"}
				open={false}
				articleId="admitCards"
				headerColor="bg-indigo-500"
				headers={admitCardHeaders}
				title="Admit Cards"
				items={admitCards}
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
				headers={answerKeyHeaders}
				title="Answer Key"
				items={answerKey}
				viewText="See More"
				cat={'/answer-key'}
				buttonLabel="Check"
			/>
			<ArticleCard
				articleWrap={isFixed ? "md:pt-5" : "pt-0"}
				open={false}
				articleId="syllabus"
				headerColor="bg-teal-500"
				headers={syllabusHeaders}
				title="Syllabus"
				items={syllabus}
				viewText="See More"
				cat={'/syllabus'}
				buttonLabel="Check"
			/>
			<ArticleCard
				articleWrap={isFixed ? "md:pt-5" : "pt-0"}
				open={false}
				articleId="admission"
				headerColor="bg-red-800"
				headers={admissionHeaders}
				title="Admissions"
				items={admission}
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
