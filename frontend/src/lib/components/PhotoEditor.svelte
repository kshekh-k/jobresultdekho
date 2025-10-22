<script lang="ts">
	import { onDestroy } from 'svelte';
	import Cropper from 'cropperjs';
	import 'cropperjs/dist/cropper.css';

	let imageFile: File | null = null;
	let imageUrl: string | null = null;
	let cropper: any = null; // using any because cropperjs types are incomplete
	let croppedImage: string | null = null;

	let name = '';
	let dob = '';

	function handleFileUpload(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files && target.files[0]) {
			imageFile = target.files[0];
			imageUrl = URL.createObjectURL(imageFile);
			croppedImage = null;
		}
	}

	function initCropper(img: HTMLImageElement) {
		if (cropper && typeof cropper.destroy === 'function') {
			cropper.destroy();
		}

		const options: any = {
			viewMode: 1,
			aspectRatio: NaN,
			autoCropArea: 1,
			zoomable: true,
			scalable: true,
			movable: true
		};

		cropper = new Cropper(img, options);
	}

	function cropImage() {
		if (!cropper) return;

		const canvas = cropper.getCroppedCanvas?.();
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) {
			console.warn('Canvas context not available');
			return;
		}

		// Draw text background for readability
		function drawTextWithBackground(text: string, y: number) {
			if (!text) return;
			const metrics = ctx.measureText(text);
			const textWidth = metrics.width;
			const padding = 8;
			ctx.fillStyle = 'rgba(0,0,0,0.45)';
			ctx.fillRect(
				(canvas.width - textWidth) / 2 - padding,
				y - 28,
				textWidth + padding * 2,
				32
			);
			ctx.fillStyle = '#fff';
			ctx.font = '24px sans-serif';
			ctx.textAlign = 'center';
			ctx.fillText(text, canvas.width / 2, y);
		}

		// Draw the text overlays
		drawTextWithBackground(name, canvas.height - 60);
		drawTextWithBackground(dob, canvas.height - 30);

		croppedImage = canvas.toDataURL('image/png');
	}

	function downloadImage() {
		if (!croppedImage) return;
		const a = document.createElement('a');
		a.href = croppedImage;
		a.download = 'edited-photo.png';
		a.click();
	}

	onDestroy(() => {
		if (cropper && typeof cropper.destroy === 'function') {
			cropper.destroy();
		}
		if (imageUrl) {
			URL.revokeObjectURL(imageUrl);
		}
	});
</script>

<div class="max-w-2xl mx-auto p-6">
	<h2 class="text-2xl font-semibold mb-6 text-center">📷 Photo Upload & Editor</h2>

	<!-- File Upload -->
	<div class="mb-4">
		<input
			type="file"
			accept="image/*"
			on:change={handleFileUpload}
			class="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
		/>
	</div>

	<!-- Crop Section -->
	{#if imageUrl && !croppedImage}
		<div class="mb-4">
			<img
				src={imageUrl}
				alt="Preview"
				on:load={(e) => initCropper(e.target as HTMLImageElement)}
				class="max-w-full rounded-lg shadow-md"
			/>
		</div>

		<!-- Input Fields -->
		<div class="grid grid-cols-2 gap-4 mb-4">
			<input
				type="text"
				bind:value={name}
				placeholder="Enter Name"
				class="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
			/>
			<input
				type="text"
				bind:value={dob}
				placeholder="Enter Date of Birth"
				class="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
			/>
		</div>

		<!-- Crop Button -->
		<div class="text-center">
			<button
				on:click={cropImage}
				class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
				Crop & Add Text
			</button>
		</div>
	{/if}

	<!-- Cropped Result -->
	{#if croppedImage}
		<div class="mt-8 text-center">
			<img
				src={croppedImage}
				alt="Cropped Result"
				class="mx-auto rounded-lg shadow-lg mb-4 max-h-96 border"
			/>
			<div class="flex justify-center gap-4">
				<button
					on:click={downloadImage}
					class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
					Download Image
				</button>
				<button
					on:click={() => (croppedImage = null)}
					class="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition">
					Edit Again
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	:global(.cropper-container) {
		max-width: 100%;
	}
</style>
