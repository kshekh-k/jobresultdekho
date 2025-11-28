<script lang="ts">
  import type { StageKey, StageConfig } from './types';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const STAGES: Record<StageKey, StageConfig> = {
    easy:   { label: "Easy", timeLimit: 30, wordMin: 2, wordMax: 4 },
    medium: { label: "Medium", timeLimit: 45, wordMin: 4, wordMax: 8 },
    hard:   { label: "Hard", timeLimit: 60, wordMin: 8, wordMax: 14 }
  };

  export let stage: StageKey = 'easy';

  function chooseStage(s: StageKey) {
    dispatch("stage", { stage: s, config: STAGES[s] });
  }

  // 👉 FIX HERE
  const stageKeys = Object.keys(STAGES) as StageKey[];
</script>

<div class="flex gap-3">
  {#each stageKeys as key}
    <button
      class="px-4 py-2 rounded bg-slate-200 hover:bg-slate-300"
      class:!bg-indigo-600={key === stage}
      on:click={() => chooseStage(key)}
    >
      {STAGES[key].label}
    </button>
  {/each}
</div>
