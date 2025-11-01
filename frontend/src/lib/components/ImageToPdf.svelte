<script lang="ts">
  import { jsPDF } from "jspdf";
	import * as Card from '$lib/components/ui/card/index.js';
  let files: File[] = [];
  let previews: { url: string; name: string }[] = [];
  let loading = false;

  // ✅ Load previews + filename
  async function handleFilesChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files) return;

    files = Array.from(input.files);

    const loaded = await Promise.all(
      files.map(
        (file) =>
          new Promise<{ url: string; name: string }>((resolve) => {
            const reader = new FileReader();
            reader.onload = () =>
              resolve({ url: reader.result as string, name: file.name });
            reader.readAsDataURL(file);
          })
      )
    );

    previews = loaded;
  }

  function loadImg(url: string) {
    return new Promise<HTMLImageElement>((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = url;
    });
  }

  async function convertToPdf() {
    if (previews.length === 0) return alert("Select images first.");
    loading = true;

    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 10;

    for (let i = 0; i < previews.length; i++) {
      const { url } = previews[i];
      const img = await loadImg(url);

      const ratio = img.width / img.height;
      let w = pageW - margin * 2;
      let h = w / ratio;

      if (h > pageH - margin * 2) {
        h = pageH - margin * 2;
        w = h * ratio;
      }

      const x = (pageW - w) / 2;
      const y = (pageH - h) / 2;

      doc.addImage(url, "JPEG", x, y, w, h);

      if (i < previews.length - 1) doc.addPage();
    }

    doc.save("images.pdf");
    loading = false;
  }
</script>

<Card.Root class="" variant={'default'}>
	<Card.Content class="flex-1 md:!px-6 !px-3">
 

  <input
    type="file"
    accept="image/*"
    multiple
    on:change={handleFilesChange}
    class="w-full flex items-center justify-between border border-slate-300 h-12 rounded-md px-4 py-2 bg-white cursor-pointer"
  />

  {#if previews.length}
    <div class="grid grid-cols-3 gap-2 my-3">
      {#each previews as p}
        <img src={p.url} class="w-full h-24 object-cover rounded border" alt={p.name} />
        <span class="text-xs mt-1 break-all text-gray-700">{p.name}</span>
      {/each}
    </div>

    <button
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      on:click={convertToPdf}
      disabled={loading}
    >
      {loading ? "Creating..." : "Download PDF"}
    </button>
    {:else}
    <p class="text-sm text-gray-500 py-3">No images selected yet.</p>
  {/if}
 
</Card.Content>
</Card.Root>