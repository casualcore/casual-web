<script lang="ts">
  import { getCasualState } from "$lib/casual";
  import { getUiState, pages } from "$lib/uistate/uistate.svelte";
  import ServerDataTable from "$lib/components/server-data-table/server-data-table.svelte";
  import PageHeader from "$lib/components/page-header.svelte";

  const casual = getCasualState();
  const uiState = getUiState();

  uiState.setBreadcrumb([pages.servers])
</script>

<PageHeader>
  Servers
</PageHeader>

<ServerDataTable servers={casual.domainState.servers} />
