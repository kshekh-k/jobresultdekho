<!-- File: src/routes/contact/+page.svelte -->
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let firstName = '';
	let laststName = '';
	let email = '';
	let phone = '';
	let subject = '';
	let message = '';

	function handleSubmit(e: Event) {
		e.preventDefault();
		// Here you can integrate backend API, email service, or form submission logic
		console.log({ firstName, laststName, email, phone, subject, message });
		dispatch('submit', {firstName, laststName, email, phone, subject, message });
		alert('Thank you for contacting us! We will get back to you soon.');

		// Reset form
		firstName = '';
		laststName = '';
		email = '';
		phone = '';
		subject = '';
		message = '';
	}
</script>

<svelte:head>
	<title>Contact Us — JobResultDekho</title>
	<meta
		name="description"
		content="Contact JobResultDekho.com for support, queries, and feedback."
	/>
</svelte:head>

<div class="min-h-screen bg-slate-100 text-slate-800 py-5">
	<div class="max-w-screen-xl px-4 mx-auto">
		<header class="mb-5 bg-white p-5 rounded-xl shadow-md">
			<h1 class="text-3xl md:text-4xl font-bold mb-2 text-slate-900">Contact Us</h1>
			<p class="text-slate-600">
				We’d love to hear from you! Reach out via the form below or using the details provided.
			</p>
		</header>
		<div class="md:grid md:grid-cols-2 gap-5">
			<!-- Contact Details -->
			<div class="bg-white p-5 rounded-xl shadow-md space-y-4">
				<h2 class="text-xl font-medium">Get in Touch</h2>
				<p class="text-slate-700">
					<strong>Email:</strong>
					<a href="mailto:help@jobresultdekho.com" class="text-sky-600 underline"
						>help@jobresultdekho.com</a
					>
				</p>
				<p class="text-slate-700">
					<strong>Address:</strong><br />Plot No. 47, Narayanpuri,<br />Near Jai Hind School,
					Jhotwara,<br />Jaipur (Raj.) PIN 302012
				</p>
			</div>

			<!-- Contact Form -->
			<div class="bg-white p-5 rounded-xl shadow-md">
				<form on:submit|preventDefault={handleSubmit} class="space-y-4">
                    <div class="flex flex-col gap-4 lg:grid lg:grid-cols-2">
					<div class="space-y-2">
						<label for="first-name" class="block text-sm font-medium text-slate-700">First Name</label>
						<Input id="irst-name" type="text" bind:value={firstName} required class="bg-white" />
					</div>
                    <div class="space-y-2">
						<label for="last-name" class="block text-sm font-medium text-slate-700">Last Name</label>
						<Input id="last-name" type="text" bind:value={laststName} required class="bg-white" />
					</div>
                </div>
					<div class="flex flex-col gap-4 lg:grid lg:grid-cols-2">
						<div class="space-y-2">
							<label for="email" class="block text-sm font-medium text-slate-700">Email</label>
							<Input id="email" type="email" bind:value={email} required class="bg-white" />
						</div>

						<div class="space-y-2">
							<label for="phone" class="block text-sm font-medium text-slate-700">Phone</label>
							<Input id="phone" type="phone" bind:value={phone} required class="bg-white" />
						</div>
					</div>

					<div class="space-y-2">
						<label for="subject" class="block text-sm font-medium text-slate-700">Subject</label>
						<Input id="subject" type="subject" bind:value={subject} required class="bg-white" />
					</div>

					<div class="space-y-2">
						<label for="message" class="block text-sm font-medium text-slate-700">Message</label>
						<Textarea
							id="message"
							placeholder="Type your message here."
							class="bg-white"
							bind:value={message}
							required
						/>
					</div>

                    <Button type="submit" variant="primary">Send Message</Button>
				 
				</form>
			</div>
		</div>
	</div>
</div>
