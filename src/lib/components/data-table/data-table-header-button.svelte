<script lang="ts" generics="TColumn">
  import type { ComponentProps } from "svelte";
  import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
  import ArrowDownIcon from "@lucide/svelte/icons/arrow-down";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import type { Column } from "@tanstack/table-core";

  let { column, header, variant = "ghost", tooltip, ...restProps }:
    ComponentProps<typeof Button> & {
      column: Column<TColumn, unknown>,
      header: string,
      tooltip?: string,
    } = $props();
</script>

{#snippet button()}
  <Button {variant} {...restProps} class="px-0 has-[>svg]:px-0">
    {header}
    {#if column.getIsSorted() === "desc"}
      <ArrowDownIcon />
    {:else if column.getIsSorted() === "asc"}
      <ArrowUpIcon />
    {/if}
  </Button>
{/snippet}

{#if tooltip}
  <Tooltip.Root>
    <Tooltip.Trigger>
      {@render button()}
    </Tooltip.Trigger>
    <Tooltip.Content>
      {tooltip}
    </Tooltip.Content>
  </Tooltip.Root>
{:else}
  {@render button()}
{/if}
