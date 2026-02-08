<script lang="ts">
  import { base64toHex } from "$lib/utils";
  import { columns } from "./columns";
  import DataTable from "../data-table/data-table.svelte";
  import type { ServiceInstace } from "$lib/casual/ui.models";
  import Toolbar from "./toolbar.svelte";
  import { tableUtils } from "$lib/uistate/utils";

  const {
    instances
  }: {
    instances: ServiceInstace[]
  } = $props();

  const { hiddenBy } = tableUtils();

  const data = $derived(instances
    .filter(hiddenBy(i => i.instance.alias))
    .map(i => ({
      id: i.instance.alias,
      alias: i.instance.alias,
      description: i.instance.description,
      type: i.type,
      state: i.instance.state,
      pid: i.instance.process.pid,
      ipc: base64toHex(i.instance.process.ipc),
    })));

  const initialSorting = [{ id: "alias", desc: false }];
</script>

<DataTable {data} {columns} {initialSorting}>
  {#snippet toolbar(table: any)}
    <Toolbar {table} />
  {/snippet}
</DataTable>
