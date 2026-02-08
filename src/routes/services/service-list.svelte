<script lang="ts">
  import { getCasualState } from "$lib/casual";
  import { getUiState, pages } from "$lib/uistate/uistate.svelte";
  import ServiceDataTable from "$lib/components/service-data-table/service-data-table.svelte";
  import PageHeader from "$lib/components/page-header.svelte";

  const casual = getCasualState();
  const uiState = getUiState();

  uiState.setBreadcrumb([pages.services]);

  const services = $derived(casual.serviceState.services);
</script>

<PageHeader>
  Services
</PageHeader>

<ServiceDataTable {services} />
