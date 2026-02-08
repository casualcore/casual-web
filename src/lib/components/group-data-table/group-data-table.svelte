<script lang="ts">
  import type { Group } from "$lib/casual";
  import { tableUtils } from "$lib/uistate/utils";
  import DataTable from "../data-table/data-table.svelte";
  import { columns } from "./columns";
  import Toolbar from "./toolbar.svelte";

  const {
    groups
  }: {
    groups: Group[]
  } = $props();

  const { hiddenBy } = tableUtils();

  const data = $derived(groups
    .filter(hiddenBy(g => g.name))
    .map(g => ({
      id: g.id,
      name: g.name,
      note: g.note,
      enabled: g.enabled,
      dependencies: g.dependencies,
    })));

  const initialSorting =[{ id: "name", desc: false }];
</script>

<DataTable {data} {columns} {initialSorting}>
  {#snippet toolbar(table: any)}
    <Toolbar {table} />
  {/snippet}
</DataTable>
