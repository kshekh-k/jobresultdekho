 <script lang="ts">
  import { onMount } from "svelte";
  import { nanoid } from "nanoid";

  interface TextOverlay {
    id: string;
    text: string;
    x: number;
    y: number;
    fontSize: number;
    color: string;
    fontFamily: string;
    fontWeight: string;
    fontStyle: string;
  }

  interface CropData {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  interface EditorState {
    imageSrc: string | null;
    textOverlays: TextOverlay[];
    cropData: CropData | null;
  }

  let canvas: HTMLCanvasElement;
  let container: HTMLDivElement;
  let ctx: CanvasRenderingContext2D;

  let imageSrc: string | null = null;
  let image: HTMLImageElement;

  let textOverlays: TextOverlay[] = [];
  let selectedTextId: string | null = null;

  let mode: 'select' | 'crop' | 'text' = 'select';
  let cropData: CropData | null = null;

  let zoom = 1;

  let history: EditorState[] = [];
  let historyIndex = -1;

  const PRESET_COLORS = [
    "#FFFFFF", "#000000", "#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"
  ];
  const FONT_FAMILIES = ["Inter", "Arial", "Georgia", "Courier New", "Verdana"];

  // --- Upload Image ---
  function handleFile(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      imageSrc = reader.result as string;
      image = new Image();
      image.onload = () => {
        drawCanvas();
        addToHistory();
      };
      image.src = imageSrc;
    };
    reader.readAsDataURL(file);
  }

  // --- Draw Canvas ---
  function drawCanvas() {
    if (!canvas || !image) return;
    ctx = canvas.getContext("2d")!;
    canvas.width = image.width * zoom;
    canvas.height = image.height * zoom;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Draw Text
    const scale = zoom;
    textOverlays.forEach(t => {
      ctx.font = `${t.fontStyle} ${t.fontWeight} ${t.fontSize * scale}px ${t.fontFamily}`;
      ctx.fillStyle = t.color;
      ctx.textAlign = "center";
      ctx.fillText(t.text, t.x * scale, t.y * scale);
    });

    // Draw Crop
    if (cropData && mode === 'crop') {
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(cropData.x * scale, cropData.y * scale, cropData.width * scale, cropData.height * scale);
      ctx.fillStyle = 'rgba(255,0,0,0.2)';
      ctx.fillRect(cropData.x * scale, cropData.y * scale, cropData.width * scale, cropData.height * scale);
    }
  }

  // --- Text Overlay ---
  function addTextOverlay() {
    if (!canvas) return;
    const newText: TextOverlay = {
      id: nanoid(),
      text: "Double click to edit",
      x: canvas.width / 2 / zoom,
      y: canvas.height / 2 / zoom,
      fontSize: 32,
      color: "#FFFFFF",
      fontFamily: "Inter",
      fontWeight: "600",
      fontStyle: "normal",
    };
    textOverlays = [...textOverlays, newText];
    selectedTextId = newText.id;
    mode = 'text';
    addToHistory();
  }

  function updateText(id: string, updates: Partial<TextOverlay>) {
    textOverlays = textOverlays.map(t => t.id === id ? { ...t, ...updates } : t);
    addToHistory();
  }

  function deleteText(id: string) {
    textOverlays = textOverlays.filter(t => t.id !== id);
    if (selectedTextId === id) selectedTextId = null;
    addToHistory();
  }

  // --- Crop ---
  function startCrop() {
    if (!canvas) return;
    mode = 'crop';
    cropData = {
      x: canvas.width / 4 / zoom,
      y: canvas.height / 4 / zoom,
      width: canvas.width / 2 / zoom,
      height: canvas.height / 2 / zoom
    };
  }

  function applyCrop() {
    if (!cropData || !image) return;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = cropData.width;
    tempCanvas.height = cropData.height;
    const tctx = tempCanvas.getContext('2d')!;
    tctx.drawImage(
      image,
      cropData.x,
      cropData.y,
      cropData.width,
      cropData.height,
      0,
      0,
      cropData.width,
      cropData.height
    );
    image = new Image();
    image.onload = drawCanvas;
    image.src = tempCanvas.toDataURL();
    cropData = null;
    mode = 'select';
    addToHistory();
  }

  // --- Download ---
  function downloadImage() {
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'edited.png';
    link.href = canvas.toDataURL();
    link.click();
  }

  // --- Zoom ---
  function zoomIn() { zoom = Math.min(3, zoom + 0.1); drawCanvas(); }
  function zoomOut() { zoom = Math.max(0.1, zoom - 0.1); drawCanvas(); }

  // --- History ---
  function captureState(): EditorState {
    return {
      imageSrc,
      textOverlays: JSON.parse(JSON.stringify(textOverlays)),
      cropData: cropData ? { ...cropData } : null
    };
  }

  function addToHistory() {
    const state = captureState();
    history = history.slice(0, historyIndex + 1);
    history.push(state);
    historyIndex = history.length - 1;
  }

  function undo() {
    if (historyIndex <= 0) return;
    historyIndex--;
    restoreState(history[historyIndex]);
  }

  function redo() {
    if (historyIndex >= history.length - 1) return;
    historyIndex++;
    restoreState(history[historyIndex]);
  }

  function restoreState(state: EditorState) {
    imageSrc = state.imageSrc;
    if (imageSrc) {
      image = new Image();
      image.onload = drawCanvas;
      image.src = imageSrc;
    }
    textOverlays = state.textOverlays;
    cropData = state.cropData;
  }

  $: drawCanvas();
</script>

<div class="flex flex-col md:flex-row h-screen">
  <aside class="w-80 p-4 border-r space-y-4">
    <h2 class="font-bold text-lg">Tools</h2>
    <button class="w-full p-2 bg-gray-200 rounded" on:click={addTextOverlay}>Add Text</button>
    <button class="w-full p-2 bg-gray-200 rounded" on:click={startCrop}>Crop</button>
    <button class="w-full p-2 bg-gray-200 rounded" on:click={zoomIn}>Zoom In</button>
    <button class="w-full p-2 bg-gray-200 rounded" on:click={zoomOut}>Zoom Out</button>
    <button class="w-full p-2 bg-gray-200 rounded" on:click={undo}>Undo</button>
    <button class="w-full p-2 bg-gray-200 rounded" on:click={redo}>Redo</button>
    <button class="w-full p-2 bg-blue-600 text-white rounded" on:click={downloadImage}>Download</button>
    <input type="file" accept="image/*" on:change={handleFile} class="mt-4"/>
  </aside>

  <main class="flex-1 flex items-center justify-center bg-gray-100 overflow-auto p-4">
    <div bind:this={container} class="relative">
      <canvas bind:this={canvas} class="border rounded-md" />
      {#each textOverlays as t (t.id)}
        <input
          type="text"
          bind:value={t.text}
          class="absolute bg-transparent border-none text-white font-bold"
          style="left:{t.x*zoom}px; top:{t.y*zoom}px; font-size:{t.fontSize*zoom}px; font-family:{t.fontFamily}; color:{t.color}; transform: translate(-50%, -50%);"
          on:input={() => updateText(t.id, { text: t.text })}
        />
      {/each}
    </div>
  </main>
</div>

{#if mode === 'crop' && cropData}
  <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
    <button class="p-2 bg-green-500 text-white rounded" on:click={applyCrop}>Apply Crop</button>
    <button class="p-2 bg-red-500 text-white rounded" on:click={() => { cropData = null; mode='select' }}>Cancel</button>
  </div>
{/if}

<style>
  canvas { max-width: 100%; }
</style>
