<script lang="ts">
  import type { Snippet } from "svelte";

  const {
    children,
    badges,
    actions
  }: {
    children: Snippet,
    badges?: Snippet,
    actions?: Snippet,
  } = $props();
</script>

<div class="flex justify-between items-center">
  <div class="flex items-center gap-2">
    <h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      {@render children()}
    </h2>
    <div>
      <div class="flex gap-1">
        {@render badges?.()}
      </div>
    </div>
  </div>
  {@render actions?.()}
</div>
