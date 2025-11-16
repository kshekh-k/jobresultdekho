<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Mail, Phone, MapPin } from 'lucide-svelte'; // ✅ Icons import
	import Icon from '$lib/components/ui/Icon.svelte';
	import SocialMedia from '$lib/components/SocialMedia.svelte';
	import InnerHero from '$lib/components/InnerHero.svelte';
	import Layout from '$lib/components/Layout.svelte';

	const dispatch = createEventDispatcher();

	let firstName = '';
	let lastName = '';
	let email = '';
	let phone = '';
	let message = '';

	function handleSubmit(e: Event) {
		e.preventDefault();
		console.log({ firstName, lastName, email, message });
		dispatch('submit', { firstName, lastName, email, message });
		alert('Thank you for contacting us! We will get back to you soon.');
		firstName = '';
		lastName = '';
		email = '';
		message = '';
	}
</script>

<svelte:head>
	<title>Contact Us | JobResultDekho.com</title>
	<meta
		name="description"
		content="Contact JobResultDekho.com for support, queries, and feedback."
	/>
</svelte:head>

<!-- MAIN CONTAINER -->
 
	<!-- Content Section -->
<Layout heading={'Contact us'}>
	<div class="bg-white p-5 rounded-xl shadow-md flex flex-col gap-5">
	 <div class="lg:grid lg:grid-cols-2 flex flex-col gap-10">
		<!-- Left Form -->	 
			<div class="space-y-5 text-slate-700 md:p-8 ">
				<!-- Contact Details -->
				<h2 class="text-3xl font-bold mb-4">Quick Contact</h2>
			<p class="text-slate-600 mb-8">
				Get in touch with us using the enquiry form or contact details below.
			</p>
				<!-- Quick Contact -->
				<div class="flex items-start gap-4">
					<div class="p-3 rounded-sm border border-sky-200  bg-sky-100 text-sky-800  shrink-0">
						<Icon name={Mail} size={20} className="text-sky-800" />
					</div>
					<div class="flex flex-col gap-1">
						<h3 class="text-lg font-semibold">Email</h3>
						<p>						 
							<a href="mailto:info@jobresultdekho.com" class="text-sky-800 hover:underline">
								info@jobresultdekho.com
							</a>
						</p>
					</div>
				</div>
<!-- Phone Number -->
				<div class="flex items-start gap-4">
					<div class="p-3 rounded-sm border border-sky-200  bg-sky-100 text-sky-800  shrink-0">
						<Icon name={Phone} size={20} className="text-sky-800" />
					</div>
					<div class="flex flex-col gap-1">
						<h3 class="text-lg font-semibold">Phone</h3>
						<p>						 
							<a href="tel:+919530023380" class="text-sky-800 hover:underline">
								+91 95300 23380
							</a>
						</p>
					</div>
				</div>

				<!-- Address -->
				<div class="flex items-start gap-4">
					<div class="p-3 rounded-sm border border-sky-200 bg-sky-100 text-sky-800 shrink-0">
						<Icon name={MapPin} size={20} className="text-sky-800" />
					</div>
					<div class="flex flex-col gap-1">
						<h3 class="text-lg font-semibold">Address</h3>
						<p class="text-sky-800 ">						 
							Plot No. 47, Narayanpuri,<br />
							Near Jai Hind School, Jhotwara,<br />
							Jaipur (Raj.) PIN 302012
						</p>
					</div>
				</div>
				<div class="flex flex-col justify-sart items-start gap-2">
				<h3 class="text-lg font-semibold">Follow us</h3>
				 <SocialMedia className="border border-sky-200 bg-sky-100 hover:text-white text-sky-800 size-10 rounded-sm [&>i]:text-xl mr-1"/>
				</div>
				 
				 
			</div>
	 
		<!-- Right Side -->
		<div class=" p-5 md:p-8 rounded-xl border border-slate-200 bg-slate-50">
			<h2 class="text-2xl font-bold mb-4 text-slate-700">Send inquiry</h2>
			 
			<form on:submit|preventDefault={handleSubmit} class="space-y-6">
				<div class="grid md:grid-cols-2 gap-6">
					 
					 
						<Input
							type="text"
							placeholder="First Name"
							bind:value={firstName}
							required
							class="bg-slate-50 h-12 py-3 px-4 rounded-sm border border-slate-300 w-full shadow-none"
						/>
				 
			 
				 
						<Input
							type="text"
							placeholder="Last Name"
							bind:value={lastName}
							required
							class="bg-slate-50 h-12 py-3 px-4 rounded-sm border border-slate-300 w-full shadow-none"
						/>
				 
				 
			 
					<Input
						type="email"
						placeholder="Email"
						bind:value={email}
						required
						class="bg-slate-50 h-12 py-3 px-4 rounded-sm border border-slate-300 w-full shadow-none"
					/>
			 
					<Input
						type="tel"
						placeholder="Phone"
						bind:value={phone}
						required
						class="bg-slate-50 h-12 py-3 px-4 rounded-sm border border-slate-300 w-full shadow-none"
					/>
				</div>

			 
				 
					<Textarea
						placeholder="Type your message..."
						bind:value={message}
						required
						class="bg-slate-50 py-3 px-4 rounded-sm border border-slate-300 w-full h-32"
					/>
				 

				<div class="space-y-3 text-sm">
					<label class="flex items-center gap-2 text-slate-500">
						<input type="checkbox" required class="accent-sky-600 size-4" />
						<span>I agree to receive other communication messages.</span>
					</label>
					<label class="flex items-center gap-2 text-slate-500">
						<input type="checkbox" required class="accent-sky-600 size-4" />
						<span>I give my consent to JobResultDekho to store my data.</span>
					</label>
				</div>

				<Button
					type="submit"
					variant="primary"
					class="w-full bg-sky-800 hover:bg-sky-700 py-3 text-lg h-12"
				>
					Send Message
				</Button>
			</form>
		</div>
	</div>
</div>
 </Layout>
 
 
