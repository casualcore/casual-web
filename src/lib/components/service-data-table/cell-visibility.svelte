<script lang="ts">
  import EyeIcon from "@lucide/svelte/icons/eye";
  import Badge from "$lib/components/ui/badge/badge.svelte";

  const {
    visibility
  }: {
    visibility: number
  } = $props();
</script>

{#if visibility === 1}
  <Badge variant="outline" class="text-muted-foreground">
    <EyeIcon class="text-foreground" />
    Discoverable
  </Badge>
{/if}
