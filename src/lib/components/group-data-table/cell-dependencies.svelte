<script lang="ts">
  import { getCasualState, type Group } from "$lib/casual";
  import Badge from "$lib/components/ui/badge/badge.svelte";

  const {
    dependencies,
  }: {
    dependencies: number[],
  } = $props();

  const casual = getCasualState();
</script>

<div class="flex flex-col items-center gap-1">
  <div class="flex w-full flex-wrap gap-1">
    {#each dependencies as dependency}
      <Badge variant="outline" class="text-muted-foreground">
        {casual.domainState.groups.find(g => g.id === dependency)?.name}
      </Badge>
    {/each}
  </div>
</div>
