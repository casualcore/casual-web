<script lang="ts">
  import { page } from "$app/state";
  import { getCasualState } from "$lib/casual";
  import { getUiState, pages } from "$lib/uistate/uistate.svelte";
  import { Badge } from "$lib/components/ui/badge";
  import { ServerIcon } from "$lib/components/icons/icons";
  import ServiceDataTable from "$lib/components/service-data-table/service-data-table.svelte";
  import PageHeader from "$lib/components/page-header.svelte";

  const casual = getCasualState();
  const uiState = getUiState();

  // Är pid unikt här?
  const instance = $derived(
    casual.serviceState.instances?.sequential.find(i => i.process.pid === Number(page.params.pid)) ||
    casual.serviceState.instances?.concurrent.find(i => i.process.pid === Number(page.params.pid))
  );

  const server = $derived(casual.serverByInstance(instance));
  const services = $derived(casual.servicesByInstance(instance));

  $effect(() => uiState.setBreadcrumb([pages.instances, { title: instance?.alias }]));
</script>

<PageHeader>
  {instance?.alias}
</PageHeader>

{#if instance?.description}
  <p class="text-muted-foreground text-sm">
    {instance?.description}
  </p>
{/if}

{#if server}
  <Badge>
    <ServerIcon />
    <a href="/servers/{server.id}">
      {server.alias}
    </a>
  </Badge>
{/if}

<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
  Services
</h4>

<ServiceDataTable {services} />
