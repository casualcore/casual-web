<script lang="ts">
  import { getCasualState, Ui, type Service } from "$lib/casual";
  import { getUiState, pages } from "$lib/uistate/uistate.svelte";
  import ServiceInstanceDataTable from "$lib/components/service-instance-data-table/service-instance-data-table.svelte";
  import PageHeader from "$lib/components/page-header.svelte";
  import CellVisibility from "$lib/components/service-data-table/cell-visibility.svelte";
  import CellMode from "$lib/components/service-data-table/cell-mode.svelte";

  const {
    service,
  }: {
    service: Service,
  } = $props();

  const casual = getCasualState();
  const uiState = getUiState();

  const instances = $derived([
    ...service.instances.sequential.map(instance => ({
      type: "sequential",
      instance: casual.serviceState.instances.sequential.find(si => si.process.ipc === instance.process.ipc)
    }) as Ui.ServiceInstace),
    ...service.instances.concurrent.map(instance => ({
      type: "concurrent",
      instance: casual.serviceState.instances.concurrent.find(si => si.process.ipc == instance.process.ipc)
    }) as Ui.ServiceInstace)
  ]);

  uiState.setBreadcrumb([pages.services, { title: service.name }]);
</script>

<PageHeader>
  {service.name}
  <CellVisibility visibility={service.visibility} />
  <CellMode mode={service.transaction} />
</PageHeader>

<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
  Instances
</h4>

<ServiceInstanceDataTable {instances} />
