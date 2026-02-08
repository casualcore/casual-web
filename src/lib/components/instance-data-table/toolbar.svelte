<script lang="ts" generics="TData">
  import XIcon from "@lucide/svelte/icons/x";
  import type { Table } from "@tanstack/table-core";
  import { Button } from "../ui/button";
  import { Input } from "../ui/input";
  import GlobalSettingsMenu from "../data-table/global-settings-menu.svelte";
  import DataTableFacetedFilter from "../data-table/data-table-faceted-filter.svelte";
  import { instanceStateOptions } from "../data-table/column-filter-options";

  let { table }: { table: Table<TData> } = $props();

  const isFiltered = $derived(table.getState().columnFilters.length > 0);

  const stateCol = $derived(table.getColumn("state"));
</script>

<div class="flex items-center justify-between pb-4">
  <div class="flex flex-1 items-center space-x-2">
    <Input
      placeholder="Filter instances..."
      value={(table.getColumn("alias")?.getFilterValue() as string) ?? ""}
      oninput={(e) => {
        table.getColumn("alias")?.setFilterValue(e.currentTarget.value);
      }}
      onchange={(e) => {
        table.getColumn("alias")?.setFilterValue(e.currentTarget.value);
      }}
      class="h-8 w-[150px] lg:w-[250px]"
    />

    {#if stateCol}
      <DataTableFacetedFilter column={stateCol} title="State" options={instanceStateOptions} />
    {/if}
    
    {#if isFiltered}
      <Button
        variant="ghost"
        onclick={() => table.resetColumnFilters()}
        class="h-8 px-2 lg:px-3"
      >
        Reset
        <XIcon />
      </Button>
    {/if}
  </div>
  <GlobalSettingsMenu />
</div>
