<script lang="ts">
  import Badge from "$lib/components/ui/badge/badge.svelte";

  const {
    mode
  }: {
    mode: number
  } = $props();
</script>

{#if mode === 0}
  <Badge variant="outline" class="text-muted-foreground">auto</Badge>
{:else if (mode === 1)}
  <Badge variant="outline" class="text-muted-foreground">join</Badge>
{:else if (mode === 2)}
  <Badge variant="outline" class="text-muted-foreground">atomic</Badge>
{:else if (mode === 3)}
  <Badge variant="outline" class="text-muted-foreground">none</Badge>
{/if}
