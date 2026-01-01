<script context="module" lang="ts">
	// ✅ Types must go here
	export type FAQItem = {
		question: string;
		answer: string;
	};
</script>

<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	export let faqs: FAQItem[] = [
		{
			question: 'What is JobResultDekho.com?',
			answer:
				'JobResultDekho.com is a trusted platform where students and job seekers can find the latest government job updates, exam results, admit cards, syllabus, and answer keys—all in one place.'
		},
		{
			question: 'Is JobResultDekho.com an official government website?',
			answer:
				'No, this is not an official government website. It simply provides accurate updates collected from verified and official government sources to help users stay informed.'
		},
		{
			question: 'How often is the website updated?',
			answer:
				'The website is updated multiple times a day so that users never miss important notifications, exam dates, or result announcements.'
		},
		{
			question: 'Can I find all government job notifications here?',
			answer:
				'Yes, all major government job updates—including SSC, Railway, Banking, Police, Defence, UPSC,and State-Level jobs—are available regularly on the site.'
		},
		{
			question: 'Do I need an account to use the website?',
			answer:
				'No account is required. All job updates and exam information can be accessed instantly without signing up.'
		},
		{
			question: 'Is the information on JobResultDekho.com reliable?',
			answer:
				'Yes, information is taken from official government portals. Still, users are encouraged to confirm details on the official recruitment website.'
		},
		{
			question: 'How do I download my admit card?',
			answer:
				'Go to the Admit Card section, find your exam name, and click the official download link provided for easy access.'
		},
		{
			question: 'Does the website provide exam results?',
			answer:
				'Yes, the site provides quick result updates along with direct links to official result pages for easy checking.'
		},
		{
			question: 'Can I find previous year papers?',
			answer:
				'Yes, for many exams previous year papers and downloadable PDFs are added whenever available.'
		},
		{
			question: 'Does the website offer syllabus and exam pattern?',
			answer:
				'Yes, detailed exam syllabus and pattern are shared to help candidates prepare better and save research time.'
		},
		{
			question: 'How do I apply for a job through JobResultDekho.com?',
			answer:
				'Each job post includes the official apply link. Users are redirected to the government portal to submit their applications.'
		},
		{
			question: 'Is the website free to use?',
			answer: 'Yes, JobResultDekho.com is completely free. No hidden charges or subscription fees.'
		},
		{
			question: 'Can I get job updates regularly?',
			answer:
				'Yes, you can visit the homepage anytime to see freshly updated job notifications posted throughout the day.'
		},
		{
			question: 'Does the site provide answer keys?',
			answer:
				'Yes, both official and provisional answer keys are shared as soon as they are released by the exam authorities.'
		},
		{
			question: 'Can I see state-wise job updates?',
			answer:
				'Yes, state-wise job information is available depending on new notifications issued by different state governments.'
		},
		{
			question: 'What if a link isn’t opening?',
			answer:
				'If a link is temporarily down, try again after a few minutes or visit the official recruitment website directly.'
		},
		{
			question: 'Can I contact the website team?',
			answer:
				'Yes, you can use the contact form on the website to send your queries or report any issues.'
		},
		{
			question: 'Do you post private job updates?',
			answer:
				'The website mainly focuses on government jobs but occasionally highlights important private job opportunities.'
		},
		{
			question: 'Is the website mobile-friendly?',
			answer:
				'Yes, the site is designed to be smooth and easy to use on all mobile devices for quick checking on the go.'
		},
		{
			question: 'How can I stay updated with new notifications?',
			answer:
				'Bookmark the homepage or check the website daily to stay updated with fresh job alerts and examnotices.'
		}
	];

	let openIndex: number | null = null;

	const toggleFAQ = (index: number) => {
		openIndex = openIndex === index ? null : index;
	};
</script>

<section class="py-10">
	<div class="max-w-screen-md mx-auto px-3">
		<div class="space-y-3 mb-3">
			<h2 class="text-4xl font-bold text-center">Frequently Asked Questions</h2>
			<p class="text-slate-500 text-center">
				Helping tenants, managers, and owners understand features and resolve issues faster. It’s
				designed to save time and reduce support requests.
			</p>
		</div>
		<Accordion.Root type="single" class="space-y-2">
			{#each faqs as faq, index}
				<Accordion.Item value={`item-${index}`} class="bg-white p-5 shadow-sm rounded-md">
					<Accordion.Trigger
						class="py-0 text-xl font-semibold  hover:no-underline cursor-pointer items-center {openIndex ===
						index
							? 'text-sky-600'
							: 'hover:text-sky-600 text-slate-700'}"
						onclick={() => toggleFAQ(index)}><span>{faq.question}</span></Accordion.Trigger
					>
					{#if openIndex === index}
						<Accordion.Content class="py-4">
							<p class="text-slate-500 text-left text-lg">{faq.answer}</p>
						</Accordion.Content>
					{/if}
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</div>
</section>
