<script lang="ts">
  import CircleIcon from "@lucide/svelte/icons/circle";
  import { Badge } from "../ui/badge";

  const {
    enabled
  }: {
    enabled: boolean
  } = $props();
</script>

<Badge variant="outline" class="text-muted-foreground">
  {#if enabled}
    <CircleIcon class="stroke-0 fill-green-500 dark:fill-green-400" />
    Enabled
  {:else}
    <CircleIcon class="stroke-0 fill-gray-500 dark:fill-gray-400" />
    Disabled
  {/if}
</Badge>
