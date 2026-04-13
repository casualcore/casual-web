<script lang="ts">
  import { page } from "$app/state";
  import { getCasualState } from "$lib/casual";
  import { getUiState, pages } from "$lib/uistate/uistate.svelte";
  import { Badge } from "$lib/components/ui/badge";
  import GroupMemberDataTable from "$lib/components/group-member-data-table/group-member-data-table.svelte";
  import PageHeader from "$lib/components/page-header.svelte";
  import CellEnabled from "$lib/components/data-table/cell-enabled.svelte";
  import ActionButton from "$lib/components/action-button.svelte";

  const casual = getCasualState();
  const uiState = getUiState();

  const groupId = $derived(Number(page.params.id));
  const group = $derived(casual.domainState.groups.find(g => g.id === groupId));

  uiState.setBreadcrumb([pages.groups, { title: group?.name }])

  const members = $derived(casual.groupMembers(groupId))
</script>

{#snippet actions()}
  <ActionButton
    label="Restart"
    onclick={async () => await casual.domainRestartGroup(group!.name)}
    successMessage={`${group?.name} restarted`}
    errorMessage={`Failed to restart ${group?.name}`}
  />
{/snippet}

<PageHeader {actions}>
  {group?.name}
  <CellEnabled enabled={group?.enabled || false} />
</PageHeader>

{#if group?.note}
  <p class="text-muted-foreground text-sm">
    {group?.note}
  </p>
{/if}

{#if group?.dependencies.length !== 0}
<p class="flex gap-1">
    Dependencies
    {#each group?.dependencies as dependency}
      <Badge variant="outline">
        <a href="/groups/{dependency}">{casual.domainState.groups.find(g => g.id === dependency)?.name}</a>
      </Badge>
    {/each}
  </p>
{/if}

<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
  Members
</h4>

<GroupMemberDataTable {members} />
