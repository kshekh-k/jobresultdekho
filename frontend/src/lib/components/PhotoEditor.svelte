<script lang="ts">
	import html2canvas from 'html2canvas-pro';
	import jsPDF from 'jspdf';
	import Input from './ui/input/input.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Icon from './ui/Icon.svelte';
	import { Calendar } from 'lucide-svelte';
	let imageUrl: string | null = null;
	let name = '';
	let date = '';
	let textColor = '#000';
	let bgColor = '#fff';
	let fontSize = 14;
	let isBold = false;
	let textCase = 'none';
	let isFullWidth = true;

	let position = { x: 10, y: 100 };
	let dragging = false;
	let offset = { x: 0, y: 0 };
	let imageRef: HTMLDivElement | null = null;

	// Upload
	function handleImageUpload(e: Event) {
		const file = (e.target as HTMLInputElement).files?.[0];
		if (file) imageUrl = URL.createObjectURL(file);
	}

	// Dragging
	function handleMouseDown(event: MouseEvent) {
		if (isFullWidth) return;
		dragging = true;
		offset = { x: event.offsetX - position.x, y: event.offsetY - position.y };
	}

	function handleMouseMove(event: MouseEvent) {
		if (dragging) position = { x: event.offsetX - offset.x, y: event.offsetY - offset.y };
	}

	function handleMouseUp() {
		dragging = false;
	}

	function transformText(text: string): string {
		if (textCase === 'uppercase') return text.toUpperCase();
		if (textCase === 'lowercase') return text.toLowerCase();
		if (textCase === 'capitalize') return text.replace(/\b\w/g, (c) => c.toUpperCase());
		return text;
	}

	// Force computed styles onto inline styles for canvas-safe rendering
	function applyComputedStylesRecursively(node: HTMLElement) {
		const elements = node.querySelectorAll<HTMLElement>('*');
		elements.forEach((el) => {
			const cs = getComputedStyle(el);

			// copy subset of properties that matter for text rendering
			try {
				el.style.color = cs.color;
				el.style.backgroundColor = cs.backgroundColor;
				el.style.fontSize = cs.fontSize;
				el.style.fontWeight = cs.fontWeight;
				el.style.lineHeight = cs.lineHeight;
				el.style.textAlign = cs.textAlign;
				el.style.padding = cs.padding;
				el.style.margin = cs.margin;
				el.style.letterSpacing = cs.letterSpacing;
				// keep display / width for layout
				el.style.display = cs.display;
			} catch (e) {
				// ignore elements we can't set
			}
		});

		// Also set computed styles on the root node
		const rootCs = getComputedStyle(node);
		node.style.backgroundColor = rootCs.backgroundColor || '#ffffff';
		node.style.color = rootCs.color || '#000';
	}

	// ensure image loaded
	function waitForImageLoad(node: HTMLElement) {
		const img = node.querySelector('img');
		if (!img) return Promise.resolve();
		const imageEl = img as HTMLImageElement;
		if (imageEl.complete && imageEl.naturalWidth !== 0) return Promise.resolve();
		return new Promise<void>((resolve, reject) => {
			imageEl.onload = () => resolve();
			imageEl.onerror = () => reject(new Error('image load error'));
		});
	}

	// Download PNG
	async function downloadAsImage() {
		try {
			if (!imageRef) return;

			// wait image load
			await waitForImageLoad(imageRef);

			// make sure cross-origin flagged image doesn't taint. using blobs/local images is best.
			imageRef.style.backgroundColor = '#ffffff';
			imageRef.style.colorScheme = 'light';

			// force computed styles onto inline styles (so html2canvas sees real rgb values)
			applyComputedStylesRecursively(imageRef);

			// small delay to allow style changes to apply
			await new Promise((r) => setTimeout(r, 80));

			const canvas = await html2canvas(imageRef, {
				useCORS: true,
				backgroundColor: '#ffffff',
				scale: 2,
				logging: false
			});

			const link = document.createElement('a');
			link.download = 'photo-with-text.png';
			link.href = canvas.toDataURL('image/png');
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (err) {
			console.error('❌ Image download failed:', err);
			alert('Error while generating image: ' + (err?.message || err));
		}
	}

	// Download PDF
	async function downloadAsPDF() {
		try {
			if (!imageRef) return;

			await waitForImageLoad(imageRef);

			imageRef.style.backgroundColor = '#ffffff';
			imageRef.style.colorScheme = 'light';

			applyComputedStylesRecursively(imageRef);
			await new Promise((r) => setTimeout(r, 80));

			const canvas = await html2canvas(imageRef, {
				useCORS: true,
				backgroundColor: '#ffffff',
				scale: 2,
				logging: false
			});

			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF('p', 'mm', 'a4');
			const pageWidth = pdf.internal.pageSize.getWidth();
			const imgHeight = (canvas.height * pageWidth) / canvas.width;
			const y =
				imgHeight < pdf.internal.pageSize.getHeight()
					? (pdf.internal.pageSize.getHeight() - imgHeight) / 2
					: 0;

			pdf.addImage(imgData, 'PNG', 0, y, pageWidth, imgHeight);
			pdf.save('photo-with-text.pdf');
		} catch (err) {
			console.error('❌ PDF download failed:', err);
			alert('Error while generating PDF: ' + (err?.message || err));
		}
	}

	function openPicker() {
		const el = document.getElementById('dob') as HTMLInputElement;
		if (el) el.showPicker();
	}

	function onChange(e: Event) {
		const target = e.target as HTMLInputElement;
		date = target.value;
	}
</script>

<!-- UI Layout -->

<Card.Root class="" variant={'default'}>
	<Card.Content class="flex-1 md:!px-6 !px-3">
		<div class="max-w-2xl mx-auto space-y-4">
			<!-- Preview -->
			<div class="relative flex justify-center w-64 mx-auto">
				<!-- This wrapper ensures everything captured together -->
				<!-- Upload -->
				<div class="flex flex-col gap-3">
					<div class="space-y-1 relative">
						<input
							id="upload-photo"
							type="file"
							accept="image/*"
							on:change={handleImageUpload}
							class="block w-full border border-gray-300 p-2 rounded-md {imageUrl
								? 'visible'
								: 'invisible absolute'}"
						/>
					</div>
					<div
						role="img"
						bind:this={imageRef}
						class="block bg-white relative touch-none border border-slate-300 p-1"
						on:mousemove={handleMouseMove}
						on:mousedown={handleMouseDown}
						on:mouseup={handleMouseUp}
						on:mouseleave={handleMouseUp}
					>
						<div class="relative overflow-hidden">
							<label for="upload-photo" class="relative">
								<img
									src={imageUrl || '/image/photo-placeholder.png'}
									alt="Uploaded"
									class="w-full h-auto block mx-auto"
									crossorigin="anonymous"
								/>
								{#if !imageUrl}
									<span
										class="text-lg text-center font-bold text-slate-600 absolute inset-x-0 bottom-0 pb-5"
										>Upload your photo</span
									>
								{/if}
							</label>

							<!-- Text overlay -->
							{#if name}
								<div
									class="absolute select-none text-center pointer-none {isFullWidth
										? 'lefft-0 bottom-0 w-full'
										: 'top-(--position-y) left-(--position-x)'}"
									style="--position-y: {position.y}px; --position-x: {position.x}px;"
								>
									<div
										class="text-(color:--textColor) bg-(color:--bgColor) text-(length:--fontSize) font-(weight:--isBold) {isFullWidth
											? 'block'
											: 'inline-block'}"
										style="
							--textColor: {textColor};
							--bgColor: {bgColor};
							--fontSize: {fontSize}px;
							--isBold: {isBold ? '700' : '400'};
							padding: 4px 8px;
							 
						"
									>
										<p>{transformText(name)}</p>
										{#if date}
											<p class="text-(length:--font-size)" style="--font-size:{fontSize / 1.25}px">
												D.O.B. {new Date(date).toLocaleDateString('en-GB').replaceAll('/', '-')}
											</p>
										{/if}
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>

			<!-- Download Buttons -->
			<div class="flex flex-wrap justify-center gap-4 mt-4">
				<button
					on:click={downloadAsImage}
					class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 sm:w-auto w-full"
				>
					Download PNG
				</button>

				<button
					on:click={downloadAsPDF}
					class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 sm:w-auto w-full"
				>
					Download PDF
				</button>
			</div>
			<!-- Controls -->
			<div class="space-y-3">
				<div class="space-y-2">
					<label for="name" class="text-sm block font-medium">Name</label>
					<Input
						id="name"
						type="text"
						bind:value={name}
						class="w-full bg-white shadow-none h-12 border-slate-300"
						placeholder="Enter name"
					/>
				</div>
				<div class="sm:grid sm:grid-cols-2 gap-3 flex flex-col">
					<div class="space-y-2 relative">
						<label for="dob" class="text-sm block font-medium">Date (DOB)</label>
						<input
							id="dob"
							type="date"
							bind:value={date}
							on:change={onChange}
							class="w-full !block bg-white shadow-none h-12 border-slate-300 absolute invisible"
						/>
						<div
							class="w-full flex items-center justify-between border border-slate-300 h-12 rounded-md px-4 py-2 bg-white cursor-pointer"
							on:click={openPicker}
						>
							<span class="text-slate-900">
								{#if date}
									{new Date(date).toLocaleDateString('en-GB').replaceAll('/', '-')}
								{:else}
									Select date
								{/if}
							</span>
							<!-- Custom calendar icon -->
							<Icon name={Calendar} size={20} className="text-slate-600" />
						</div>
					</div>
					<div class="space-y-2">
						<label class="text-sm block font-medium">Case</label>
						<select
							bind:value={textCase}
							class="w-full border border-slate-300 p-2 rounded-md h-12"
						>
							<option value="none">Normal</option>
							<option value="uppercase">UPPERCASE</option>
							<option value="lowercase">lowercase</option>
							<option value="capitalize">Capitalize</option>
						</select>
					</div>
				</div>
				<div class="flex gap-2 flex-wrap justify-between pt-4">
					<div class="space-y-2">
						<label for="text-color" class="text-sm block font-medium">Text Color</label>
						<label
							class="size-10 relative p-1 rounded-full border border-slate-500 flex justify-center items-center"
							style="--bgColor:{textColor}"
						>
							<div class="bg-(color:--bgColor) rounded-full size-8">
								<input
									id="text-color"
									type="color"
									bind:value={textColor}
									class="w-full size-8 invisible absolute"
								/>
							</div>
						</label>
					</div>

					<div class="space-y-2">
						<label for="bg-color" class="text-sm block font-medium">Background Color</label>
						<label
							class="size-10 relative p-1 rounded-full border border-slate-500 flex justify-center items-center"
							style="--bgColor:{bgColor}"
						>
							<div class="bg-(color:--bgColor) rounded-full size-8">
								<input
									id="bg-color"
									type="color"
									bind:value={bgColor}
									class="w-full size-8 invisible absolute"
								/>
							</div>
						</label>
					</div>

					<div class="space-y-2">
						<label for="font-size" class="text-sm block font-medium">Font Size</label>
						<Input
							id="font-size"
							type="number"
							min="12"
							max="72"
							step="1"
							bind:value={fontSize}
							class="w-full bg-white shadow-none h-12 border-slate-300"
						/>
						<span class="text-xs hidden">Font Size: {fontSize}px</span>
					</div>

					<div class="flex items-center space-x-2 md:pt-3">
						<input id="bold" type="checkbox" class="size-5" bind:checked={isBold} />
						<label for="bold" class="text-sm font-medium">Bold</label>
					</div>

					<div class="flex items-center space-x-2 md:pt-3">
						<input id="isFullWidth" type="checkbox" class="size-5" bind:checked={isFullWidth} />
						<label for="isFullWidth" class="text-sm font-medium">Full width</label>
					</div>
				</div>
			</div>
		</div>
	</Card.Content>
</Card.Root>
<!-- {#if imageUrl}{/if} -->
