<script lang="ts" generics="TData">
  import XIcon from "@lucide/svelte/icons/x";
  import type { Table } from "@tanstack/table-core";
  import { Button } from "../ui/button";
  import { Input } from "../ui/input";
  import DataTableFacetedFilter from "../data-table/data-table-faceted-filter.svelte";
  import GlobalSettingsMenu from "../data-table/global-settings-menu.svelte";

  const modes = [
    {
      value: 0,
      label: "Auto",
    },
    {
      value: 1,
      label: "Join",
    },
    {
      value: 2,
      label: "Atomic",
    },
    {
      value: 3,
      label: "None",
    },
  ];

  const visibility = [
    {
      value: 1,
      label: "Discoverable",
    },
    {
      value: 2,
      label: "Undiscoverable",
    },
  ]

  let {
    table,
    categories,
  }: {
    table: Table<TData>,
    categories: string[],
  } = $props();

  const isFiltered = $derived(table.getState().columnFilters.length > 0);
  
  const modeCol = $derived(table.getColumn("mode"));
  const categoryCol = $derived(table.getColumn("category"));
  const visibilityCol = $derived(table.getColumn("visibility"));

  const categoryOptions = $derived(categories.map(c => ({
    value: c,
    label: c,
  })).sort((a, b) => a.label.localeCompare(b.label)));
</script>

<div class="flex items-center justify-between pb-4">
  <div class="flex flex-1 items-center space-x-2">
    <Input
      placeholder="Filter services..."
      value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
      oninput={(e) => {
        table.getColumn("name")?.setFilterValue(e.currentTarget.value);
      }}
      onchange={(e) => {
        table.getColumn("name")?.setFilterValue(e.currentTarget.value);
      }}
      class="h-8 w-[150px] lg:w-[250px]"
    />

    {#if categoryCol}
      <DataTableFacetedFilter column={categoryCol} title="Category" options={categoryOptions} />
    {/if}
    {#if modeCol}
      <DataTableFacetedFilter column={modeCol} title="Mode" options={modes} />
    {/if}
    {#if visibilityCol}
      <DataTableFacetedFilter column={visibilityCol} title="Visibility" options={visibility} />
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
