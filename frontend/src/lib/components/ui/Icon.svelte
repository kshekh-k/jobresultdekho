<script lang="ts">
  // Props
  export let name: any; // the imported icon component itself
  export let size: number = 20;
  export let className: string = "";
</script>

<svelte:component
  this={name}
  size={size}
  class={className}
/>
