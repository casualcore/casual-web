<script lang="ts">
  import { columns } from "./columns";
  import DataTable from "../data-table/data-table.svelte";
  import Toolbar from "./toolbar.svelte";
  import type { Server } from "$lib/casual";
  import { tableUtils } from "$lib/uistate/utils";

  const {
    servers
  }: {
    servers: Server[]
  } = $props();

  const { hiddenBy } = tableUtils();

  const data = $derived(servers
    .filter(hiddenBy(i => i.alias))
    .map(s => ({
      id: s.id,
      alias: s.alias,
      note: s.note,
      path: s.path,
      enabled: s.enabled,
      restart: s.restart,
      restarts: s.restarts,
      instances: s.instances.length,
    })));

  const initialSorting =[{ id: "alias", desc: false }];
</script>

<DataTable {data} {columns} {initialSorting}>
  {#snippet toolbar(table: any)}
    <Toolbar {table} />
  {/snippet}
</DataTable>
