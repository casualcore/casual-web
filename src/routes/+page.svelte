<script lang="ts">
  import { getCasualState } from "$lib/casual";
  import PageHeader from "$lib/components/page-header.svelte";
  import * as Table from "$lib/components/ui/table";
  import { getUiState } from "$lib/uistate/uistate.svelte";

  const casual = getCasualState();
  const uiState = getUiState();

  uiState.setBreadcrumb([]);
</script>

<PageHeader>
  {casual.domainState.identity.name}
</PageHeader>

<div class="rounded-md border">
  <Table.Root>
    <Table.Row>
      <Table.Cell>
        Version
      </Table.Cell>
      <Table.Cell>
        {casual.domainState.version.casual}
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        Compiler
      </Table.Cell>
      <Table.Cell>
        {casual.domainState.version.compiler}
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        Commit
      </Table.Cell>
      <Table.Cell>
        {casual.domainState.version.commit}
      </Table.Cell>
    </Table.Row>
  </Table.Root>
</div>
