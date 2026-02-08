<script lang="ts">
  import { columns } from "./columns";
  import DataTable from "../data-table/data-table.svelte";
  import Toolbar from "./toolbar.svelte";
  import type { Executable } from "$lib/casual";
  import { tableUtils } from "$lib/uistate/utils";

  const {
    executables
  }: {
    executables: Executable[]
  } = $props();

  const { hiddenBy } = tableUtils();

  const data = $derived(executables
    .filter(hiddenBy(e => e.alias))
    .map(e => ({
      id: e.id,
      alias: e.alias,
      note: e.note,
      path: e.path,
      enabled: e.enabled,
      restart: e.restart,
      restarts: e.restarts,
      instances: e.instances.length,
    })));

  const initialSorting = [{ id: "alias", desc: false }];
</script>

<DataTable {data} {columns} {initialSorting}>
  {#snippet toolbar(table: any)}
    <Toolbar {table} />
  {/snippet}
</DataTable>
