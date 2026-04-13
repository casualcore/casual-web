<script lang="ts">
  import { page } from "$app/state";
  import { getCasualState } from "$lib/casual";
  import { getUiState, pages } from "$lib/uistate/uistate.svelte";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import { GroupIcon } from "$lib/components/icons/icons";
  import PageHeader from "$lib/components/page-header.svelte";
  import CellEnabled from "$lib/components/data-table/cell-enabled.svelte";
  import ExecutableInstanceDataTable from "$lib/components/executable-instance-data-table/executable-instance-data-table.svelte";
  import ActionButton from "$lib/components/action-button.svelte";

  const casual = getCasualState();
  const uiState = getUiState();

  const executableId = Number(page.params.id);
  const executable = $derived(casual.domainState.executables.find(executable => executable.id === executableId));

  $effect(() => uiState.setBreadcrumb([pages.executables, { title: executable?.alias }]))
  
  const group = (id: number) => casual.domainState.groups.find(g => g.id === id)?.name || "";

  const instances = $derived(casual.executableInstances(executableId));
</script>

{#snippet actions()}
  <ActionButton
    label="Restart"
    onclick={async () => await casual.domainRestartAlias(executable!.alias)}
    successMessage={`${executable?.alias} restarted`}
    errorMessage={`Failed to restart ${executable?.alias}`}
  />
{/snippet}

<PageHeader {actions}>
  {executable?.alias}
  <CellEnabled enabled={executable?.enabled || false} />
</PageHeader>

<p class="text-muted-foreground text-sm">
  {executable?.note}
</p>

<p>
  {#each executable?.memberships as membership}
    <Badge>
      <GroupIcon />
      <a href="/groups/{membership}">{group(membership)}</a>
    </Badge>
  {/each}
</p>

<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
  Instances
</h4>

<ExecutableInstanceDataTable {instances} />
