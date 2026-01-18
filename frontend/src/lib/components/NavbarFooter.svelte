<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
	import Icon from './ui/Icon.svelte';
	import { SITE_URL } from '$lib/utils';
	import { page } from '$app/stores';

	// Svelte 5 props
	const { onNavigate = () => {}, categories = [] } = $props<{
		onNavigate?: () => void;
		categories?: {
			title: string;
			slug: string;
			children?: { title: string; slug: string }[];
		}[];
	}>();

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
		class="flex flex-wrap items-stretch lg:items-center justify-center gap-x-2 gap-y-1 xl:gap-x-5 flex-1"
	>
		{#each categories as cat}
			<!-- HOME -->
			{#if cat.title.toLowerCase() === 'home'}
				<li>
					<a
						href={SITE_URL}
						title={cat.title}
						onclick={onNavigate}
						class="block py-1 lg:py-4 text-sm ease-in-out duration-200 text-center
							{currentPath === '/' ? 'text-white' : 'hover:text-white text-white/60'}"
					>
						{cat.title}
					</a>
				</li>
			{:else if cat.children?.length}
				<li class="hidden">{cat.title}</li>
				{#each cat.children as child}
					<li>
						<a
							href={`/${child.slug}`}
							title={child.title}
							onclick={onNavigate}
							class="block py-1 lg:py-4 text-sm ease-in-out duration-200 text-center
								{isActive(child.slug) ? 'text-white' : 'hover:text-white text-white/60'}"
						>
							{child.title}
						</a>
					</li>
				{/each}
				<!-- NORMAL LINK -->
			{:else}
				<li>
					<a
						href={`/${cat.slug}`}
						title={cat.title}
						onclick={onNavigate}
						class="block py-1 lg:py-4 text-sm ease-in-out duration-200 text-center
							{isActive(cat.slug) ? 'text-white' : 'hover:text-white text-white/60'}"
					>
						{cat.title}
					</a>
				</li>
			{/if}
		{/each}
	</ul>
</nav>
