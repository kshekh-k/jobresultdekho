<script lang="ts">
  import type { Result } from './types';
  import { createEventDispatcher } from 'svelte';

  export let result: Result;

  const dispatch = createEventDispatcher();
</script>

<div class="p-4 bg-white rounded shadow">
  <h3 class="text-xl font-semibold mb-2">Results</h3>

  <div class="grid grid-cols-2 gap-2 text-sm">
    <div>WPM:</div><div class="font-mono">{result.wpm}</div>
    <div>Accuracy:</div><div class="font-mono">{result.accuracy}%</div>
    <div>Correct:</div><div class="font-mono">{result.correctChars}</div>
    <div>Wrong:</div><div class="font-mono">{result.wrongChars}</div>
    <div>Time:</div><div class="font-mono">{result.timeSecs}s</div>
  </div>

  <div class="mt-3 flex gap-2">
    <button class="px-3 py-1 rounded bg-indigo-600 text-white" on:click={() => dispatch('retry')}>
      Retry
    </button>
    <button class="px-3 py-1 rounded border" on:click={() => dispatch('choose','timed')}>
      Try Timed Mode
    </button>
  </div>
</div>
