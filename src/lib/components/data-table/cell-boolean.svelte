<script lang="ts">
  import CircleIcon from "@lucide/svelte/icons/circle";
  import { Badge } from "../ui/badge";

  const {
    value,
    hideLabels = false,
    labelTrue = "true",
    labelFalse = "false",
  }: {
    value: boolean,
    hideLabels?: boolean,
    labelTrue?: string,
    labelFalse?: string,
  } = $props();
</script>

<Badge variant="outline" class="text-muted-foreground">
  {#if value}
    <CircleIcon class="stroke-0 fill-green-500 dark:fill-green-400" />
    {#if !hideLabels}
      {labelTrue}
    {/if}
  {:else}
    <CircleIcon class="stroke-0 fill-gray-500 dark:fill-gray-400" />
    {#if !hideLabels}
      {labelFalse}
    {/if}
  {/if}
</Badge>
