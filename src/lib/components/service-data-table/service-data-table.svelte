<script lang="ts">
  import type { Service } from "$lib/casual";
  import { columns } from "./columns";
  import DataTable from "../data-table/data-table.svelte";
  import Toolbar from "./toolbar.svelte";
  import { tableUtils } from "$lib/uistate/utils";

  const {
    services
  }: {
    services: Service[]
  } = $props();

  const { hiddenBy, formatDuration, formatDate } = tableUtils();

  const data = $derived(services
    .filter(hiddenBy(s => s.name))
    .map(s => ({
      id: s.name,
      name: s.name,
      category: s.category,
      mode: s.transaction,
      visibility: s.visibility,
      instancesSequential: s.instances.sequential.length,
      instancesConcurrent: s.instances.concurrent.length,
      invokedCount: s.metric.invoked.count,
      pendingCount: s.metric.pending.count,
      at: formatDuration(s.metric.invoked.count > 0 ? (s.metric.invoked.total / s.metric.invoked.count) : 0),
      min: formatDuration(s.metric.invoked.limit.min),
      max: formatDuration(s.metric.invoked.limit.max),
      pat: formatDuration(s.metric.pending.count > 0 ? (s.metric.pending.total / s.metric.pending.count) : 0),
      last: formatDate(s.metric.last),
    })
  ));

  const initialSorting =[{ id: "name", desc: false }];

  const categories = $derived([...(new Set(data.map(r => r.category)))]);
</script>

<DataTable {data} {columns} {initialSorting}>
  {#snippet toolbar(table: any)}
    <Toolbar {table} {categories} />
  {/snippet}
</DataTable>
