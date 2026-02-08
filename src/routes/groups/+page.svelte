<script lang="ts">
  import { getCasualState } from "$lib/casual";
  import GroupDataTable from "$lib/components/group-data-table/group-data-table.svelte";
  import PageHeader from "$lib/components/page-header.svelte";
  import { getUiState, pages } from "$lib/uistate/uistate.svelte";

  const casual = getCasualState();
  const uiState = getUiState();

  uiState.setBreadcrumb([pages.groups])
</script>

<PageHeader>
  Groups
</PageHeader>

<GroupDataTable groups={casual.domainState.groups} />
