<script lang="ts">
  import { getCasualState } from "$lib/casual";
  import { getUiState, pages } from "$lib/uistate/uistate.svelte";
  import InstanceDataTable from "$lib/components/instance-data-table/instance-data-table.svelte";
  import PageHeader from "$lib/components/page-header.svelte";

  const casual = getCasualState();
  const uiState = getUiState();

  uiState.setBreadcrumb([pages.instances]);

  const instances = $derived(casual.instances());
</script>

<PageHeader>
  Instances
</PageHeader>

<InstanceDataTable {instances} />
