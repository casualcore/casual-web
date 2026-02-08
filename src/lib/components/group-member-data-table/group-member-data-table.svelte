<script lang="ts">
  import { columns } from "./columns";
  import DataTable from "../data-table/data-table.svelte";
  import Toolbar from "./toolbar.svelte";
  import { Ui } from "$lib/casual";
  import { tableUtils } from "$lib/uistate/utils";
  import type { VisibilityState } from "@tanstack/table-core";

  const {
    members
  }: {
    members: Ui.GroupMember[]
  } = $props();

  const { hiddenBy } = tableUtils();

  const data = $derived(members
    .filter(hiddenBy(m => m.member.alias))
    .map(m => ({
      id: `${m.type}_${m.member.id}`,
      idRaw: m.member.id,
      type: m.type,
      alias: m.member.alias,
      note: m.member.note,
      path: m.member.path,
      enabled: m.member.enabled,
      instances: m.member.instances.length,
    })));

  const initialSorting =[{ id: "alias", desc: false }];
  const initialColumnVisibility = { "type": false };
</script>

<DataTable {data} {columns} {initialSorting} {initialColumnVisibility}>
  {#snippet toolbar(table: any)}
    <Toolbar {table} />
  {/snippet}
</DataTable>
