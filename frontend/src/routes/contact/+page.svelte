<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Mail, Phone, MapPin } from 'lucide-svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import SocialMedia from '$lib/components/SocialMedia.svelte';
	import InnerHero from '$lib/components/InnerHero.svelte';
	import Layout from '$lib/components/Layout.svelte';

	// ✅ import centralized API function
	import { createContact } from '$lib/api/contact';
	import { SITE_URL, SITE_NAME, OG_IMAGE, SITE_LOGO } from '$lib/utils';
	const dispatch = createEventDispatcher();

	let firstName = '';
	let lastName = '';
	let email = '';
	let phone = '';
	let message = '';

	async function handleSubmit(e: Event) {
		e.preventDefault();

		const payload = {
			first_name: firstName,
			last_name: lastName,
			email,
			phone,
			message
		};

		try {
			// ✅ reCAPTCHA integration
			const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
			await new Promise<void>((resolve) => grecaptcha.ready(() => resolve()));
			const token = await grecaptcha.execute(siteKey, { action: 'contact' });

			// ✅ call centralized API
			const data = await createContact({ ...payload, recaptchaToken: token });
			alert('Thanks! Your inquiry has been submitted.');
			firstName = lastName = email = phone = message = '';
		} catch (error) {
			alert(String(error));
		}
	}
</script>

<svelte:head>
	<title>Contact Us | {SITE_NAME}</title>
	<meta
		name="description"
		content="Contact ${SITE_NAME} for support, partnership opportunities, advertising, or feedback. We collaborate with businesses, recruiters, and organizations to promote opportunities, increase reach, and build long-term, result-driven partnerships through our platform."
	/>
	<meta
		name="keywords"
		content="contact {SITE_NAME}, {SITE_NAME} contact, contact sarkari result website, sarkari naukri contact, govt jobs website support, job portal contact, contact for advertisement, job website advertising, government jobs website contact, sarkari result support, job alerts website contact, {SITE_NAME} feedback, {SITE_NAME} partnership"
	/>

	<meta property="og:site_name" content={SITE_NAME} />
	<link rel="canonical" href={`${SITE_URL}/contact`} />

	<meta property="og:title" content="Contact Us | {SITE_NAME}" />
	<meta
		property="og:description"
		content="Contact ${SITE_NAME} for support, partnership opportunities, advertising, or feedback. We collaborate with businesses, recruiters, and organizations to promote opportunities, increase reach, and build long-term, result-driven partnerships through our platform."
	/>
	<meta property="og:url" content="{SITE_URL}/contact" />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:type" content="website" />

	<!-- Schema.org JSON-LD (SEO Boost) -->
	{@html `
<script type="application/ld+json">
${JSON.stringify({
	'@context': 'https://schema.org',
	'@type': 'WebPage',
	'@id': `${SITE_URL}/contact#WebPage`,
	name: `Contact Us | ${SITE_NAME}`,
	headline: `Contact Us | ${SITE_NAME}`,
	url: `${SITE_URL}/contact`,
	image: OG_IMAGE,
	description: `Contact ${SITE_NAME} for support, partnership opportunities, advertising, or feedback. We collaborate with businesses, recruiters, and organizations to promote opportunities, increase reach, and build long-term, result-driven partnerships through our platform.`,
	isPartOf: {
		'@type': 'WebSite',
		'@id': `${SITE_URL}/#website`,
		inLanguage: 'en-IN',
		name: SITE_NAME,
		url: SITE_NAME
	},
	author: {
		'@type': 'Organization',
		name: SITE_NAME,
		logo: {
			'@type': 'ImageObject',
			url: SITE_LOGO
		}
	},
	potentialAction: {
		'@type': 'SearchAction',
		target: `${SITE_URL}/search?q={search_term_string}`,
		'query-input': 'required name=search_term_string'
	}
})}
</script>
`}
</svelte:head>

<!-- Content Section -->
<Layout heading={'Contact us'}>
	<div class="bg-white p-5 rounded-xl shadow-md flex flex-col gap-5">
		<div class="lg:grid lg:grid-cols-2 flex flex-col gap-10">
			<!-- Left Form -->
			<div class="space-y-5 text-slate-700 md:p-8">
				<!-- Contact Details -->
				<h2 class="text-3xl font-bold mb-4">Quick Contact</h2>
				<p class="text-slate-600 mb-8">
					Get in touch with us using the enquiry form or contact details below.
				</p>
				<!-- Quick Contact -->
				<div class="flex items-start gap-4">
					<div class="p-3 rounded-sm border border-sky-200 bg-sky-100 text-sky-800 shrink-0">
						<Icon name={Mail} size={20} className="text-sky-800" />
					</div>
					<div class="flex flex-col gap-1">
						<h3 class="text-lg font-semibold">Email</h3>
						<p>
							<a
								href="mailto:info@jobresultdekho.com"
								title="info@jobresultdekho.com"
								class="text-sky-800 hover:underline"
							>
								info@jobresultdekho.com
							</a>
						</p>
					</div>
				</div>
				<!-- Phone Number -->
				<div class="flex items-start gap-4">
					<div class="p-3 rounded-sm border border-sky-200 bg-sky-100 text-sky-800 shrink-0">
						<Icon name={Phone} size={20} className="text-sky-800" />
					</div>
					<div class="flex flex-col gap-1">
						<h3 class="text-lg font-semibold">Phone</h3>
						<p>
							<a
								href="tel:+919530023380"
								title="+91 95300 23380"
								class="text-sky-800 hover:underline"
							>
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
						<p class="text-sky-800">
							Plot No. 47, Narayanpuri,<br />
							Near Jai Hind School, Jhotwara,<br />
							Jaipur (Raj.) PIN 302012
						</p>
					</div>
				</div>
				<div class="flex flex-col justify-sart items-start gap-2">
					<h3 class="text-lg font-semibold">Follow us</h3>
					<SocialMedia
						className="border border-sky-200 bg-sky-100 hover:text-white text-sky-800 size-10 rounded-sm [&>i]:text-xl mr-1"
					/>
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
