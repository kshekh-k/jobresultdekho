<script lang="ts">
	import InnerHero from '$lib/components/InnerHero.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<svelte:head>
	<title>About Us — JobResultDekho</title>
	<meta
		name="description"
		content="About Us JobResultDekho.com for support, queries, and feedback."
	/>
</svelte:head>
 <!-- Blue Banner -->	 
	<InnerHero heading="About Us" bgColor="bg-sky-800" textColor="text-white" className="px-4 md:px-4 mb-5"></InnerHero>
	<div class="max-w-6xl px-4 mx-auto">
		<Card.Root class="overflow-hidden p-0 rounded-md gap-0 py-5">
			<Card.Header class="py-2">
				 
				<p class="text-slate-600">
					We’d love to hear from you! Reach out via the form below or using the details provided.
				</p>
			</Card.Header>
			<Card.Content class="space-y-5 text-slate-700 leading-relaxed">
				<p class="text-slate-500"> Welcome to <strong>JobResultDekho.com</strong> — your trusted source for the latest
					updates on <span class="font-medium">government jobs, exam results, admit cards, study materials, and career guidance</span
					>.
				</p>

				<p class="text-slate-500">
					Our mission is simple: to provide <span class="font-semibold"
						>accurate, fast, and reliable information</span
					> for students and job seekers across India. Whether you’re preparing for competitive exams,
					looking for the latest job notifications, or downloading your admit card, we aim to make your
					journey smooth and stress-free.
				</p>

				<p class="text-slate-500">
					At JobResultDekho.com, we understand how important every update is when you’re preparing
					for a government job. That’s why we focus on
					<span class="font-semibold">timely updates, clear details, and easy access</span>
					to all the resources you need.
				</p>

				<p class="text-slate-500">We cover a wide range of topics including:</p>
				<ul class="list-disc pl-4 space-y-1 text-slate-500">
					<li>Government Job Notifications</li>
					<li>Exam Results</li>
					<li>Admit Cards</li>
					<li>Study Material & Preparation Tips</li>
				</ul>

				<p class="text-slate-500">
					Our platform is designed especially for <span class="font-medium"
						>students and aspirants preparing for government jobs</span
					>. We value your time and ensure that you always get the most relevant and latest updates
					without delay.
				</p>

				<p class="text-slate-500">
					Thank you for trusting JobResultDekho.com as your go-to resource. We are committed to
					helping you achieve your career goals with the right information at the right time.
				</p>

			</Card.Content>
		</Card.Root>
	</div>
 
