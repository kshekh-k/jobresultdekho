<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
	import Icon from './ui/Icon.svelte';
	import { SITE_URL } from '$lib/utils';
	import { page } from '$app/stores';

	// ✅ Svelte 5 props
	const {
		onNavigate = () => {},
		categories = []
	} = $props<{
		onNavigate?: () => void;
		categories?: {
			title: string;
			slug: string;
			children?: { title: string; slug: string }[];
		}[];
	}>();

	// ------------------------------
	// State
	// ------------------------------
	let openMenu = $state<string | null>(null);

	const toggleMenu = (key: string) => {
	openMenu = openMenu === key ? null : key;
	console.log('clicked:', key);
};

const closeMenu = () => {
	openMenu = null;
};

	// ------------------------------
	// Pathname detection
	// ------------------------------
	const currentPath = $derived($page.url.pathname);

	// Check if single link active
	const isActive = (slug: string) => {
		const normalizedSlug = slug.startsWith('/') ? slug : `/${slug}`;
		return currentPath === normalizedSlug;
	};	 
</script>

<!-- ========================= -->
<!--       NAVIGATION MENU     -->
<!-- ========================= -->
<nav class="flex-1 flex justify-center">
	<ul
		class="flex flex-col lg:flex-row items-stretch lg:items-center lg:justify-center lg:gap-1 xl:gap-5 flex-1 divide-y divide-white/10 lg:divide-y-0"
	>
		{#each categories as cat}
			<!-- HOME -->
			{#if cat.title.toLowerCase() === 'home'}
				<li>
					<a
						href={SITE_URL} 
						title={cat.title}
						onclick={onNavigate}
						class="block p-3 lg:py-1 md:px-2 text-sm xl:text-base font-medium text-left lg:text-center rounded-sm ease-in-out duration-200
							{currentPath === '/' 
								? 'text-white bg-white/10'
								: 'text-white hover:text-sky-200 hover:bg-white/10'}"
					>
						{cat.title}
					</a>
				</li>

			<!-- DROPDOWN WITH CHILDREN -->
			{:else if cat.children?.length}
				<li class="relative">
					<button
						onclick={() => toggleMenu(cat.title)}
						class="flex items-center justify-between lg:justify-center w-full p-3 lg:py-1 md:px-2 text-base font-medium rounded-sm ease-in-out duration-200
							{openMenu === cat.title
								? 'text-white bg-white/10'
								: 'text-white hover:text-sky-200 hover:bg-white/10'}"
					>
						{cat.title}
						<Icon name={ChevronDown} size={16} className="ml-1 {openMenu === cat.title ? 'rotate-180':''}" />
					</button>

					{#if openMenu === cat.title}
						<ul
							class="lg:absolute lg:left-0 mt-2 lg:w-48 lg:bg-white lg:border lg:rounded-lg lg:shadow-lg lg:z-50 divide-y divide-white/10"
							onmouseleave={closeMenu}
						>
							{#each cat.children as child, index}
								<li>
									<a
										href={`/${child.slug}`}
										title={child.title}
										onclick={onNavigate}
										class="block p-3 lg:py-2 lg:px-5 text-base font-medium ease-in-out duration-200
											{isActive(child.slug)
												? 'text-white lg:text-sky-600 lg:bg-slate-50'
												: 'text-white lg:text-slate-500 hover:text-sky-600 hover:bg-slate-50'}
											{index === 0 ? ' rounded-t-lg' : ''}
											{index === cat.children.length - 1 ? ' rounded-b-lg' : ''}"
										 
									>
										{child.title}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>

			<!-- NORMAL LINK -->
			{:else}
				<li>
					<a
						href={`/${cat.slug}`}
						title={cat.title}
						onclick={onNavigate}
						class="block p-3 lg:py-1 md:px-2 text-base font-medium text-left lg:text-center rounded-sm ease-in-out duration-200
							{isActive(cat.slug)
								? 'text-white bg-white/10'
								: 'text-white hover:text-sky-200 hover:bg-white/10'}"
					>
						{cat.title}
					</a>
				</li>
			{/if}
		{/each}
	</ul>
</nav>
