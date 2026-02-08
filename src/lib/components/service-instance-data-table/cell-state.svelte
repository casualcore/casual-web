<script lang="ts">
  import CircleIcon from "@lucide/svelte/icons/circle";
  import { Badge } from "../ui/badge";

  const {
    state
  }: {
    state: number | undefined
  } = $props();

  /** 
    undefined - alltid external?
   */
</script>

<Badge variant="outline" class="text-muted-foreground">
  {#if state === 0}
    <CircleIcon class="stroke-0 fill-green-500 dark:fill-green-400" />
    Idle
  {:else if state === 1}
    <CircleIcon class="stroke-0 fill-orange-500 dark:fill-orange-400" />
    Busy
  {:else}
    <CircleIcon class="stroke-0 fill-gray-500 dark:fill-gray-400" />
    External
  {/if}
</Badge>
