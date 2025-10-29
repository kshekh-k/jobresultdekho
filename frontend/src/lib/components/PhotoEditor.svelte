<script lang="ts">
	import html2canvas from 'html2canvas-pro';
	import jsPDF from 'jspdf';

	let imageUrl: string | null = null;
	let name = '';
	let date = '';
	let textColor = '#ffffff';
	let bgColor = '#000000';
	let fontSize = 24;
	let isBold = false;
	let textCase = 'none';
	let isFullWidth = false;

	let position = { x: 50, y: 50 };
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
			const y = imgHeight < pdf.internal.pageSize.getHeight()
				? (pdf.internal.pageSize.getHeight() - imgHeight) / 2
				: 0;

			pdf.addImage(imgData, 'PNG', 0, y, pageWidth, imgHeight);
			pdf.save('photo-with-text.pdf');
		} catch (err) {
			console.error('❌ PDF download failed:', err);
			alert('Error while generating PDF: ' + (err?.message || err));
		}
	}
</script>


<!-- UI Layout -->
<div class="max-w-2xl mx-auto p-4 space-y-4">
	<!-- Upload -->
	<div>
		<label class="block text-sm font-medium mb-2">Upload Photo</label>
		<input
			type="file"
			accept="image/*"
			on:change={handleImageUpload}
			class="block w-full border border-gray-300 p-2 rounded-md"
		/>
	</div>

	{#if imageUrl}
		<!-- Controls -->
		<div class="grid grid-cols-2 gap-3">
			<div>
				<label class="text-sm">Name</label>
				<input
					type="text"
					bind:value={name}
					class="w-full border border-gray-300 p-2 rounded-md"
					placeholder="Enter name"
				/>
			</div>

			<div>
				<label class="text-sm">Date (DOB)</label>
				<input type="date" bind:value={date} class="w-full border border-gray-300 p-2 rounded-md" />
			</div>

			<div>
				<label class="text-sm">Text Color</label>
				<input type="color" bind:value={textColor} class="w-full h-10 rounded-md" />
			</div>

			<div>
				<label class="text-sm">Background Color</label>
				<input type="color" bind:value={bgColor} class="w-full h-10 rounded-md" />
			</div>

			<div>
				<label class="text-sm">Font Size</label>
				<input type="range" min="12" max="72" step="1" bind:value={fontSize} class="w-full" />
				<span class="text-xs">{fontSize}px</span>
			</div>

			<div class="flex items-center space-x-2">
				<input id="bold" type="checkbox" bind:checked={isBold} />
				<label for="bold" class="text-sm">Bold</label>
			</div>

			<div class="flex items-center space-x-2">
				<input id="isFullWidth" type="checkbox" bind:checked={isFullWidth} />
				<label for="isFullWidth" class="text-sm">Full width</label>
			</div>

			<div>
				<label class="text-sm">Case</label>
				<select bind:value={textCase} class="w-full border border-gray-300 p-2 rounded-md">
					<option value="none">Normal</option>
					<option value="uppercase">UPPERCASE</option>
					<option value="lowercase">lowercase</option>
					<option value="capitalize">Capitalize</option>
				</select>
			</div>
		</div>

		<!-- Preview -->
		<div class="relative mt-6 flex justify-center">
			<!-- This wrapper ensures everything captured together -->
			<div
				role="img"
				bind:this={imageRef}
				class="relative inline-block bg-white"
				style="touch-action:none; position: relative;"
				on:mousemove={handleMouseMove}
				on:mousedown={handleMouseDown}
				on:mouseup={handleMouseUp}
				on:mouseleave={handleMouseUp}
			>
				<img
					src={imageUrl}
					alt="Uploaded"
					class="max-w-full h-auto block"
					crossorigin="anonymous"
				/>

				<!-- Text overlay -->
				<div
					class="absolute select-none"
					style="
						top: {position.y}px;
						left: {position.x}px;
						text-align: center;
						pointer-events: none;
					"
				>
					<div
						style="
							color: {textColor};
							background-color: {bgColor};
							font-size: {fontSize}px;
							font-weight: {isBold ? 'bold' : 'normal'};
							padding: 4px 8px;
							display: inline-block;
						"
					>
						{#if name}{transformText(name)}{/if}
						{#if date}<div>{transformText(date)}</div>{/if}
					</div>
				</div>
			</div>
		</div>


		<!-- Download Buttons -->
		<div class="flex justify-center gap-4 mt-4">
			<button
				on:click={downloadAsImage}
				class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
			>
				Download PNG
			</button>

			<button
				on:click={downloadAsPDF}
				class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
			>
				Download PDF
			</button>
		</div>
	{/if}
</div>
