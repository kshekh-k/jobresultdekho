<script context="module" lang="ts">
	// ✅ Types must go here
	export type FAQItem = {
		question: string;
		answer: string;
	};
</script>

<script lang="ts">
 
import * as Accordion from "$lib/components/ui/accordion/index.js";
	export let faqs: FAQItem[] = [
		{
			question: 'What is JobResultWale?',
			answer:	'JobResultWale is a trusted platform that provides the latest updates on government jobs, results, admit cards, and exam notifications.'
		},
		{
			question: 'Is the information updated regularly?',
			answer:	'Yes, we ensure timely and accurate updates so that aspirants never miss an important notification.'
		},
		{
			question: 'Do I need to register to access updates?',
			answer: 'No, all information on JobResultWale is freely accessible without registration.'
		}
	];

	let openIndex: number | null = null;

	const toggleFAQ = (index: number) => {
		openIndex = openIndex === index ? null : index;
	};
</script>

<section class="py-10">
	<div class="max-w-screen-md mx-auto px-3 ">
        <div class="space-y-3 mb-3">
		<h2 class="text-4xl font-bold text-center">Frequently Asked Questions</h2>
        <p class="text-slate-500 text-center">Helping tenants, managers, and owners understand features and resolve issues faster. It’s designed to save time and reduce support requests.</p>
		</div>
       <Accordion.Root type="single" class="space-y-2">
			{#each faqs as faq, index}
				<Accordion.Item value={`item-${index}`} class="bg-white p-5 shadow-sm rounded-md">				 
                    <Accordion.Trigger class="py-0 text-xl font-semibold  hover:no-underline cursor-pointer items-center {openIndex === index ? 'text-sky-600':'hover:text-sky-600 text-slate-700'}" onclick={() => toggleFAQ(index)}><span>{faq.question}</span></Accordion.Trigger>
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
