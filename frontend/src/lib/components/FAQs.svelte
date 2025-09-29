<script lang="ts">
	export type FAQItem = {
		question: string;
		answer: string;
	};

	export let faqs: FAQItem[] = [
		{
			question: 'What is JobResultWale?',
			answer:
				'JobResultWale is a trusted platform that provides the latest updates on government jobs, results, admit cards, and exam notifications.'
		},
		{
			question: 'Is the information updated regularly?',
			answer:
				'Yes, we ensure timely and accurate updates so that aspirants never miss an important notification.'
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

<section class="relative">
	<div class="max-w-screen-xl mx-auto px-3">
		<h2 class="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
		<div class="space-y-4">
			{#each faqs as faq, index}
				<div class="border rounded-2xl shadow-sm">
					<button
						class="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 hover:bg-gray-50 rounded-2xl transition"
						on:click={() => toggleFAQ(index)}
					>
						<span>{faq.question}</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 transition-transform duration-200"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							class:rotate-180={openIndex === index}
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>

					{#if openIndex === index}
						<div class="px-4 pb-4 text-gray-600">
							{faq.answer}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
