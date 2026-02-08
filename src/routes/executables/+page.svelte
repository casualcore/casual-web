<script lang="ts">
  import { getCasualState } from "$lib/casual";
  import { getUiState, pages } from "$lib/uistate/uistate.svelte";
  import ExecutableDataTable from "$lib/components/executable-data-table/executable-data-table.svelte";
  import PageHeader from "$lib/components/page-header.svelte";

  const casual = getCasualState();
  const uiState = getUiState();

  uiState.setBreadcrumb([pages.executables])
</script>

<PageHeader>
  Executables
</PageHeader>

<ExecutableDataTable executables={casual.domainState.executables} />
