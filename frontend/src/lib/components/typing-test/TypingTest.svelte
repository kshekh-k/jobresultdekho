<script lang="ts">
  import StageSelector from "./StageSelector.svelte";
  import TypingArea from "./TypingArea.svelte";
  import Results from "./Results.svelte";

  import { generateWords } from "./words";
  import type { StageKey, StageConfig, Result } from "./types";

  let stage: StageKey = "easy";
  let config: StageConfig | null = null;
  let words: string[] = [];
  let result: Result | null = null;

  function selectStage(e: any) {
    stage = e.detail.stage;
    config = e.detail.config;

    words = generateWords(100, config.wordMin, config.wordMax);
    result = null;
  }
</script>

<div class="space-y-6">
  <StageSelector {stage} on:stage={selectStage} />

  {#if config && !result}
    <TypingArea {config} {words} on:result={(e) => result = e.detail} />
  {/if}

  {#if result}
    <Results {result} on:retry={() => result = null} />
  {/if}
</div>
