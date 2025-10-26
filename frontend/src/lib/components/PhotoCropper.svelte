<script lang="ts">
	import { onMount } from 'svelte';
	import type { CropperInstance, CropperDefaultProps } from 'svelte-cropper';

	let Cropper: typeof import('svelte-cropper').Cropper | null = null;
	let cropper: CropperInstance | null = null;

	let image_src = 'https://svelte-cropper.vercel.app/ok.jpg';
	interface MyCropperProps extends CropperDefaultProps {
		viewMode?: number;
		dragMode?: string;
		initialAspectRatio?: number;
		autoCropArea?: number;
		responsive?: boolean;
	}
	const cropper_props: MyCropperProps = {
		viewMode: 2,
		dragMode: 'crop',
		initialAspectRatio: 1,
		autoCropArea: 1,
		responsive: true
	};

	onMount(async () => {
		const module = await import('svelte-cropper');
		Cropper = module.Cropper;
	});
</script>

<svelte:component this={Cropper} bind:cropper src={image_src} {cropper_props} />

<button
	on:click={() => {
		if (cropper) {
			const canvas = cropper.getCroppedCanvas();
			if (canvas) {
				const dataUrl = canvas.toDataURL('image/png');
				console.log(dataUrl);
			}
		}
	}}
>
</button>
