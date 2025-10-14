<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Mail, Phone, MapPin } from 'lucide-svelte'; // ✅ Icons import

	const dispatch = createEventDispatcher();

	let firstName = '';
	let lastName = '';
	let email = '';
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
	<title>Contact Us — JobResultDekho</title>
	<meta
		name="description"
		content="Contact JobResultDekho.com for support, queries, and feedback."
	/>
</svelte:head>

<!-- MAIN CONTAINER -->
<div class="min-h-screen bg-slate-50">
  <!-- Blue Banner -->
  <section
    class="bg-sky-500 text-white text-center py-10 relative overflow-hidden rounded-[1.5rem] shadow-md mt-8 max-w-5xl mx-auto px-5"
  >
    <div
      class="absolute inset-0 opacity-20 bg-[url('/waves.svg')] bg-cover bg-center pointer-events-none"
    ></div>

    <div class="relative z-10">
      <button
        class="px-4 py-1 border border-white rounded-full text-sm font-medium mb-3 hover:bg-white hover:text-sky-500 transition"
      >
        Write to us
      </button>
      <h1 class="text-3xl md:text-4xl font-bold">Get In Touch</h1>
    </div>
  </section>


<!-- Content Section -->
<div class="max-w-6xl mx-auto py-12 px-5 md:px-10 grid md:grid-cols-2 gap-10">
  <!-- Left Form -->
  <div class="bg-white p-8 rounded-2xl shadow-lg">
    <h2 class="text-3xl font-bold mb-4">Let's Talk!</h2>
    <p class="text-slate-600 mb-8">
      Get in touch with us using the enquiry form or contact details below.
    </p>

    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <!-- <label class="block text-sm font-medium text-slate-700 mb-2">First Name</label> -->
          <Input type="text" placeholder="First Name" bind:value={firstName} required class="bg-white p-2 rounded-lg border border-slate-300 w-full" />
        </div>
        <div>
          <!-- <label class="block text-sm font-medium text-slate-700 mb-2">Last Name</label> -->
          <Input type="text" placeholder="Last Name" bind:value={lastName} required class="bg-white p-2 rounded-lg border border-slate-300 w-full" />
        </div>
      </div>

      <div>
        <!-- <label class="block text-sm font-medium text-slate-700 mb-2">Email</label> -->
        <Input type="email" placeholder="Email" bind:value={email} required class="bg-white p-2 rounded-lg border border-slate-300 w-full" />
      </div>

      <div>
        <!-- <label class="block text-sm font-medium text-slate-700 mb-2">Message</label> -->
        <Textarea
          placeholder="Type your message..."
          bind:value={message}
          required
          class="bg-white p-3 rounded-lg border border-slate-300 w-full h-32"
        />
      </div>

      <div class="space-y-3 text-sm">
        <label class="flex items-start gap-2">
          <input type="checkbox" required class="mt-1 accent-blue-600" />
          <span>I agree to receive other communication messages.</span>
        </label>
        <label class="flex items-start gap-2">
          <input type="checkbox" required class="mt-1 accent-blue-600" />
          <span>I give my consent to JobResultDekho to store my data.</span>
        </label>
      </div>

      <Button type="submit" variant="primary" class="w-full bg-[#007BFF] hover:bg-blue-700 py-3 text-lg">
        Send Message
      </Button>
    </form>
  </div>



		<!-- Right Side -->
		<div class="space-y-5">
			<!-- Image Section -->
			<div class="rounded-2xl shadow-lg p-6 flex justify-center items-center h-[17rem]">
				<!-- <img
					src="/image/contactStudent2.jpg"
					alt="Contact"
					class="rounded-xl object-contain w-[100%] max-h-[15rem]"
				/> -->
			</div>

			<!-- Contact Details -->
			<div class="bg-white p-6 rounded-2xl shadow-lg space-y-5 text-slate-700">
				<!-- Quick Contact -->
				<div class="flex items-start gap-4">
					<div class="p-3 rounded-xl border border-sky-100 bg-sky-50">
						<Mail class="w-5 h-5 text-[#007BFF]" />
					</div>
					<div>
						<h3 class="text-base font-semibold mb-1">Quick Contact</h3>
						<p>
							Email:
							<a href="mailto:info@jobresultdekho.com" class="text-sky-600 hover:underline">
								info@jobresultdekho.com
							</a>
						</p>
					</div>
				</div>

				<!-- Phone Number -->
				<div class="flex items-start gap-4">
					<div class="p-3 rounded-xl border border-sky-100 bg-sky-50">
						<Phone class="w-5 h-5 text-[#007BFF]" />
					</div>
					<div>
						<h3 class="text-base font-semibold mb-1">Phone Number</h3>
						<p>India: +91 98765 43210</p>
						<p>Support: +91 99988 77665</p>
					</div>
				</div>

				<!-- Headquarter -->
				<div class="flex items-start gap-4">
					<div class="p-3 rounded-xl border border-sky-100 bg-sky-50">
						<MapPin class="w-5 h-5 text-[#007BFF]" />
					</div>
					<div>
						<h3 class="text-base font-semibold mb-1">Headquarter</h3>
						<p>
							Plot No. 47, Narayanpuri,<br />
							Near Jai Hind School, Jhotwara,<br />
							Jaipur (Raj.) PIN 302012
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
