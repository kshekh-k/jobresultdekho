<script lang="ts">
	import ButtonGroup from './Button-Group.svelte';
	import ArticleCard from '$lib/components/ArticleCard.svelte'; 
	let selected = 'Results';

	const options = [
		{ label: 'Results', value: '/result' },
		{ label: 'Latest Jobs', value: '/latest-job' },
		{ label: 'Admit Cards', value: '/admit-card' },
		{ label: 'Answer Keys', value: 'answer-key' },
		{ label: 'Documents', value: '/documents' },
		{ label: 'Admissions', value: '/admissions' }
	];	 

	const posts = [
		{ label: 'Post One', buttonLabel:'View', href: '/post/one' },
		{ label: 'Post Two', buttonLabel:'View', href: '/post/two' },
		{ label: 'Post Three', buttonLabel:'View', href: '/post/three' }
	];

	function handleView() {
		alert('View button clicked!');
	}
</script>

<ButtonGroup
  {options}
  {selected}   
  variant="separated"
  size="lg"
  distribution="equal"
  selectedVariant="success"
  normalVariant="dark"
  />
  
<section class="grid grid-cols-12 gap-6">
	<div class="col-span-9 grid grid-cols-2 gap-4 items-start">		
		 <div class="space-y-4">
		<ArticleCard
			title="Latest Articles"
			items={posts}
			viewText="See More"
			cat={'/latest-job'}
		/> 
		<ArticleCard
			title="Results"
			items={posts}
			viewText="See More"
			cat={'/result'}
		/> 
       

		<ArticleCard
			title="Results"
			items={posts}
			viewText="See More"
			cat={'/result'}
		/> </div> 
        <div class="space-y-4">
		<ArticleCard
			title="Results"
			items={posts}
			viewText="See More"
			cat={'/result'}
		/> 
		<ArticleCard
			title="Results"
			items={posts}
			viewText="See More"
			cat={'/result'}
		/>
        </div>
	</div>
	<aside class="col-span-3">Sidebar</aside>
</section>
