<script lang="ts">
  import { page } from "$app/state";
  import { getCasualState } from "$lib/casual";
  import { getUiState, pages } from "$lib/uistate/uistate.svelte";
  import { GroupIcon } from "$lib/components/icons/icons";
  import { Badge } from "$lib/components/ui/badge";
  import InstanceDataTable from "$lib/components/instance-data-table/instance-data-table.svelte";
  import PageHeader from "$lib/components/page-header.svelte";
  import CellEnabled from "$lib/components/data-table/cell-enabled.svelte";

  const casual = getCasualState();
  const uiState = getUiState();

  const serverId = Number(page.params.id);
  const server = $derived(casual.domainState.servers.find(server => server.id === serverId));

  $effect(() => uiState.setBreadcrumb([pages.servers, { title: server?.alias }]));

  const group = (id: number) => casual.domainState.groups.find(g => g.id === id)?.name || "";

  const instances = $derived(casual.serverInstances(serverId));
</script>

<PageHeader>
  {server?.alias}
  <CellEnabled enabled={server?.enabled || false} />
</PageHeader>

<p class="text-muted-foreground text-sm">
  {server?.note}
</p>

<p>
  {#each server?.memberships as membership}
    <Badge>
      <GroupIcon />
      <a href="/groups/{membership}">{group(membership)}</a>
    </Badge>
  {/each}
</p>

<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
  Instances
</h4>

<InstanceDataTable {instances} />
