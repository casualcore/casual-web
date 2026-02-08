<script lang="ts">
  import { getCasualState } from "$lib/casual";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb";
  import { getUiState } from "$lib/uistate/uistate.svelte";

  const casual = getCasualState();
  const uiState = getUiState();
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item class="hidden md:block">
      <Breadcrumb.Link href="/">{casual.domainState.identity.name}</Breadcrumb.Link>
    </Breadcrumb.Item>
    {#each uiState.breadcrumbs as breadcrumb, index}
      <Breadcrumb.Separator class="hidden md:block" />
      <Breadcrumb.Item>
        {#if index < uiState.breadcrumbs.length-1}
          <Breadcrumb.Link href={breadcrumb.url}>{breadcrumb.title}</Breadcrumb.Link>
        {:else}
          <Breadcrumb.Page>{breadcrumb.title}</Breadcrumb.Page>
        {/if}
      </Breadcrumb.Item>
    {/each}
      
  </Breadcrumb.List>
</Breadcrumb.Root>
