<script lang="ts">
  import { columns } from "./columns";
  import DataTable from "../data-table/data-table.svelte";
  import type { Instance } from "$lib/casual/ui.models";
  import Toolbar from "./toolbar.svelte";
  import { tableUtils } from "$lib/uistate/utils";

  const {
    instances
  }: {
    instances: Instance[]
  } = $props();

  const { hiddenBy } = tableUtils();

  const data = $derived(instances
    .filter(hiddenBy(i => i.alias))
    .map(i => ({
      id: i.alias,
      alias: i.alias,
      state: i.instance.state,
      pid: i.instance.handle.pid,
      spawnpoint: i.instance.spawnpoint > 0 ? new Date(i.instance.spawnpoint/1000000).toISOString() : "",
    })));

  const initialSorting =[{ id: "alias", desc: false }];
</script>

<DataTable {data} {columns} {initialSorting}>
  {#snippet toolbar(table: any)}
    <Toolbar {table} />
  {/snippet}
</DataTable>
