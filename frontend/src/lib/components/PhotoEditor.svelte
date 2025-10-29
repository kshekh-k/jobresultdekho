<script lang="ts">
	import html2canvas from 'html2canvas';
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
	let imageRef: HTMLDivElement;

	// 🖼️ Handle image upload
	function handleImageUpload(e: Event) {
		const file = (e.target as HTMLInputElement).files?.[0];
		if (file) imageUrl = URL.createObjectURL(file);
	}

	// 🎯 Drag events
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

	// 🔠 Text transformations
	function transformText(text: string): string {
		if (textCase === 'uppercase') return text.toUpperCase();
		if (textCase === 'lowercase') return text.toLowerCase();
		if (textCase === 'capitalize') return text.replace(/\b\w/g, (c) => c.toUpperCase());
		return text;
	}

	// 🧩 Utility: convert oklch → rgb
	function fixColors(node: HTMLElement) {
		const elements = node.querySelectorAll('*');
		elements.forEach((el) => {
			const style = getComputedStyle(el);
			if (style.color.includes('oklch'))
				(el as HTMLElement).style.color = toRGB(style.color);
			if (style.backgroundColor.includes('oklch'))
				(el as HTMLElement).style.backgroundColor = toRGB(style.backgroundColor);
		});
	}

	function toRGB(color: string) {
		const temp = document.createElement('div');
		temp.style.color = color;
		document.body.appendChild(temp);
		const rgb = getComputedStyle(temp).color;
		document.body.removeChild(temp);
		return rgb;
	}

	// 🖼️ Download as PNG
	async function downloadAsImage() {
		try {
			if (!imageRef) return;
			const img = imageRef.querySelector('img');
			if (!img?.complete) {
				await new Promise<void>((resolve) => (img.onload = () => resolve()));
			}

			fixColors(imageRef);

			const canvas = await html2canvas(imageRef, {
				useCORS: true,
				backgroundColor: '#ffffff',
				scale: 2
			});

			const link = document.createElement('a');
			link.download = 'photo-with-text.png';
			link.href = canvas.toDataURL('image/png');
			link.click();
		} catch (err) {
			console.error('❌ Image download failed:', err);
		}
	}

	// 📄 Download as PDF
	async function downloadAsPDF() {
		try {
			if (!imageRef) return;
			const img = imageRef.querySelector('img');
			if (!img?.complete) {
				await new Promise<void>((resolve) => (img.onload = () => resolve()));
			}

			fixColors(imageRef);

			const canvas = await html2canvas(imageRef, {
				useCORS: true,
				backgroundColor: '#ffffff',
				scale: 2
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
			<div
				bind:this={imageRef}
				class="relative size-96 overflow-hidden inline-block"
				on:mousemove={handleMouseMove}
				on:mousedown={handleMouseDown}
				on:mouseup={handleMouseUp}
				on:mouseleave={handleMouseUp}
				style="touch-action: none;"
			>
				<img src={imageUrl} alt="Uploaded" class="max-w-full" />

				<!-- Draggable Text -->
				<div
					class="absolute cursor-move select-none"
					style="
						top: {isFullWidth ? '100%' : position.y + 'px'};
						left: {isFullWidth ? '0' : position.x + 'px'};
						width: {isFullWidth ? '100%' : 'auto'};
						text-align: center;
					"
				>
					<div
						class="px-2 py-1 inline-block"
						style="
							color: {textColor};
							background-color: {bgColor};
							font-size: {fontSize}px;
							font-weight: {isBold ? 'bold' : 'normal'};
							width: {isFullWidth ? '100%' : 'auto'};
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
